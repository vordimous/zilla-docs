---
shortTitle: proxy
---

# asyncapi proxy

The asyncapi proxy binding creates composite of `mqtt-kafka` binding with proxy kind mapping MQTT streams to Kafka streams.

```yaml
<!-- @include: ./.partials/proxy.yaml -->
```

## Configuration (\* required)

<!-- @include: ../.partials/vault.md -->

### options

> `object`

The `proxy` specific options.

```yaml
specs:
  http_api:
    servers:
      - name: plain
    catalog:
      my_catalog:
        subject: petstore
        version: latest
```

<!-- @include: ./.partials/options.md -->

### options.kafka

> `object`

The `kafka` binding specific options.

#### kafka.topics

> `array` of `object`

Topic configuration.

<!-- @include: ../.partials/options-kafka-topics.md -->

#### topics[].defaultOffset

> `enum` [ `live`, `historical` ]

Fetch offset to use for new consumers

<!-- @include: ../.partials/options-kafka-topics-transforms.md -->

#### kafka.sasl

> `object`

SASL credentials to use when connecting to `kafka` brokers.

<!-- @include: ../.partials/options-kafka-sasl.md -->

### options.mqtt-kafka

> `object`

The `mqtt-kafka` binding specific options.

#### mqtt-kafka.channels

> `object`

AsyncAPI Kafka channels describing the necessary topics for the MQTT-Kafka mapping.

```yaml
mqtt-kafka:
  channels:
    sessions: mqttSessions
    retained: mqttRetained
    messages: mqttMessages
```

#### channels.sessions

> `string`

AsyncAPI Kafka sessions channel.

```yaml
sessions: mqttSessions
```

#### channels.retained

> `string`

AsyncAPI Kafka retained channel.

```yaml
retained: mqttRetained
```

#### channels.messages

> `string`

AsyncAPI Kafka messages channel.

```yaml
messages: mqttMessages
```

### options.http

> `object`

The HTTP specific options.

#### http.authorization

> `object` as map of named `object` properties

Authorization by guard for the `HTTP/1.1` and `HTTP/2` protocols.

```yaml
authorization:
  my_jwt_guard:
    credentials:
      headers:
        authorization: Bearer {credentials}
```

<!-- @include: ../.partials/options-http-auth.md -->

### options.mqtt

> `object`

The MQTT specific options.

#### mqtt.authorization

> `object` as map of named `object` properties

Authorization by guard for the `HTTP/1.1` and `HTTP/2` protocols.

```yaml
authorization:
  my_jwt_guard:
    credentials:
      headers:
        authorization: Bearer {credentials}
```

<!-- @include: ../.partials/options-mqtt-auth.md -->

#### options.tls

> `object`

The TLS specific options.

<!-- @include: ../.partials/options-tls.md -->

<!-- @include: ./.partials/routes.md -->
#### routes[].exit

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: asyncapi_client
```
<!-- @include: ../.partials/exit.md -->
<!-- @include: ../.partials/telemetry.md -->
