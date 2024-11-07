### routes

> `array` of `object`

Conditional `mqtt-kafka` specific routes.

```yaml
routes:
  - when:
      - publish:
          - topic: place/+/device/#
      - subscribe:
          - topic: place/+/device/#
    with:
      messages: mqtt-devices
    exit: kafka_cache_client
```

#### routes[].guarded

> `object` as map of named `array` of `string`

List of roles required by each named guard to authorize this route.

```yaml
routes:
  - guarded:
      my_guard:
        - publish:clients
```

#### routes[].when

> `array` of `object`

List of conditions (any match) to match this route when adapting `mqtt` topic streams to `kafka` topic streams.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

```yaml
routes:
  - when:
      - publish:
          - topic: place/#
      - subscribe:
          - topic: place/#
```

#### when[].publish

> `array` of `object`

Array of MQTT topic filters matching topic names for publish.

```yaml
- publish:
    - topic: place/#
    - topic: subs/#
```

#### publish[].topic

> `string`

MQTT topic filter pattern.

#### when[].subscribe

> `array` of `object`

Array of MQTT topic filters matching topic names for subscribe.

```yaml
- subscribe:
    - topic: place/#
    - topic: subs/#
```

#### subscribe[].topic

> `string`

MQTT topic filter pattern.

#### routes[].exit

> `string`

Next binding when following this route.

#### routes[].with\*

> `object`

Kafka parameters for matched route when adapting `mqtt` topic streams to `kafka` topic streams.

```yaml
with:
  messages: mqtt-devices
```

#### with.messages

> `string`

Kafka topic to use for the route.
