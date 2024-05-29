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
<!-- @include: ./zilla.yaml -->
```

@tab docker-compose.yaml

```yaml
<!-- @include: ./docker-compose.yaml -->
```

@tab echo.proto

```protobuf
<!-- @include: ./echo.proto -->
```

:::

### Run Zilla and Kafka

```bash:no-line-numbers
docker-compose up --detach
```

### Send a greeting

```bash:no-line-numbers
docker run -v ./echo.proto:/proto/echo.proto -it --rm fullstorydev/grpcurl \
-plaintext -proto proto/echo.proto -d '{"message":"Hello World"}' host.docker.internal:7151 example.EchoService.EchoSimple
```

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
