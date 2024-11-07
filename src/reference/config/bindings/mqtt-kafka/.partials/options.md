### options\*

> `object`

The `mqtt-kafka` specific options.

#### options.server

> `string`

The server reference used by the MQTT server in Zilla. This config enables scaling of the MQTT server when running multiple Zilla instances as it uses [server redirection](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#_Toc3901255).

```yaml
options:
  server: mqtt-1.example.com:1883
```

#### options.topics\*

> `object`

The `kafka` topics Zilla needs when routing MQTT messages

```yaml
options:
  topics:
    sessions: mqtt-sessions
    messages: mqtt-messages
    retained: mqtt-retained
```

#### topics.sessions\*

> `string`

A Kafka topic for storing mqtt session states.

::: warning cleanup.policy Required
A `compact` [cleanup.policy](https://kafka.apache.org/30/generated/topic_config.html#topicconfigs_cleanup.policy) is required.
:::

#### topics.messages\*

> `string`

The default Kafka topic used for routing mqtt messages.

#### topics.retained\*

> `string`

A Kafka topic for storing mqtt retained messages.

::: info cleanup.policy Recommended
A `compact` [cleanup.policy](https://kafka.apache.org/30/generated/topic_config.html#topicconfigs_cleanup.policy) is recommended.
:::

#### options.clients

> `array` of `string`

Pattern defining how to extract client identity from the topic. Using this we can ensure that all messages for the same client identity are produced to Kafka on the same topic partition.

```yaml
options:
  clients:
    - place/{identity}/#
```

#### options.publish

> `object`

The MQTT client publish specific options.

#### publish.qosMax\*

> `enum` [ `at_most_once`, `at_least_once`, `exactly_once` ] | Default: `exactly_once`

Highest allowed QOS level.

```yaml
options:
  publish:
    qosMax: at_most_once
```
