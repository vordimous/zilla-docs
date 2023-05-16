---
shortTitle: http-filesystem 
description: Zilla runtime http-filesystem binding
category:
  - Binding
tag:
  - Proxy
---

# http-filesystem Binding

Zilla runtime http-filesystem binding.

```yaml {2}
http_filesystem_proxy0:
  type: http-filesystem
  kind: proxy
  routes:
    - when:
        - path: "/{path}"
      exit: filesystem_server0
      with:
        path: "${params.path}"
```

## Summary

Defines a binding with `http-filesystem`  support, with `proxy` behavior.

The `proxy` kind `http-filesystem` binding adapts `http` data streams into `filesystem` data streams by mapping the path from an inbound `http` `GET` request into a filesystem relative path.

Behaves as a web server when combined with `tcp,` `tls`, `http` and `filesystem` bindings.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].path\*](#when-path)
- [routes\[\].exit\*](#routes-exit)
- [routes\[\].with](#routes-with)
  - [with\[\].path\*](#with-path)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "proxy" ]

Behave as an `http-filesystem` `proxy`.

```yaml
kind: proxy
```

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: filesystem_server0
```

### routes

> `array` of `object`

Conditional `http-kafka`-specific routes for adapting `http` data streams into `filesystem` data streams.

```yaml
routes:
  - when:
      - path: "/{path}"
    exit: filesystem_server0
    with:
      path: "${params.path}"
```

### routes[].guarded

> `object` as named map of `string:string` `array`

List of roles required by each named guard to authorize this route.

```yaml
routes:
  - guarded:
      test0:
        - read:items
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route when adapting `http` data streams into `filesystem` data streams.

```yaml
routes:
  - when:
      - path: "/{path}"
```

#### when[].path\*

> `string`

Path with optional embedded parameter names, such as `/{path}`.

### routes[].exit\*

> `string`

Next binding when following this route.

```yaml
exit: filesystem_server0
```

### routes[].with

> `object`

Filesystem parameters used when adapting `http` data streams into `filesystem` data streams.

#### with[].path\*

> `string`

Topic name, optionally referencing path parameter such as `${params.path}`.

---

::: right
\* required
:::
