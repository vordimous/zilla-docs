---
shortTitle: binding (sse)
description: Zilla runtime sse binding
category:
  - Binding
tag:
  - Server
---

# sse Binding

Zilla runtime sse binding

```yaml {2}
sse_server0:
  type: sse
  kind: server
  exit: sse_kafka_proxy0
```

Defines a binding with `Server Sent Events (sse)` protocol support, with `server` behavior.

The `server` kind `sse` binding converts inbound `http` request-response streams into `sse` request-response streams, with optionally configured `retry` delay.

Messages received on the `sse` response stream are encoded using `Server Sent Events` protocol, including support for custom `event` types and last event `id`.

## Configuration

### kind\*

> `enum` [ "client", "server" ]

Behave as a `sse` `client` or `server`.

### options

> `object`

`sse`-specific options.

### options.retry

> `integer`

Retry delay (ms)\
Defaults to `2000`

### exit

> `string`

Default exit binding when no conditional routes are viable

### routes

> `array` of `object`

Conditional `sse`-specific routes.

### routes[].guarded

> `object` as named map of `string:string` `array`

List of roles required by each named guard to authorize this route

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.

#### when[].path\*

> `string`

Path pattern

### routes[].exit\*

> `string`

Next binding when following this route

---

::: right
\* required
:::
