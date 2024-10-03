---
description: The Zilla MQTT Kafka Proxy manages MQTT Pub/Sub connections and messages on and off of Kafka.
prev: false
next: /tutorials/mqtt/mqtt-intro.md
---

# MQTT Kafka Proxy

The Zilla MQTT Kafka Proxy manages MQTT Pub/Sub connections and messages on and off of Kafka.

An MQTT server acts as a broker between publishers and subscribers. This requires a complex protocol to manage the wide range of IoT devices and use cases. By proxying these messages on and off of Kafka with the [mqtt-kafka](../../reference/config/bindings/mqtt-kafka/) binding in a [zilla.yaml](../../reference/config/overview.md) config, IoT devices can transmit data to a wider range of tech stacks, adapting to more business needs.

Zilla uses specific Kafka topics to store and route MQTT messages, meaning the Kafka architecture can be optimized for MQTT Pub/Sub. MQTT client subscribers and publishers will communicate with Zilla the same as any broker.

## An MQTT Broker

A Zilla MQTT server can manage client sessions and broker all traffic, adhering to the official [MQTT protocol](https://mqtt.org/mqtt-specification/).

### Protocol versions

An MQTT client can use either the [MQTT v5.0](https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html) and [MQTT v3.1.1](https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html) specifications.

### QOS

An MQTT client can use any Quality of Service flag.

- QoS 0 - At most once
- QoS 1 - At least once
- QoS 2 - Exactly once

### MQTT over WebSocket

The [tcp](../../reference/config/bindings/tcp/README.md) binding defines the ports Zilla will accept traffic for both MQTT and WebSocket connections. Zilla natively handles WebSockets and can manage the MQTT protocol over an active connection.

### Last Will and Testament

An MQTT client can specify a last will and testament (LWT) message and topic that is delivered when the client disconnects abruptly and fails to reconnect before session timeout.

### Correlated request-response

An MQTT client can use the v5 request-response paradigm to send messages with a response topic and correlated data. A requesting MQTT client can send a message on one topic and receive a response on another, while a responding MQTT client or any Kafka workflow can handle the message's journey.

### Reconnect

An MQTT client reconnecting with the same client-id, even to a different Zilla instance, will automatically remain subscribed to MQTT topics previously subscribed while previously connected.

### Session takeover

An MQTT client connecting with the same client-id, even to a different Zilla instance, will automatically disconnect the original MQTT client and take over the session.

### Redirect

An MQTT client can be redirected to a specific Zilla instance, sharding client session state across Zilla instances without needing to replicate every client's session state on each Zilla instance.

## Pub/Sub with Kafka

Zilla manages MQTT pub/sub to Kafka using three Kafka topics. The specific topic names can be configured using the [options.topics](../../reference/config/bindings/mqtt-kafka/proxy.md#options-topics) property.

### Messages on Kafka

All MQTT messages brokered by Zilla are published on the [messages](../../reference/config/bindings/mqtt-kafka/proxy.md#topics-messages) Kafka topic. The MQTT message topic becomes the Kafka key.

### Topic routing

By defining [routes](../../reference/config/bindings/mqtt-kafka/proxy.md#routes) in Zilla, you can direct MQTT publish and subscribe connections to specific kafka topics other than the [messages](../../reference/config/bindings/mqtt-kafka/proxy.md#topics-messages) Kafka topic. The [sessions](../../reference/config/bindings/mqtt-kafka/proxy.md#topics-sessions) and [retained](../../reference/config/bindings/mqtt-kafka/proxy.md#topics-retained) topics are not affected by routing.

### Retaining Messages

An MQTT client can Publish messages to any configured Kafka topics, marking specific messages with the retain flag. These messages will have a copy published on the [retained](../../reference/config/bindings/mqtt-kafka/proxy.md#topics-retained) Kafka topic. When a client subscribes with replay-on-subscribe, Zilla will deliver the retained messages.

### Session Management

MQTT connect, disconnect, and other session messages are maintained on the the log compacted [sessions](../../reference/config/bindings/mqtt-kafka/proxy.md#topics-sessions) Kafka topic. A message keyed by the MQTT client ID on the topic is used to track client subscriptions across client reconnects.

#### Kafka Consumer Groups for MQTT sessions

A consumer group is created for each unique client ID used by an MQTT session with the format `zilla:<zilla namespace>-<binding name>-<MQTT client ID>`. Zilla minimizes the number of hearbeats required to approximately one per MQTT session expiry interval. When an MQTT session expires, perhaps because the MQTT client abruptly disconnected but did not reconnect, the corresponding consumer group also expires and the associated tracking state in the [sessions](../../reference/config/bindings/mqtt-kafka/proxy.md#topics-sessions) Kafka topic is cleaned up automatically.

## Authorizing clients

Any connection Zilla handles can be secured using the [tls](../../reference/config/bindings/tls/) binding. This means both MQTT and MQTT over WebSocket can be encrypted. Additionally, A client connection to the MQTT server can be guarded by the [jwt](../../reference/config/guards/jwt.md) guard supporting JWT access tokens, with fine-grained privileges enforced on publish or subscribe to MQTT topics.
