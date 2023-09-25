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

Compacted Kafka topic for storing mqtt session states.

##### topics.messages\*

> `string`

Kafka topic used for routing mqtt messages.

##### topics.retained\*

> `string`

Compacted Kafka topic for storing mqtt retained messages.

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
