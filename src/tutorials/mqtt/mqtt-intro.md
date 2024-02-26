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

```yaml {10,25-27,40-41}
<!-- @include: ./zilla.yaml -->
```

@tab docker-compose.yaml

```yaml {10,44-46}
<!-- @include: ./docker-compose.yaml -->
```

:::

### Run Zilla and Kafka

```bash:no-line-numbers
docker-compose up -d
```

### Send a greeting

Using [eclipse-mosquitto](https://hub.docker.com/_/eclipse-mosquitto) subscribe to the `zilla` topic.

```bash:no-line-numbers
docker run -it --rm eclipse-mosquitto \
mosquitto_sub --url mqtt://host.docker.internal:7183/zilla
```

In a separate session, publish a message on the `zilla` topic.

```bash:no-line-numbers
docker run -it --rm eclipse-mosquitto \
mosquitto_pub --url mqtt://host.docker.internal:7183/zilla --message 'Hello, world'
```

Send messages with the retained flag.

```bash:no-line-numbers
docker run -it --rm eclipse-mosquitto \
mosquitto_pub --url mqtt://host.docker.internal:7183/zilla --message 'Hello, retained' --retain
```

Then restart the `mosquitto_sub` above. The latest retained message is delivered, and the other messages are not.

### Remove the running containers

```bash:no-line-numbers
docker-compose down
```

::: tip See more of what Zilla can do
Go deeper into this concept with the [Running an MQTT Kafka broker](../../how-tos/mqtt/mqtt.kafka.broker.md) example.
:::

## Going Deeper

Try out more MQTT examples:

- [Running an MQTT Kafka broker](../../how-tos/mqtt/mqtt.kafka.broker.md)
- [mqtt.kafka.broker.jwt](https://github.com/aklivity/zilla-examples/tree/main/mqtt.kafka.broker.jwt)
