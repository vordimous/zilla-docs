---
shortTitle: amqp 🔜
description: Zilla runtime amqp binding (incubator)
category:
  - Binding
tag:
  - Server
---

# amqp Binding 🔜

Zilla runtime amqp binding (incubator).

```yaml {2}
amqp_server0:
  type: amqp
  kind: server
  routes:
    - when:
        - address: echo
          capabilities: send_and_receive
    exit: echo_server0
```

## Summary

Defines a binding with `amqp 1.0` protocol support, with `server` behavior.

The `server` kind `amqp` binding decodes `amqp 1.0` protocol on the inbound network stream, producing higher level application streams for each `send` or `receive` `link`.

Conditional routes based on the `link` `address` are used to route these application streams to an `exit` binding.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].address](#when-address)
  - [when\[\].capabilities](#when-capabilities)
- [routes\[\].exit\*](#routes-exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "server" ]

Behave as an `amqp 1.0` `proxy`.

```yaml
kind: proxy
```

### routes

> `array` of `object`

Conditional `amqp`-specific routes for adapting `http` request-response streams to `kafka` topic streams.

```yaml
routes:
  - when:
      - address: echo
        capabilities: send_and_receive
    exit: echo_server0
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

```yaml
routes:
  - when:
      - address: echo
        capabilities: send_and_receive
```

#### when[].address

> `string`

Link address.

#### when[].capabilities

> `enum` [ "send_only", "receive_only", "send_and_receive" ]

Send or receive, or both.\
Defaults to `"send_and_receive"`.

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
