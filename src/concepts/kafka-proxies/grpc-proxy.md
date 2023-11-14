---
description: This guide will walk through each unique gRPC message request and response design and how Zilla is configured to manage the connection for each.
---

# gRPC Kafka Proxy

This guide will walk through each unique gRPC message request and response design and how Zilla is configured to manage the connection for each.

Let's take a look at how Zilla would be configured with a full featured gRPC service. For this, we will use the [route_guide.proto](https://github.com/grpc/grpc-java/blob/master/examples/src/main/proto/route_guide.proto) to define the gRPC service and the method request-response types. You can find examples of running this service in any language on the [gRPC docs](https://grpc.io/docs/languages/) as well as example clients like this one implemented in [java](https://grpc.io/docs/languages/java/basics/#client).

## Step 1: Declaring the service

Zilla lets you use your service proto file(s) to specify the service definitions. This will let you create one or many [grpc-kafka](../../reference/config/bindings/binding-grpc-kafka.md) proxy handlers to be used by the whole service or individual methods.

Here is the service we will be enhancing with Zilla and Kafka.

```protobuf
service RouteGuide {

  // simple RPC
  rpc GetFeature(Point) returns (Feature) {}

  // server-side streaming RPC
  rpc ListFeatures(Rectangle) returns (stream Feature) {}

  // client-side streaming RPC
  rpc RecordRoute(stream Point) returns (RouteSummary) {}

  // bidirectional streaming RPC
  rpc RouteChat(stream RouteNote) returns (stream RouteNote) {}
}
```

Here is the simplest configuration for declaring the gRPC service. There is a `server` defining the service and methods which exits to the `client` which can be routed to the running gRPC instance.

```yaml
grpc_server:
  type: grpc
  kind: server
  options:
    services:
      - route_guide.proto
  routes:
    - when:
        - method: routeguide.RouteGuide/*
      exit: grpc_client
grpc_client:
  type: grpc
  kind: client
```

Define individual route handlers for each method or specify the `*` wildcard to handle all methods the same.

- All messages handled by the same route

```yaml
routes:
  - when:
      - method: routeguide.RouteGuide/*
```

- Routes for individual service methods

```yaml
routes:
  - when:
      - method: routeguide.RouteGuide/GetFeature
```

## Step 2: Handling message routing onto Kafka

This maps the proto service method's request and response messages directly to Kafka topics defined by the `topic` and `reply-to` attributes respectively. The messages are linked by the `zilla:correlation-id` header for individual calls into the gRPC service. Read more about it and how the `idempotency-key` enables safe message replays in the [grpc-kafka](../../reference/config/bindings/binding-grpc-kafka.md#produce-capability) reference section.

### Message routing for RPC request and response types

Let's look at some common service definitions and how Zilla can route their messages.

#### Simple RPC

For the `GetFeature` method, the `Point` request and `Feature` response create the stream of information Kafka can help manage.

```yaml
routes:
  - when:
      - method: routeguide.RouteGuide/GetFeature
    with:
      capability: produce
      topic: request-topic
      reply-to: response-topic
```

#### Server-side streaming RPC

For the `ListFeatures` method, we can have a dedicated stream of `Feature` messages being recorded on a topic before being sent to the client. Kafka allows the server to produce all of the responses without considering the connection to the client.

```yaml
routes:
  - when:
      - method: routeguide.RouteGuide/ListFeatures
    with:
      capability: produce
      topic: request-topic
      reply-to: feature-stream-topic
```

#### Client-side streaming RPC

For the `RecordRoute` method, the client sends a stream of `Point` messages to a dedicated stream topic before being sent to the server. Kafka allows the client to produce all of the requests without considering the connection to the server.

```yaml
routes:
  - when:
      - method: routeguide.RouteGuide/RecordRoute
    with:
      capability: produce
      topic: point-stream-topic
      reply-to: response-topic
```

#### Bidirectional streaming RPC

For the `RouteChat` method, we can have all of the messages on the same topic since it is the history that both the client and the server will need.

```yaml
routes:
  - when:
      - method: routeguide.RouteGuide/RouteChat
    with:
      capability: produce
      topic: chat-topic
```

### Fanout streaming RPC

An additional method for getting messages from a service onto Kafka is using the [grpc-kafka](../../reference/config/bindings/binding-grpc-kafka.md) fetch capability. This enables message filtering and reliable message delivery. Read more about the [fetch capability](../../reference/config/bindings/binding-grpc-kafka.md#fetch-capability) in the reference section.

The service will need a method that accepts the `google/protobuf/empty.proto` and produce the massage to be fanned out onto the Kafka topic.

```protobuf
import "google/protobuf/empty.proto";

service FanoutService
{
  rpc FanoutServerStream(google.protobuf.Empty) returns (stream FanoutMessage);
}
```

Here we set the [fetch capability](../../reference/config/bindings/binding-grpc-kafka.md#fetch-capability) and a filter.

```yaml
grpc_kafka:
  type: grpc-kafka
  kind: proxy
  routes:
    - when:
        - method: example.FanoutService/*
      with:
        capability: fetch
        topic: messages
        filters:
          key: custom-key
          headers:
            custom-text: custom-value
```

## Step 3: Calling services from Kafka

Now that messages are in Kafka we need to send them to the gRPC services responsible for processing them. For this, we will be using the [kafka-grpc](../../reference/config/bindings/binding-kafka-grpc.md) binding.

```yaml
remote_server:
  type: kafka-grpc
  kind: remote_server
  entry: <kafka_cache_client_name>
  options:
    acks: leader_only
  routes:
    - when:
        - topic: request-topic
          reply-to: response-topic
      exit: grpc_client
      with:
        scheme: http
        authority: <entrypoint_host>:<entrypoint_port>
grpc_client:
  type: grpc
  kind: client
  options:
    services:
      - route_guide.proto
  routes:
    - when:
        - method: routeguide.RouteGuide/GetFeature
      exit: <http_client_name_for_grpc_host>
```

## Other important elements

Other aspects of routing traffic through Zilla, Kafka, and gRPC services can be summed up with reusable config setups.

### Connecting a gRPC service to Zilla

When a Zilla config refers to a `grpc` client the traffic will need to be routed through an `http` and `tcp` client down to the `<grpc_host>` `<grpc_port>`.

```yaml
grpc_client:
  type: grpc
  kind: client
  exit: http_client
http_client:
  type: http
  kind: client
  options:
    versions:
      - h2
  exit: tcp_client
tcp_client:
  type: tcp
  kind: client
  options:
    host: <grpc_host>
    port: <grpc_port>
```

### Proxy service entrypoint

Using a [tcp](../../reference/config/bindings/binding-tcp.md) server binding we can route the gRPC traffic through an `http` server, `<entrypoint_host>`:`<entrypoint_port>`, to our desired gRPC server at the `<grpc_server_binding_name>`. The [tls](../../reference/config/bindings/binding-tls.md) server binding secures the entrypoint by defining a tls certificate from the [filesystem](../../reference/config/vaults/vault-filesystem.md) vault, which is used to send the traffic over https. Alternatively, if tls is not needed The tcp server can exit directly to the http server and the tls binding and filesystem vault can be removed.

```yaml
  tcp_server:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port: <entrypoint_port>
    exit: tls_server
  tls_server:
    type: tls
    kind: server
    vault: server
    options:
      keys:
        - <entrypoint_host>
      sni:
        - <entrypoint_host>
      alpn:
        - h2
    exit: http_server
  http_server:
    type: http
    kind: server
    options:
      versions:
        - h2
      access-control:
        policy: cross-origin
    routes:
      - when:
          - headers:
              :scheme: https
              :authority: <entrypoint_host>:<entrypoint_port>
        exit: <grpc_server_binding_name>
```

### Connecting to Kafka

A gRPC server can connect to Kafka the same as any other binding in Zilla. [See the docs](../../how-tos/connecting-to-kafka/apache-kafka.md) on the different connection options.

```yaml
  kafka_cache_client:
    type: kafka
    kind: cache_client
    exit: kafka_cache_server
  kafka_cache_server:
    type: kafka
    kind: cache_server
    exit: kafka_client
  kafka_client:
    type: kafka
    kind: client
    exit: tcp_client
  tcp_client:
    type: tcp
    kind: client
    options:
      host: <kafka_host>
      port: <kafka_port>
    routes:
      - when:
          - cidr: 0.0.0.0/0
```

## Try it out

Go check out the [grpc.kafka.proxy](https://github.com/aklivity/zilla-examples/tree/main/grpc.kafka.proxy) example for a full implementation of an EchoService.
