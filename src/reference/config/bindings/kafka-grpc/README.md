---
redirectFrom: /reference/config/bindings/binding-kafka-grpc.html
dir:
  collapsible: false
  link: true
shortTitle: kafka-grpc
category:
  - Binding
tag:
  - kafka-grpc
  - remote_server
---

# kafka-grpc Binding

The `grpc` request message is received from a `requests` topic, with a `zilla:correlation-id` header, initiating a `grpc` service method invocation. When the `grpc` response received, a response message is produced to the `responses` topic, with the same `zilla:correlation-id` header to correlate the response.

Note that `grpc` requests and responses can be `unary` or `streaming`.

## remote_server

> [Full config](./remote_server.md)

The `remote_server` kind `kafka-grpc` binding adapts `kafka` topic streams to `grpc` request-response streams.

```yaml {3}
<!-- @include: ./.partials/remote_server.yaml -->
```
