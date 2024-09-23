---
shortTitle: client
---

# openapi client

The openapi client binding creates composite of `http`, `tls`, and `tcp` bindings with client kind and adapts OpenAPI request-response streams to HTTP request-response streams.

```yaml {3}
<!-- @include: ./.partials/client.yaml -->
```

## Configuration (\* required)

<!-- @include: ./.partials/options.md -->

<!-- markdownlint-disable-next-line MD001 -->
#### options.tls

> `object`

The `tls` specific options.

<!-- @include: ../.partials/options-tls.md -->
<!-- @include: ../.partials/vault.md -->
<!-- @include: ../.partials/telemetry.md -->
