---
shortTitle: binding (proxy)
description: Zilla runtime proxy binding
category:
  - Binding
tag:
  - Proxy
  - Server
---

# proxy Binding

Zilla runtime proxy binding

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

Defines a binding with `proxy` protocol support, with `server` or `client` behavior.

The `server` kind `proxy` binding decodes `Proxy v2` protocol on the inbound network stream, producing higher level application streams for each request.

The `client` kind `proxy` binding receives inbound application streams and encodes each as a network stream via `Proxy v2` protocol.

Conditional routes based on the network transport type or network addresses are used to route these streams to an `exit` binding.

## Configuration

Binding with support for `proxy` protocol.

#### Properties

## type\*

> `const "proxy"`

Support `proxy` protocol.

## kind\*

> `enum` [ "client", "server" ]

Behave as `proxy` `client` or `server`

## routes

> `array` of [`route`](binding-proxy.md#route)

Conditional `proxy`-specific routes

## exit

> `string`

Default exit binding when no conditional routes are viable

### route

Routes for `proxy` protocol.

#### Properties

## guarded

> `object` as named map of `string` `array`

List of roles required by each named guard to authorize this route

## when

> `array` of [`condition`](binding-proxy.md#condition)

List of conditions (any match) to match this route

## exit\*

> `string`

Next binding when following this route

### condition

Conditions to match routes for `proxy` protocol.

#### Properties

## transport

> `enum` [ "stream", "datagram" ]

Transport type

## family

> `enum` [ "inet", "inet4", "inet6", "unix" ]

Address family

## source

[`address`](binding-proxy.md#address)

Source address

## destination

[`address`](binding-proxy.md#address)

Destination address

### address

Address for `proxy` protocol.

#### Properties

## host

> `string`

Hostname or IP address

## port

> `integer`

Port number

---

::: right
\* required
:::
