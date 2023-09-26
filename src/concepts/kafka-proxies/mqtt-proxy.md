---
description: This guide will walk through the way Zilla manages MQTT Pub/Sub connections and messages.
---

# MQTT Kafka Proxy

This guide will walk through the way Zilla manages MQTT Pub/Sub connections and messages.

An MQTT server acts as a broker between publishers and subscribers. This requires a complex protocol to manage the wide range of IoT devices and use cases. By proxying these messages on and off of Kafka with the [mqtt-kafka](../../reference/config/bindings/binding-mqtt-kafka.md) binding, IoT devices can transmit data to a wider range of tech stacks, adapting to more business needs.

Zilla uses specific Kafka topics to store and route MQTT messages, meaning the Kafka architecture can be optimized for MQTT Pub/Sub. MQTT client subscribers and publishers will communicate with Zilla the same as any broker.

## Step 1: Declaring the broker

A Zilla MQTT server can manage client sessions and broker all messages sent.

```yaml
mqtt_server:
  type: mqtt
  kind: server
  exit: mqtt_kafka_proxy

mqtt_kafka_proxy:
  type: mqtt-kafka
  kind: proxy
  options:
    topics:
      sessions: mqtt-sessions
      messages: mqtt-messages
      retained: mqtt-retained
```

### Protocol version

The Zilla MQTT `server` supports the [MQTT v5.0 Specification].

::: info Feature Coming Soon <HopeIcon icon="circle-right"/>
[MQTT v3.1.1 Specification] support is currently on the [Zilla roadmap]. Star and watch the [Zilla repo] for new releases!
:::

[MQTT v5.0 Specification]:https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html
[MQTT v3.1.1 Specification]:http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
[Zilla roadmap]:https://github.com/orgs/aklivity/projects/4
[Zilla repo]:https://github.com/aklivity/zilla/releases

### QOS

The Zilla MQTT `server` supports the "At most once (QoS 0)" Quality of Service flag.

::: info Feature Coming Soon <HopeIcon icon="circle-right"/>
At least once (QoS 1) and Exactly once (QoS 2) delivery support is currently on the [Zilla roadmap]. Star and watch the [Zilla repo] for new releases!
:::

## Step 2: Pub/Sub message reflect with Kafka

Zilla manages MQTT pub/sub using three Kafka topics. The specific topic names can be configured using the [options.topics](../../reference/config/bindings/binding-mqtt-kafka.md#options-topics) property.

```yaml
topics:
  messages: mqtt-messages
  retained: mqtt-retained
  sessions: mqtt-sessions
```

### Messages on Kafka

All MQTT messages brokered by Zilla are published on the `messages` Kafka topic. The MQTT message topic becomes the Kafka key.

### Retaining Messages

MQTT messages with the `retain` flag set will have a copy published on the `retained` Kafka topic.

### Session Management

MQTT connect and disconnect messages are published on the `sessions` Kafka topic.

## Step 3: Authorizing clients

A client connection to the MQTT server can be guarded by the [jwt](../../reference/config/guards/guard-jwt.md) guard.

```yaml{2,19,25}
guards:
  jwt_mqtt_auth:
    type: jwt
    options:
      issuer: https://auth.example.com
      audience: https://api.example.com
      keys:
        - kty: RSA
          n: qq...aDQ==
          e: AQAB
          alg: RS256
          kid: example
bindings:
  mqtt_server:
    type: mqtt
    kind: server
    options:
      authorization:
        jwt_mqtt_auth:
          credentials:
            connect:
              username: Bearer {credentials}
    routes:
      - guarded:
          jwt_mqtt_auth:
            - mqtt:stream
        exit: mqtt_kafka_proxy

```

## Try it out

Go check out the [MQTT Kafka Reflect example](https://github.com/aklivity/zilla-examples/tree/main/mqtt.kafka.broker) or the [JWT Auth example](https://github.com/aklivity/zilla-examples/tree/main/mqtt.kafka.broker.jwt) example for a full implementation of an MQTT proxy.
