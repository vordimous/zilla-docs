---
redirectFrom: /reference/config/bindings/binding-filesystem.html
dir:
  collapsible: false
  link: true
shortTitle: filesystem
category:
  - Binding
tag:
  - filesystem
  - server
---

# filesystem Binding

The `server` kind `filesystem` binding provides access to files and directories on the local filesystem, optionally following symbolic links. It behaves as a web server when combined with `tcp,` `tls`, `http` and `http-filesystem` bindings.

## server

> [Full config](./server.md)

Behave as a `filesystem` `server`.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```
