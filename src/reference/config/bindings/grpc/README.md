---
redirectFrom: /reference/config/bindings/binding-grpc.html
dir:
  collapsible: false
  link: true
shortTitle: grpc
category:
  - Binding
tag:
  - grpc
  - server
  - client
---

# grpc Binding

Defines a binding with `grpc` protocol support, with `server` or `client` behavior.

## server

The `server` kind `grpc` binding adapts `http` request-response streams to `grpc` request-response streams, with support for both `application/grpc+proto` and `application/grpc-web+proto` content types.

> [Full Config](./server.md)

```yaml {3}
grpc_server:
  type: grpc
  kind: server
  catalog:
    host_filesystem:
      - subject: echo
  routes:
    - when:
        - method: example.EchoService/*
          metadata:
            custom-text: custom value
            custom-binary:
              base64: Y3VzdG9tIHZhbHVl
      exit: echo_server
```

## client

The `client` kind `grpc` binding adapts `grpc` request-response streams to `http` request-response streams.

> [Full Config](./client.md)

```yaml {3}
grpc_server:
  type: grpc
  kind: client
  exit: tcp_server
```
