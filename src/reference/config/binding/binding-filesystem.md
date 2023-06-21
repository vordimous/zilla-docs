---
shortTitle: filesystem 
description: Zilla runtime filesystem binding
category:
  - Binding
tag:
  - Server
---

# filesystem Binding

Zilla runtime filesystem binding.

```yaml {2}
filesystem_server0:
  type: filesystem
  kind: server
  options:
    location: web/
    simlinks: follow
```

## Summary

The `server` kind `filesystem` binding provides access to files and directories on the local filesystem, optionally following symbolic links.

Behaves as a web server when combined with `tcp,` `tls`, `http` and `http-filesystem` bindings.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
  - [options.location](#options-location)
  - [options.symlinks](#options-symlinks)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "server" ]

Behave as a `filesystem` `server`.

```yaml
kind: server
```

### options

> `object`

`filesystem`-specific options for `filesystem` access.

```yaml
options:
  location: web/
  simlinks: follow
```

#### options.location

> `string`

File system URI or directory name with trailing slash.

#### options.symlinks

> `enum` [ "follow", "ignore" ]

How to treat symbolic links.\
Defaults to `"ignore"`.

---

::: right
\* required
:::
