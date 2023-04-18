---
shortTitle: binding (filesystem)
description: Zilla runtime filesystem binding
category:
  - Binding
tag:
  - Server
---

# filesystem Binding

Zilla runtime filesystem binding

```yaml {2}
filesystem_server0:
  type: filesystem
  kind: server
  options:
    location: web/
    simlinks: follow
```

- [`kind`](#kind) Behave as an filesystem server
- [`options`](#options) filesystem-specifc options

## Summary

The `server` kind `filesystem` binding provides access to files and directories on the local filesystem, optionally following symbolic links.

Behaves as a web server when combined with `tcp,` `tls`, `http` and `http-filesystem` bindings.

## Configuration

### kind\*

> enum [ "server" ]

Behave as a `filesystem` `server`

```yaml
kind: server
```

### options

> `object`

`filesystem`-specifc options for `filesystem` access.

```yaml
options:
  location: web/
  simlinks: follow
```

#### options.location | `string`

File system URI or directory name with trailing slash.
#### options.symlinks | `enum [ "follow", "ignore" ]`

How to treat symbolic links.\
Defaults to `ignore`
