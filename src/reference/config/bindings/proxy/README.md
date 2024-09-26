---
redirectFrom: /reference/config/bindings/binding-proxy.html
dir:
  collapsible: false
  link: true
shortTitle: proxy
category:
  - Binding
tag:
  - proxy
  - server
  - client
---

# proxy Binding

Defines a binding with `proxy` protocol support, with `server` or `client` behavior. Conditional routes based on the network transport type or network addresses are used to route these streams to an `exit` binding.

## server

> [Full config](./server.md)

The `server` kind `proxy` binding decodes `Proxy v2` protocol on the inbound network stream, producing higher level application streams for each request.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## client

> [Full config](./client.md)

The `client` kind `proxy` binding receives inbound application streams and encodes each as a network stream via Proxy v2 protocol.

```yaml {3}
<!-- @include: ./.partials/client.yaml -->
```
