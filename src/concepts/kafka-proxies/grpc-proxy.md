---
description: The Zilla gRPC Kafka Proxy lets you implement gRPC service definitions from protobuf files to consume and produce messages from Kafka topics.
prev: false
next: /tutorials/grpc/grpc-intro.md
---

# gRPC Kafka Proxy

The Zilla gRPC Kafka Proxy lets you implement gRPC service definitions from protobuf files to produce and consume messages via Kafka topics.

Zilla can be the gRPC server, routing a service method's request and response messages to and from Kafka topics, or Zilla can fanout messages from a Kafka topic to multiple gRPC clients using the [grpc-kafka](../../reference/config/bindings/binding-grpc-kafka.md) and [kafka-grpc](../../reference/config/bindings/binding-kafka-grpc.md) bindings in a [zilla.yaml](../../reference/config/overview.md) config. Additionally, Zilla can sit on the critical path between a gRPC client and server. They can communicate as if they are talking directly to each other, while Zilla actually proxies the messages through Kafka.

## RPC Service Definitions

Zilla supports all four [gRPC service method definitions](https://grpc.io/docs/what-is-grpc/core-concepts/#service-definition). The request and return message(s) are managed through two different Kafka topics, respectively. These topics are defined through [dynamic method routing](../../concepts/config-intro.md#routes).

Zilla can also handle the stream upgrade when a client sends a single request, but the service expects a stream. Zilla does this by treating all gRPC request and response messages as a stream of messages on Kafka topics with at least one data message and a null end-of-stream message representing the end of the request or response streams.

### Simple/Unary RPC

```protobuf:no-line-numbers
rpc SayHello(HelloRequest) returns (HelloResponse);
```

A single message is sent and will wait for the correlated response message and return it back to the caller. The request and response topics both have one message with the method payloads and one end-of-stream message.

### Server-side streaming RPC

```protobuf:no-line-numbers
rpc LotsOfReplies(HelloRequest) returns (stream HelloResponse);
```

A single message is sent with a returned stream back to the caller. The correlated messages produced on the reply-to topic will be sent for the client to read until there are no more messages, and the stream will close. The request topic has one message with the method payload and one end-of-stream message. The response topic has one or many messages with the method payloads and one end-of-stream message.

### Client-side streaming RPC

```protobuf:no-line-numbers
rpc LotsOfGreetings(stream HelloRequest) returns (HelloResponse);
```

The client sends a stream, producing all the messages on a topic. When the client finishes writing to the stream, it will return the correlated response message to the caller. The correlated response message can arrive on the response topic at any time during or after the request stream. The request topic has one or many messages with the method payloads and one end-of-stream message. The response topic has one message with the method payloads and one end-of-stream message.

### Bidirectional streaming RPC

```protobuf:no-line-numbers
rpc BidiHello(stream HelloRequest) returns (stream HelloResponse);
```

Both the client and server use a read-write stream to produce and consume correlated messages. The request and response topics have one or many messages with the method payloads and one end-of-stream message.

## Correlated Request-Response

Zilla manages the synchronous request and response messages of a gRPC service. Request and response messages are correlated by a `zilla:correlation-id` header, providing an identifier for both Zilla and Kafka workflows to act on.

## gRPC Metadata

Method routes can use [custom metadata fields](../../reference/config/bindings/binding-grpc-kafka.md#when-metadata) for request routing and idempotency. Zilla can also augment the metadata it sends based on the configured route the request matches.

## Reliable Delivery

Clients can fetch some or all messages from a single Kafka topic using a route with the [fetch capability](../../reference/config/bindings/binding-grpc-kafka.md#fetch-capability) by creating a service definition with an `Empty` request type and the topic message as the response type. Zilla sends an event ID with every message serialized as an unknown field in the payload. Messages can be identified without field collision, and the client doesn't need to acknowledge the message receipt explicitly. A client consuming the stream of messages can remember the event ID. In the event, the stream gets interrupted. The client can reconnect with a `last-event-id` header to recover without message loss or needing to start over from the beginning.

## Kafka Consumer Groups

The [kafka-grpc](../../reference/config/bindings/binding-kafka-grpc.md) `remote_server` binding will create a consumer group. It creates one consumer per named binding in a zilla config. The format of the consumer group ID is `zilla:<zilla namespace>-<binding name>`. Scaling the number of Zilla instances with the same configuration will add each new Zilla instance as a member of the same group. Using different Zilla `namespace`s or adding multiple bindings will create different consumer groups.

The [grpc-kakfa](../../reference/config/bindings/binding-grpc-kafka.md) does not create consumer groups. Instead, the binding fetches messages from a topic the same way for all connected clients. Clients can filter messages received using filters like adding the desired Kafka message key in the `idempotency-key` header. The client can track and recover progress through the stream using [reliable delivery](#reliable-delivery).
