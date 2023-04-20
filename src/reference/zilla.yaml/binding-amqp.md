---
shortTitle: binding (amqp) 🚧
description: Zilla runtime amqp binding (incubator)
category:
  - Binding
tag:
  - Server
---

# amqp Binding 🚧

Zilla runtime amqp binding (incubator)

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

Defines a binding with `amqp 1.0` protocol support, with `server` behavior.

The `server` kind `amqp` binding decodes `amqp 1.0` protocol on the inbound network stream, producing higher level application streams for each `send` or `receive` `link`.

Conditional routes based on the `link` `address` are used to route these application streams to an `exit` binding.

## Configuration

Binding with support for `amqp 1.0` protocol.

### kind\*

> `enum` [ "server" ]

Behave as an `amqp 1.0` `proxy`

```yaml
kind: proxy
```

### routes

> `array` of `object`

Conditional `amqp`-specific routes for adapting `http` request-response streams to `kafka` topic streams.

### route

Routes for `amqp 1.0` protocol.

## guarded

> `object` as named map of `string` `array`

List of roles required by each named guard to authorize this route

## when

> `array` of [`condition`](binding-amqp.md#condition)

List of conditions (any match) to match this route

## exit\*

> `string`

Next binding when following this route

### condition

Conditions to match routes for `amqp 1.0` protocol.

#### Properties

## address

> `string`

Link address

## capabilities

> `enum` [ "send_only", "receive_only", "send_and_receive" ]

Send or receive, or both.\
Defaults to `"send_and_receive"`

---

::: right
\* required
:::
