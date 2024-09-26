---
shortTitle: remote_server
---

# kafka-grpc remote_server

The kafka-grpc remote_server binding for adapting `kafka` topic streams to `grpc` request-response streams.

```yaml {3}
<!-- @include: ./.partials/remote_server.yaml -->
```

## Configuration (\* required)

### entry\*

> `string` | Pattern: `^[a-zA-Z]+[a-zA-Z0-9\\._\\-]*$`

The name of the binding that will be the entrypoint for Kafka streams.

```yaml
  kafka_grpc_proxy:
    type: kafka-grpc
    kind: remote_server
    entry: kafka_cache_client
```

<!-- @include: ./.partials/options.md -->
<!-- @include: ./.partials/routes.md -->
<!-- @include: ../.partials/telemetry-grpc.md -->
