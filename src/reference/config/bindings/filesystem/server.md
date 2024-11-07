---
shortTitle: server
---

# filesystem server

The filesystem server binding provides access to files and directories on the local filesystem, optionally following symbolic links.It behaves as a web server when combined with `tcp,` `tls`, `http` and `http-filesystem` bindings.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## Configuration (\* required)

<!-- @include: ./.partials/options.md -->
<!-- @include: ../.partials/telemetry.md -->
