---
redirectFrom: /reference/config/bindings/binding-http.html
dir:
  collapsible: false
  link: true
shortTitle: http
category:
  - Binding
tag:
  - http
  - server
  - client
---

# http Binding

Defines a binding with `http` protocol support, with `server` or `client` behavior.

## server

> [Full config](./server.md)

The `server` kind `http` binding decodes `HTTP/1.1` protocol or `HTTP/2` protocol on the inbound network stream, producing higher level application streams for each request.

Cross-Origin Resource Sharing (CORS) is supported by specifying an access control policy of `cross-origin`. Further configuration allows for finer-grained access control including specific request origins, methods and headers allowed, and specific response headers exposed.

Authorization is enforced by a [`guard`](../../../config/overview.md#guards) and the credentials can be extracted from a cookie, header or query parameter.

Conditional routes based on `http` request headers are used to route these application streams to an `exit` binding.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## client

> [Full config](./client.md)

The `client` kind `http` binding receives inbound application streams and encodes each request as a network stream via `HTTP/1.1` protocol. Note that the same network stream can be reused to encode multiple `HTTP/1.1` requests.

Conditional routes based on `http` request headers are used to route these network streams to an `exit` binding.

```yaml {3}
<!-- @include: ./.partials/client.yaml -->
```
