---
shortTitle: proxy
---

# http-filesystem proxy

The http-filesystem proxy binding adapts `http` data streams into `filesystem` data streams by mapping the path from an inbound `http` `GET` request into a filesystem relative path.

Behaves as a web server when combined with `tcp,` `tls`, `http` and `filesystem` bindings.

```yaml {3}
<!-- @include: ./.partials/proxy.yaml -->
```

## Configuration (\* required)

<!-- @include: ./.partials/routes.md -->
<!-- @include: ../.partials/exit.md -->
<!-- @include: ../.partials/telemetry-http.md -->
