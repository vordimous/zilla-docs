---
redirectFrom: /reference/config/bindings/binding-tcp.html
dir:
  collapsible: false
  link: true
shortTitle: tcp
category:
  - Binding
tag:
  - tcp
  - server
  - client
---

# tcp Binding

Defines a binding with `tcp` protocol support, with `server` or `client` behavior.

Conditional routes based on the hostname authority and network address mask are used to route these streams to an `exit` binding.

## server

> [Full config](./server.md)

The `server` kind `tcp` binding listens for inbound socket connections, producing higher level application streams for each remote TCP client.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## client

> [Full config](./client.md)

The `client` kind `tcp` binding receives inbound application streams and initiates outbound TCP network connections to a remote TCP server address.

```yaml {3}
<!-- @include: ./.partials/client.yaml -->
```
