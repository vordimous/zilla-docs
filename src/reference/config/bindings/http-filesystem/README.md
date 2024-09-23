---
redirectFrom: /reference/config/bindings/binding-http-filesystem.html
dir:
  collapsible: false
  link: true
shortTitle: http-filesystem
category:
  - Binding
tag:
  - http-filesystem
  - proxy
---

# http-filesystem Binding

Defines a binding with `http-filesystem` support, with `proxy` behavior.

## proxy

> [Full config](./proxy.md)

The `proxy` kind `http-filesystem` binding adapts `http` data streams into `filesystem` data streams by mapping the path from an inbound `http` `GET` request into a filesystem relative path.

Behaves as a web server when combined with `tcp,` `tls`, `http` and `filesystem` bindings.

```yaml {3}
<!-- @include: ./.partials/proxy.yaml -->
```
