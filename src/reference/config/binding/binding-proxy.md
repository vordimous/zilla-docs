---
shortTitle: proxy 
description: Zilla runtime proxy binding
category:
  - Binding
tag:
  - Proxy
  - Server
---

# proxy Binding

Zilla runtime proxy binding.

```yaml {2}
proxy_server0:
  type: proxy
  kind: server
  routes:
    - when:
        - transport: stream
          family: inet4
          destination:
            port: 443
      exit: tls_server0
```

## Summary

Defines a binding with `proxy` protocol support, with `server` or `client` behavior.

The `server` kind `proxy` binding decodes `Proxy v2` protocol on the inbound network stream, producing higher level application streams for each request.

The `client` kind `proxy` binding receives inbound application streams and encodes each as a network stream via `Proxy v2` protocol.

Conditional routes based on the network transport type or network addresses are used to route these streams to an `exit` binding.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].transport](#when-transport)
  - [when\[\].family](#when-family)
  - [when\[\].source](#when-source)
    - [source.host](#source-host)
    - [source.port](#source-port)
  - [when\[\].destination](#when-destination)
    - [destination.host](#destination-host)
    - [destination.port](#destination-port)
- [routes\[\].exit\*](#routes-exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "client", "server" ]

Behave as `proxy` `client` or `server`.

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: echo_server0
```

### routes

> `array` of `object`

Conditional `proxy`-specific routes.

```yaml
routes:
  - when:
      - transport: stream
        family: inet4
        destination:
          port: 443
    exit: tls_server0
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

List of conditions (any match) to match this route.

#### when[].transport

> `enum` [ "stream", "datagram" ]

Transport type.

#### when[].family

> `enum` [ "inet", "inet4", "inet6", "unix" ]

Address family.

#### when[].source

> `object`

Source address.

##### source.host

> `string`

Hostname or IP address.

##### source.port

> `integer`

Port number.

#### when[].destination

> `object`

Destination address.

##### destination.host

> `string`

Hostname or IP address.

##### destination.port

> `integer`

Port number.

### routes[].exit\*

> `string`

Next binding when following this route.

```yaml
exit: echo_server0
```

---

::: right
\* required
:::
