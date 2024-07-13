---
shortTitle: mqtt-kafka
description: Zilla runtime mqtt-kafka binding
category:
  - Binding
tag:
  - Proxy
---

# mqtt-kafka Binding

Zilla runtime mqtt-kafka binding.

```yaml {2}
mqtt_kafka_proxy:
  type: mqtt-kafka
  kind: proxy
  options:
    server: mqtt-1.example.com:1883
    topics:
      sessions: mqtt-sessions
      messages: mqtt-messages
      retained: mqtt-retained
    clients:
      - place/{identity}/#
  routes:
    - when:
        - publish:
            - topic: place/+/device/#
        - subscribe:
            - topic: place/+/device/#
      with:
        messages: mqtt-devices
      exit: kafka_cache_client
  exit: kafka_cache_client
```

## Summary

Defines a binding with `mqtt-kafka` support, with `proxy` behavior.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
  - [options.server](#options-server)
  - [options.topics](#options-topics)
    - [topics.sessions\*](#topics-sessions)
    - [topics.messages\*](#topics-messages)
    - [topics.retained\*](#topics-retained)
  - [options.clients](#options-clients)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].publish](#when-publish)
    - [publish\[\].topic](#publish-topic)
  - [when\[\].subscribe](#when-subscribe)
    - [subscribe\[\].topic](#subscribe-topic)
- [routes\[\].exit\*](#routes-exit)
- [routes\[\].with](#routes-with)
  - [with.messages](#with-messages)
- [exit](#exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "proxy" ]

Behave as a `mqtt-kafka` `proxy`.

### options

> `object`

`mqtt-kafka`-specific options for configuring the `kafka` topics that the proxy will use to route mqtt messages and session states; and define server reference of the MQTT server in Zilla

#### options.server

> `string`

The server reference used by the MQTT server in Zilla. This config enables scaling of the MQTT server when running multiple Zilla instances as it uses [server redirection](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#_Toc3901255).

```yaml
options:
  server: mqtt-1.example.com:1883
```

#### options.topics

> `object`

The `kafka` topics Zilla needs when routing MQTT messages

```yaml
options:
  topics:
    sessions: mqtt-sessions
    messages: mqtt-messages
    retained: mqtt-retained
```

##### topics.sessions\*

> `string`

Compacted Kafka topic for storing mqtt session states. Cleanup policy must be log compacted.

##### topics.messages\*

> `string`

The default Kafka topic used for routing mqtt messages.

##### topics.retained\*

> `string`

Compacted Kafka topic for storing mqtt retained messages.

#### options.clients

> `array` of `string`

Pattern defining how to extract client identity from the topic. Using this we can ensure that all messages for the same client identity are produced to Kafka on the same topic partition.

```yaml
options:
  clients:
    - place/{identity}/#
```

### routes

> `array` of `object`

Conditional `mqtt-kafka`-specific routes when adapting `mqtt` topic streams to `kafka` topic streams.

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

### routes[].guarded

> `object` as named map of `string:string` `array`

List of roles required by each named guard to authorize this route.

```yaml
routes:
  - guarded:
      my_guard:
        - publish:clients
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route when adapting `mqtt` topic streams to `kafka` topic streams.
Read more: [When a route matches](../../../concepts/bindings.md#when-a-route-matches)

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

##### publish[].topic

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

##### subscribe[].topic

> `string`

MQTT topic filter pattern.

### routes[].exit\*

> `string`

Next binding when following this route.

### routes[].with

> `object`

Kafka parameters for matched route when adapting `mqtt` topic streams to `kafka` topic streams.

```yaml
with:
  messages: mqtt-devices
```

#### with.messages

> `string`

Kafka topic to use for the route.

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: kafka_cache_client
```

---

::: right
\* required
:::
