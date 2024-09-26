---
shortTitle: proxy
---

# tls proxy

The tls proxy binding detects `ClientHello` `server_name` extension to provide TLS virtual hosting by routing based on server name.

```yaml {3}
<!-- @include: ./.partials/proxy.yaml -->
```

## Configuration (\* required)

<!-- @include: ../.partials/vault.md -->
<!-- @include: ./.partials/routes.md -->
<!-- @include: ../.partials/exit.md -->
<!-- @include: ../.partials/telemetry.md -->
