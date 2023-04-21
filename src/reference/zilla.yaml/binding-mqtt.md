---
shortTitle: binding (mqtt) 🚧
description: Zilla runtime mqtt binding (incubator)
category:
  - Binding
tag:
  - Server
---

# binding (mqtt) 🚧

Zilla runtime mqtt binding (incubator).

```yaml {2}
mqtt_server0:
  type: mqtt
  kind: server
  routes:
    - when:
        - topic: echo
          capabilities: publish_and_subscribe
      exit: echo_server0
```

## Summary

Defines a binding with `mqtt 5.0` protocol support, with `server` behavior.

The `server` kind `mqtt` binding decodes `mqtt 5.0` protocol on the inbound network stream, producing higher level application streams for each `publish` or `subscribe` `topic`.

Conditional routes based on the `topic` `name` are used to route these application streams to an `exit` binding.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].topic\*](#when-topic)
  - [when\[\].capabilities](#when-capabilities)
- [routes\[\].exit\*](#routes-exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "server" ]

Behave as a `mqtt` `server`.

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: echo_server0
```

### routes

> `array` of `object`

Conditional `mqtt`-specific routes.

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
      - topic: echo
        capabilities: publish_and_subscribe
```

#### when[].topic\*

> `string`

Topic name.

#### when[].capabilities

> `enum` [ "publish_only", "subscribe_only", "publish_and_subscribe" ]

Publish or subscribe, or both.\
Defaults to `"publish_and_subscribe"`.

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
