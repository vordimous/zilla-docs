### routes\*

> `array` of `object`

Conditional `mqtt` specific routes.

#### routes[].guarded

> `object` as map of named `array` of `string`

List of roles required by each named guard to authorize this route.

```yaml
routes:
  - guarded:
      my_guard:
        - read:items
```

#### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

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

#### session[].client-id

> `string`

An MQTT client identifier, allowing the usage of wildcards.

#### when[].publish

> `array` of `object`

Array of MQTT topic names for publish capability.

#### publish[].topic

> `string`

The MQTT topic to match on that supports standard MQTT wildcards `/+/`, `/#`.

#### when[].subscribe

> `array` of `object`

Array of MQTT topic names for subscribe capability.

#### subscribe[].topic

> `string`

The MQTT topic to match on that supports standard MQTT wildcards `/+/`, `/#`.

#### routes[].exit

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: mqtt_kafka_proxy
```
