---
description: Running these Zilla samples will introduce some gRPC features.
---

# gRPC Intro

Get started with Zilla by deploying our Docker Compose stack. Before proceeding, you should have [Docker Compose](https://docs.docker.com/compose/gettingstarted/) installed.

## Echo on a Kafka event stream

Running this Zilla sample will create a gRPC service to echo any message sent through a Kafka topic.

### Setup

Create each of these files `zilla.yaml`, `docker-compose.yaml`, and `echo.proto` in the same directory.

::: code-tabs#yaml

@tab zilla.yaml

```yaml{40,44,46}
name: gRPC-example
bindings:

# Gateway ingress config
  tcp_server:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port: 8080
    exit: http_server
  http_server:
    type: http
    kind: server
    routes:
      - when:
          - headers:
              :scheme: http
              :authority: localhost:8080
        exit: grpc_server

# gRPC service definition
  grpc_server:
    type: grpc
    kind: server
    options:
      services:
        - proto/echo.proto
    routes:
      - when:
          - method: example.EchoService/*
        exit: grpc_kafka

# Proxy a gRPC service to a Kafka topic
  grpc_kafka:
    type: grpc-kafka
    kind: proxy
    routes:
      - when:
          - method: example.EchoService/*
        exit: kafka_cache_client
        with:
          capability: produce
          topic: echo-messages
          acks: leader_only
          reply-to: echo-messages

# Kafka caching layer
  kafka_cache_client:
    type: kafka
    kind: cache_client
    options:
      bootstrap:
        - echo-messages
    exit: kafka_cache_server
  kafka_cache_server:
    type: kafka
    kind: cache_server
    exit: kafka_client

# Connect to local Kafka
  kafka_client:
    type: kafka
    kind: client
    exit: kafka_tcp_client
  kafka_tcp_client:
    type: tcp
    kind: client
    options:
      host: kafka
      port: 9092
    routes:
      - when:
          - cidr: 0.0.0.0/0

```

@tab docker-compose.yaml

```yaml
version: '3'
services:
  kafka:
    image: docker.io/bitnami/kafka:latest
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      ALLOW_PLAINTEXT_LISTENER: "yes"

  kafka-init:
    image: docker.io/bitnami/kafka:latest
    command: 
      - "/bin/bash"
      - "-c"
      - "/opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic echo-messages"
    depends_on:
      - kafka
    init: true

  zilla:
    image: ghcr.io/aklivity/zilla:latest
    container_name: zilla
    depends_on:
      - kafka
    ports:
      - "8080:8080"
    volumes:
      - ./zilla.yaml:/etc/zilla/zilla.yaml
      - ./echo.proto:/etc/zilla/proto/echo.proto
    command: start -v

networks:
  default:
    name: zilla-network
    driver: bridge

```

@tab echo.proto

```protobuf
syntax = "proto3";

package example;

service EchoService
{
  rpc EchoSimple(EchoMessage) returns (EchoMessage);

  rpc EchoClientStream(stream EchoMessage) returns (EchoMessage);

  rpc EchoServerStream( EchoMessage) returns (stream EchoMessage);

  rpc EchoBidiStream(stream EchoMessage) returns (stream EchoMessage);
}

message EchoMessage
{
  string message = 1;
}

```

:::

### Run Zilla and Kafka

```bash:no-line-numbers
docker-compose up -d
```

### Use [grpcurl](https://github.com/fullstorydev/grpcurl) to send a greeting

```bash:no-line-numbers
grpcurl -plaintext -proto echo.proto  -d '{"message":"Hello World"}' localhost:8080 example.EchoService.EchoSimple
```

::: note Wait for the services to start
if you get this response `curl: (52) Empty reply from server`, the likely cause is Zilla and Kafka are still starting up.
:::

### Remove the running containers

```bash:no-line-numbers
docker-compose down
```

::: tip See more of what Zilla can do
Go deeper into this concept with the [grpc.kafka.echo](https://github.com/aklivity/zilla-examples/tree/main/grpc.kafka.echo) example.
:::

## Going Deeper

Try out more gRPC examples:

- [grpc.echo](https://github.com/aklivity/zilla-examples/tree/main/grpc.echo)
- [grpc.kafka.echo](https://github.com/aklivity/zilla-examples/tree/main/grpc.kafka.echo)
- [grpc.kafka.fanout](https://github.com/aklivity/zilla-examples/tree/main/grpc.kafka.fanout)
- [grpc.kafka.proxy](https://github.com/aklivity/zilla-examples/tree/main/grpc.kafka.proxy)
- [grpc.proxy](https://github.com/aklivity/zilla-examples/tree/main/grpc.proxy)
