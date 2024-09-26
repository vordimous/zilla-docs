---
redirectFrom: /reference/config/bindings/binding-asyncapi.html
dir:
  collapsible: false
  link: true
shortTitle: asyncapi
category:
  - Binding
tag:
  - asyncapi
  - client
  - proxy
  - server
---

# asyncapi Binding

Defines a binding with `asyncapi` spec, with `server` or `proxy` or `client` behavior.

## client

> [Full config](./client.md)

The `client` kind `asyncapi` binding creates composite of `kafka` or `mqtt` or `http`, and `tls`, `tcp` bindings with client kind and adapts
AsyncAPI streams to Kafka/MQTT/HTTP streams.

```yaml {3}
<!-- @include: ./.partials/client.yaml -->
```

## proxy

> [Full config](./proxy.md)

The `proxy` kind `asyncapi` binding creates composite of `mqtt-kafka` binding with proxy kind mapping MQTT streams to Kafka streams.

```yaml {3}
<!-- @include: ./.partials/proxy.yaml -->
```

## server

> [Full config](./server.md)

The `server` kind `asyncapi` binding creates composite of `tcp`, `tls`, and `mqtt` or `http` bindings with server kind and adapts MQTT/HTTP streams to AsyncAPI streams.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```
