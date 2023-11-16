---
shortTitle: ws 
description: Zilla runtime ws binding
category:
  - Binding
tag:
  - Server
---

# ws Binding

Zilla runtime ws binding.

```yaml {2}
ws_server:
  type: ws
  kind: server
  routes:
    - when:
        - protocol: echo
    exit: echo_server
```

## Summary

Defines a binding with `WebSockets` protocol support, with `server` or `client` behavior.

### Server behavior

The `server` kind `ws` binding converts inbound `http` request-response streams into `ws` full-duplex streams.

Conditional routes based on `ws` scheme, authority, path or negotiated subprotocol are used to route these streams to an `exit` binding.

### Client behavior

The `client` kind `ws` binding converts inbound `ws` full duplex streams into `http` request-response streams.

Conditional routes based on `ws` scheme, authority, path or negotiated subprotocol are used to route these streams to an `exit` binding.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
- [options.defaults](#options-defaults)
  - [defaults.protocol](#defaults-protocol)
  - [defaults.scheme](#defaults-scheme)
  - [defaults.authority](#defaults-authority)
  - [defaults.path](#defaults-path)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].protocol](#when-protocol)
  - [when\[\].scheme](#when-scheme)
  - [when\[\].authority](#when-authority)
  - [when\[\].path](#when-path)
- [routes\[\].exit\*](#routes-exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "client", "server" ]

Behave as a `ws` `client` or `server`.

### options

> `object`

`ws`-specific options.

### options.defaults

> `object`

Defaults.

#### defaults.protocol

> `string`

Subprotocol.

#### defaults.scheme

> `string`

Scheme.

#### defaults.authority

> `string`

Authority.

#### defaults.path

> `string`

Path.

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: echo_server
```

### routes

> `array` of `object`

Conditional `ws`-specific routes.

```yaml
routes:
  - when:
      - protocol: echo
  exit: echo_server
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
      - protocol: echo
```

#### when[].protocol

> `string`

Subprotocol pattern.

#### when[].scheme

> `string`

Scheme pattern.

#### when[].authority

> `string`

Authority pattern.

#### when[].path

> `string`

Path pattern.

### routes[].exit\*

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: echo_server
```

---

::: right
\* required
:::
