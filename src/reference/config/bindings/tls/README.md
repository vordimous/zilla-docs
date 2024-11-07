---
redirectFrom: /reference/config/bindings/binding-tls.html
dir:
  collapsible: false
  link: true
shortTitle: tls
category:
  - Binding
tag:
  - tls
  - server
  - client
---

# tls Binding

Defines a binding with `tls` protocol support, with `server`, `client` or `proxy` behavior.

## server

> [Full config](./server.md)

The `server` kind `tls` binding decodes encrypted TLS protocol on the inbound network stream, producing higher level cleartext application streams for each request.

Certificates and keys required to complete the TLS handshake are provided by a `vault` referenced in the binding configuration.

Conditional routes based on `tls` hostname authority or negotiated ALPN protocol are used to route these streams to an `exit` binding.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## client

> [Full config](./client.md)

The `client` kind `tls` binding receives inbound application streams and encodes each as an encrypted network stream via TLS protocol.

Certificates and keys required to complete the TLS handshake are provided by a `vault` referenced in the binding configuration.

Conditional routes based on `tls` hostname authority or negotiated ALPN protocol are used to route these streams to an `exit` binding.

```yaml {3}
<!-- @include: ./.partials/client.yaml -->
```

## proxy

> [Full config](./proxy.md)

The `proxy` kind `tls` binding detects `ClientHello` `server_name` extension to provide TLS virtual hosting by routing based on server name.

A `vault` is not required to proxy TLS protocol as the handshake is only observed read-only as it routes through the `tls` `proxy` binding.

```yaml {3}
<!-- @include: ./.partials/proxy.yaml -->
```
