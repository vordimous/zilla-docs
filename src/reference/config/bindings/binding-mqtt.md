---
shortTitle: mqtt
description: Zilla runtime mqtt binding
category:
  - Binding
tag:
  - Server
---

# mqtt Binding

Zilla runtime mqtt binding.

```yaml {2}
mqtt_server:
  type: mqtt
  kind: server
  routes:
    - when:
        - session:
            - client-id: "*"
        - publish:
            - topic: command/one
            - topic: command/two
        - subscribe:
            - topic: reply
  exit: mqtt_kafka_proxy
```

## Summary

Defines a binding with [MQTT v5.0](https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html) protocol support, with `server` behavior.

The `server` kind `mqtt` binding decodes the MQTT protocol on the inbound network stream, producing higher level application streams for each `publish` or `subscribe` `topic`. The `session` state is also described by a higher level application stream.

Conditional routes based on the `topic` `name` are used to route these application streams to an `exit` binding.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].session](#when-session)
    - [session.client-id](#session-client-id)
  - [when\[\].publish](#when-publish)
    - [publish.topic](#publish-topic)
  - [when\[\].subscribe](#when-subscribe)
    - [subscribe.topic](#subscribe-topic)
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
exit: echo_server
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
      test:
        - read:items
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.

```yaml
routes:
  - when:
      # any required
      - session:
          - client-id: "*"
      - publish:
          - topic: command/one
      - subscribe:
          - topic: reply
  - when:
      # all required
      - session:
          - client-id: "*"
        publish:
          - topic: command/two
        subscribe:
          - topic: reply
```

#### when[].session

> `array` of `object`

Array of mqtt session properties

##### session.client-id

> `string`

An MQTT client identifier, allowing the usage of wildcards.

#### when[].publish

> `array` of `object`

Array of MQTT topic names for publish capability.

##### publish.topic

> `string`

#### when[].subscribe

> `array` of `object`

Array of MQTT topic names for subscribe capability.

##### subscribe.topic

> `string`

### routes[].exit\*

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: mqtt_kafka_proxy
```

---

::: right
\* required
:::
