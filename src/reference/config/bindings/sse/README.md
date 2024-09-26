---
redirectFrom: /reference/config/bindings/binding-sse.html
dir:
  collapsible: false
  link: true
shortTitle: sse
category:
  - Binding
tag:
  - sse
  - server
  - client
---

# sse Binding

Defines a binding with Server Sent Events (SSE) protocol support, with `server` behavior.

## server

> [Full config](./server.md)

The `server` kind `sse` binding converts inbound `http` request-response streams into `sse` request-response streams.

Messages received on the `sse` response stream are encoded using `Server Sent Events` protocol, including support for custom `event` types and last event `id`.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## client

> [Full config](./client.md)

The `client` kind `sse` binding converts outbound `see` request-response streams into `http` request-response streams.

```yaml {3}
<!-- @include: ./.partials/client.yaml -->
```
