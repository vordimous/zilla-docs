---
redirectFrom: /reference/config/bindings/binding-ws.html
dir:
  collapsible: false
  link: true
shortTitle: ws
category:
  - Binding
tag:
  - ws
  - server
  - client
---

# ws Binding

Defines a binding with WebSockets protocol support, with `server` or `client` behavior.

## server

> [Full config](./server.md)

The `server` kind `ws` binding converts inbound `http` request-response streams into `ws` full-duplex streams.

Conditional routes based on `ws` scheme, authority, path or negotiated subprotocol are used to route these streams to an `exit` binding.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## client

> [Full config](./client.md)

The `client` kind `ws` binding converts inbound `ws` full duplex streams into `http` request-response streams.

Conditional routes based on `ws` scheme, authority, path or negotiated subprotocol are used to route these streams to an `exit` binding.

```yaml {3}
<!-- @include: ./.partials/client.yaml -->
```
