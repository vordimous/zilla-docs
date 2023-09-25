---
description: Running these Zilla samples will introduce some MQTT features.
---

# MQTT Intro

Get started with Zilla by deploying our Docker Compose stack. Before proceeding, you should have [Docker Compose](https://docs.docker.com/compose/gettingstarted/) installed.

## MQTT Broker onto Kafka event streams

Running this Zilla sample will create a simple API to create and list items. All of the data will be stored on a Kafka topic.

### Setup

Create these files, `zilla.yaml` and `docker-compose.yaml`, in the same directory.

::: code-tabs#yaml

@tab zilla.yaml

```yaml {11,26-28,41-42}
name: MQTT-intro
bindings:

# Gateway ingress config
  tcp_server:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port:
        - 1883
    exit: mqtt_server

# MQTT Broker With an exit to Kafka
  mqtt_server:
    type: mqtt
    kind: server
    exit: mqtt_kafka_proxy

# Proxy MQTT messages to Kafka
  mqtt_kafka_proxy:
    type: mqtt-kafka
    kind: proxy
    options:
      topics:
        sessions: mqtt-sessions
        messages: mqtt-messages
        retained: mqtt-retained
    exit: kafka_cache_client

# Kafka caching layer
  kafka_cache_client:
    type: kafka
    kind: cache_client
    exit: kafka_cache_server
  kafka_cache_server:
    type: kafka
    kind: cache_server
    options:
      bootstrap:
        - mqtt-sessions
        - mqtt-retained
    exit: kafka_client

# Connect to local Kafka
  kafka_client:
    type: kafka
    kind: client
    exit: kafka_tcp_client
  kafka_tcp_client:
    type: tcp
    kind: client
    options:
      host: kafka
      port: 29092
    routes:
      - when:
          - cidr: 0.0.0.0/0
```

@tab docker-compose.yaml

```yaml {9,40-42}
version: '3'
services:

  zilla:
    image: ghcr.io/aklivity/zilla:latest
    depends_on:
      - kafka
    ports:
      - 1883:1883
    volumes:
      - ./zilla.yaml:/etc/zilla/zilla.yaml
    command: start -v -e

  kafka:
    image: docker.io/bitnami/kafka:latest
    container_name: kafka
    ports:
      - 9092:9092
      - 29092:9092
    environment:
      ALLOW_PLAINTEXT_LISTENER: "yes"
      KAFKA_CFG_NODE_ID: "1"
      KAFKA_CFG_BROKER_ID: "1"
      KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: "1@127.0.0.1:9093"
      KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP: "CLIENT:PLAINTEXT,INTERNAL:PLAINTEXT,CONTROLLER:PLAINTEXT"
      KAFKA_CFG_CONTROLLER_LISTENER_NAMES: "CONTROLLER"
      KAFKA_CFG_LOG_DIRS: "/tmp/logs"
      KAFKA_CFG_PROCESS_ROLES: "broker,controller"
      KAFKA_CFG_LISTENERS: "CLIENT://:9092,INTERNAL://:29092,CONTROLLER://:9093"
      KAFKA_CFG_INTER_BROKER_LISTENER_NAME: "INTERNAL"
      KAFKA_CFG_ADVERTISED_LISTENERS: "CLIENT://localhost:9092,INTERNAL://kafka:29092"
      KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE: "true"

  kafka-init:
    image: docker.io/bitnami/kafka:3.2
    command: 
      - "/bin/bash"
      - "-c"
      -  |
        /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server kafka:29092 --create --if-not-exists --topic mqtt-messages
        /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server kafka:29092 --create --if-not-exists --topic mqtt-sessions --config cleanup.policy=compact
        /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server kafka:29092 --create --if-not-exists --topic mqtt-retained --config cleanup.policy=compact
    depends_on:
      - kafka
    init: true


networks:
  default:
    name: zilla-network
    driver: bridge
```

:::

### Run Zilla and Kafka

```bash:no-line-numbers
docker-compose up -d
```

### Use [mosquitto_pub](https://mosquitto.org/download/) to send a greeting

Subscribe to the `zilla` topic

```bash:no-line-numbers
mosquitto_sub -V 'mqttv5' --topic 'zilla' --debug
```

In a separate session publish a message on the `zilla` topic

```bash:no-line-numbers
mosquitto_pub -V 'mqttv5' --topic 'zilla' --message 'Hello, world' --debug --insecure
```

Your subscribed session should receive the message

::: note Wait for the services to start
if you are stuck on `Client null sending CONNECT`, the likely cause is Zilla and Kafka are still starting up.
:::

### Remove the running containers

```bash:no-line-numbers
docker-compose down
```

::: tip See more of what Zilla can do
Go deeper into this concept with the [mqtt.kafka.reflect](https://github.com/aklivity/zilla-examples/tree/main/mqtt.kafka.reflect) example.
:::

## Going Deeper

Try out more MQTT examples:

- [mqtt.kafka.reflect](https://github.com/aklivity/zilla-examples/tree/main/mqtt.kafka.reflect)
- [mqtt.kafka.reflect.jwt](https://github.com/aklivity/zilla-examples/tree/main/mqtt.kafka.reflect.jwt)
