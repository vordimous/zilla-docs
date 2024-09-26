---
shortTitle: server
---

# openapi server

The openapi server binding creates composite of `tcp`, `tls`, and `http` bindings with server kind and adapts HTTP request-response streams to OpenAPI request-response streams.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## Configuration (\* required)

<!-- @include: ../.partials/vault.md -->
<!-- @include: ./.partials/options.md -->

<!-- markdownlint-disable-next-line MD001 -->
#### options.tls

> `object`

The `tls` specific options.

<!-- @include: ../.partials/options-tls.md -->
<!-- @include: ../.partials/exit.md -->
<!-- @include: ../.partials/telemetry.md -->
