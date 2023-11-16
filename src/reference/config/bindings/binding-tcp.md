---
shortTitle: tcp
description: Zilla runtime tcp binding
category:
  - Binding
tag:
  - Server
---

# tcp Binding

Zilla runtime tcp binding.

```yaml {2}
tcp_server:
  type: tcp
  kind: server
  options:
    host: 0.0.0.0
    port: 12345
  exit: echo_server
```

## Summary

Defines a binding with `tcp` protocol support, with `server` or `client` behavior.

The `server` kind `tcp` binding listens for inbound socket connections, producing higher level application streams for each remote `tcp` client.

The `client` kind `tcp` binding receives inbound application streams and initiates outbound `tcp` network connections to a remote `tcp` server address.

Conditional routes based on the hostname authority and network address mask are used to route these streams to an `exit` binding.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
- [options.host](#options-host)
- [options.port](#options-port)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].authority](#when-authority)
  - [when\[\].cidr](#when-cidr)
  - [when\[\].port](#when-port)
- [routes\[\].exit\*](#routes-exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "client", "server" ]

Behave as a `tcp` `client` or `server`.

### options

> `object`

`tcp`-specific options.

```yaml
options:
  host: 0.0.0.0
  port: 12345
```

### options.host

> `string`

Hostname or IP address.

### options.port

> `integer` | `string` | `array` of  `integer` | `array` of `string`

Port number(s), including port number ranges.

### exit

> `string`

Default exit binding when no conditional routes are viable, for kind `server` only.

```yaml
exit: echo_server
```

### routes

> `array` of `object`

Conditional `tcp`-specific routes.

### routes[].guarded

> `object` as named map of `string:string` `array`

List of roles required by each named guard to authorize this route.

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.
Read more: [When a route matches](../../../concepts/config-intro.md#when-a-route-matches)

#### when[].authority

> `string`

Associated authority.

#### when[].cidr

> `string`

CIDR mask.

#### when[].port

> `integer` | `string` | `array` of  `integer` | `array` of `string`

Port number(s), including port number ranges.

### routes[].exit\*

> `string`

Next binding when following this route, for kind `server` only.

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
