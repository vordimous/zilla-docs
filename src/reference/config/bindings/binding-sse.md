---
shortTitle: sse
description: Zilla runtime sse binding
category:
  - Binding
tag:
  - Server
---

# sse Binding

Zilla runtime sse binding.

```yaml {2}
sse_server:
  type: sse
  kind: server
  exit: sse_kafka_proxy
```

## Summary

Defines a binding with `Server Sent Events (sse)` protocol support, with `server` behavior.

The `server` kind `sse` binding converts inbound `http` request-response streams into `sse` request-response streams, with optionally configured `retry` delay.

Messages received on the `sse` response stream are encoded using `Server Sent Events` protocol, including support for custom `event` types and last event `id`.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
- [options.retry](#options-retry)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].path\*](#when-path)
- [routes\[\].exit\*](#routes-exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "client", "server" ]

Behave as a `sse` `client` or `server`.

### options

> `object`

`sse`-specific options.

```yaml
options:
  retry: 2000
```

### options.retry

> `integer` | Default: `2000`

Retry delay (ms)

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: sse_kafka_proxy
```

### routes

> `array` of `object`

Conditional `sse`-specific routes.

```yaml
routes:
  - guarded:
      test:
        - read:items
    when:
      - path: /items
    exit: sse_kafka_proxy
```

### routes[].guarded

> `object` as named map of `string:string` `array`

List of roles required by each named guard to authorize this route.

```yaml
routes:
  - guarded:
      test:
        - read:items
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.
Read more: [When a route matches](../../../concepts/config-intro.md#when-a-route-matches)

```yaml
routes:
  - when:
      - path: /items
```

#### when[].path\*

> `string`

Path pattern.

### routes[].exit\*

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: sse_kafka_proxy
```

---

::: right
\* required
:::
