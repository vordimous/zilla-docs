---
shortTitle: server
---

# tls server

The tls server binding decodes encrypted TLS protocol on the inbound network stream, producing higher level cleartext application streams for each request.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## Configuration (\* required)

<!-- @include: ../.partials/vault.md -->
<!-- @include: ./.partials/options.md -->
<!-- @include: ./.partials/routes.md -->
<!-- @include: ../.partials/exit.md -->
<!-- @include: ../.partials/telemetry.md -->
