# Bindings

Each configured [`binding`](../reference/config/overview.md#bindings) represents a step in the pipeline as data streams are decoded, translated or encoded according to a specific protocol `type`. Bindings are organized by behavioral type, supporting either encoding and decoding for a specific protocol or mapping between protocols.

## The zilla.yaml Config

The `zilla.yaml` config is declaratively configured to clearly define API mappings and endpoints that Zilla implements.

```yaml{5-6,16-17,25-26}
name: zilla-namespace

bindings:
  north_tcp_server:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port:
        - 7114
    routes:
      - when:
          - port: 7114
        exit: north_http_server
  north_http_server:
    type: http
    kind: server
    routes:
      - when:
          - headers:
              :scheme: http
              :authority: localhost:7114
        exit: south_echo_server
  south_echo_server:
    type: echo
    kind: server
```

![Binding Pipeline](bindings-simple.png)

### Kinds of Bindings

Bindings have a `kind`, indicating how they should behave.

#### Server Bindings

A `server` exists to decode a protocol on the inbound network stream, producing higher-level application streams for each request.

#### Proxy Bindings

A `proxy` handles the translate or encode behaviors between components.

#### Client Bindings

A `client` receives inbound application streams and encodes each as a network stream.

#### Cache Client & Server Bindings

A `cache_client` & `cache_server` combined provide a persistent cache of Kafka messages per topic partition, honoring the Kafka topic configuration for message expiration and compaction. Read more in the [kafka](../reference/config/bindings/binding-kafka.md#cache-behavior) binding.

#### Remote Server Bindings

A `remote_server` exists to adapt a Kafka topic stream to a higher-level application stream. Read more in the [kafka-grpc](../reference/config/bindings/binding-kafka-grpc.md#summary) binding.

## Routes

A Route's matching conditions are defined in terms specific to each `binding` type with some common design principles. As each incoming data stream arrives, the binding follows its configured `routes` to reach an `exit` binding or rejects the stream if no routes are viable. Bindings can define a default `exit` for streams that do not match any route.

::: info Order Matters
Messages on a data stream will use the first route with a matching `when` condition in the list. Order the more specific routes first and generic routes last. Often, that looks like a wildcard route last to catch any messages that don't have a previous matching route.
:::

## When a Route matches

Each route can list one or many conditions to match data streams. Attributes like headers, metadata, source, destination, etc., are used `when` determining the stream's correct [exit](#route-exit) for the stream.

A route matches if any of its `when` conditions match the data stream (any match). An individual condition in a route is matched if all parts of the condition match (all match). This means that if multiple `when` headers are supplied for HTTP routing, then all of those headers must match the specific when condition.

### Pattern matching

A condition will attempt to match the target stream exactly against the configured pattern. Routes with multiple patterns listed will match any defined pattern. Some route properties allow for wildcards in patterns and will match multiple values. A solo wildcard will match all incoming streams. MQTT topics allow naming per the [wildcard spec.](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#_Toc3901241)

- path: [http-kafka], [sse-kafka]
  - `/api/items`
  - `/api/*`
- method: [grpc-kafka], [kafka-grpc]
  - `routeguide.RouteGuide/GetFeature`
  - `routeguide.RouteGuide/*`
- topic: [mqtt-kafka]
  - `command/one`
  - `command/#`
  - `command/+/test`
- client-id: [mqtt-kafka]
  - `client-123`
  - `client-*`

[http-kafka]:../reference/config/bindings/binding-http-kafka.md#routes
[sse-kafka]:../reference/config/bindings/binding-sse-kafka.md#routes
[grpc-kafka]:../reference/config/bindings/binding-grpc-kafka.md#routes
[kafka-grpc]:../reference/config/bindings/binding-kafka-grpc.md#routes
[mqtt-kafka]:../reference/config/bindings/binding-mqtt-kafka.md#routes

## Dynamic path parameters

Path segments can be parsed into named values of the `${params}` object and used in other parts of a binding. Meaning a `/tasks/123` path with a `/tasks/{id}` mapping will extract `123` in the `${params.id}` field.

## Routing With extra params

After the route logic matches, additional parameters are applied `with` the inbound data streams.

### The Fetch capability

Routes with the `fetch` capability map retrieval requests from a Kafka topic, supporting filtered or unfiltered retrieval of messages from the topic partitions, merged into a unified response. Filtering can apply to the Kafka message key, message headers, or a combination of both message key and headers.

The [http-kafka](../reference/config/bindings/binding-http-kafka.md) binding provides additional support for extracting parameter values from the inbound HTTP request path. Successful `200 OK` HTTP responses include an [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) header that can be used with [if-none-match](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match) for subsequent conditional `GET` requests to check for updates. Rather than polling, HTTP requests can also include the `prefer wait=N` header to wait a maximum of `N` seconds before responding with `304 Not Modified` if not modified. When a new message arrives on the topic that would modify the response, all `prefer: wait=N` clients receive the response immediately with a corresponding new ETag.

### Reliable message delivery

With the [grpc-kafka](../reference/config/bindings/binding-grpc-kafka.md) binding, using the fetch capability, reliable message delivery is achieved by capturing the value of the `reliability` `field` injected into each response stream message at the gRPC client, and replaying the value via the `reliability` `metadata` header when reestablishing the stream with a new gRPC request. This allows interrupted streams to pick up where they left off without missing messages in the response stream.

### The Produce capability

Routes with the `produce` capability map any request-response network call to a correlated stream of Kafka messages. The request message(s) are sent to a `requests` topic with a `zilla:correlation-id` header. When the request message(s) are received and processed by the Kafka `requests` topic consumer, it produces response message(s) to the `responses` topic, with the same `zilla:correlation-id` header to correlate the response.

Requests with an `idempotency-key` header can be replayed and receive the same response. A Kafka consumer can detect and ignore any potential duplicate requests because they will have the same `idempotency-key` and `zilla:correlation-id`.

In the [http-kafka](../reference/config/bindings/binding-http-kafka.md) binding, specifying `async` allows clients to include a `prefer: respond-async` header in the HTTP request to receive `202 Accepted` response with `location` response header.

A corresponding `routes[].when` object with a matching `GET` method and `location` path is also required for follow-up `GET` requests to return the same response as would have been returned if the `prefer: respond-async` request header had been omitted.

## Route Exit

A route exists to direct a data stream to a desired exit point. This is the next binding needed to parse the stream data. Bindings like [tcp](../reference/config/bindings/binding-tcp.md) are frequently used to route incoming streams to different exit points. Once a valid exit point is determined messages can flow to the correct `exit` destination.

## Guarded Routes

A route is considered `guarded` if a [guard](guards.md) is specified. The guard condition short circuits any other route conditions and evaluates if a stream is allowed to use the route. If the `guarded` check fails, route evaluation falls through to the next defined route. Any guard can be configured, enabling different use cases when protecting data sent over a stream.
