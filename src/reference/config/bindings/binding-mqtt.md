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
  options:
    authorization:
      my_jwt_guard:
        credentials:
          connect:
            username: Bearer {credentials}
    versions:
      - v5
      - v3.1.1
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

Defines a binding with `mqtt` protocol support, with `server` behavior.

The `server` kind `mqtt` binding decodes the MQTT protocol on the inbound network stream, producing higher level application streams for each `publish` or `subscribe` `topic`. The `session` state is also described by a higher level application stream.

Conditional routes based on the `topic` `name` are used to route these application streams to an `exit` binding.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [exit](#exit)
- [options](#options)
- [options.authorization](#options-authorization)
  - [authorization.credentials](#authorization-credentials)
    - [credentials.connect](#credentials-connect)
    - [connect.username](#connect-username)
    - [connect.password](#connect-password)
- [options.versions](#options-versions)
- [options.topics](#options-topics)
  - [topics\[\].name\*](#topics-name)
  - [topics\[\].content](#topics-content)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].session](#when-session)
    - [session\[\].client-id](#session-client-id)
  - [when\[\].publish](#when-publish)
    - [publish\[\].topic](#publish-topic)
  - [when\[\].subscribe](#when-subscribe)
    - [subscribe\[\].topic](#subscribe-topic)
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

### options

> `object`

`mqtt`-specific options.

```yaml
options:
  authorization:
    my_jwt_guard:
      credentials:
        connect:
          username: Bearer {credentials}
  versions:
    - v5
    - v3.1.1
```

### options.authorization

> `object` as map of named objects

Authorization by a named guard.

```yaml
authorization:
  my_jwt_guard:
    credentials:
      connect:
        username: Bearer {credentials}
```

#### authorization.credentials

> `object`

Defines how to extract credentials from the MQTT connect packet.

##### credentials.connect

> `object`

MQTT connect packet properties

##### connect.username

> `string`

Extract credentials from the MQTT connect packet username property with `{credentials}`, e.g. `"Bearer` `{credentials}"`.

##### connect.password

> `string`

Extract credentials from the MQTT connect packet password property with `{credentials}`, e.g. `"Bearer` `{credentials}"`.

### options.versions

> `array` of `enum` [ "v5", "v3.1.1" ]

Supported protocol versions.

### options.topics

> `array` of `object`

Topic configuration.

#### topics[].name\*

> `string`

Topic name.

#### topics[].content

> `object` of a named [`model`](../models/)

Enforce validation for content

### routes

> `array` of `object`

Conditional `mqtt`-specific routes.

### routes[].guarded

> `object` as named map of `string:string` `array`

List of roles required by each named guard to authorize this route.

```yaml
routes:
  - guarded:
      my_guard:
        - read:items
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.
Read more: [When a route matches](../../../concepts/bindings.md#when-a-route-matches)

```yaml
routes:
  - when:
      - session:
          - client-id: "*"
      - publish:
          - topic: command/one
          - topic: command/two
      - subscribe:
          - topic: reply
```

#### when[].session

> `array` of `object`

Array of mqtt session properties

##### session[].client-id

> `string`

An MQTT client identifier, allowing the usage of wildcards.

#### when[].publish

> `array` of `object`

Array of MQTT topic names for publish capability.

##### publish[].topic

> `string`

#### when[].subscribe

> `array` of `object`

Array of MQTT topic names for subscribe capability.

##### subscribe[].topic

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
