---
description: In this guide, you create Kafka topics and use Zilla to mediate MQTT broker messages onto those topics.
---

# Running an MQTT Kafka broker

In this guide, you create Kafka topics and use Zilla to mediate MQTT broker messages onto those topics.

Specifically, you will:

[Verify prerequisites](#prerequisites) to run this guide.
[Install and run](#tl-dr) Zilla with Kafka or use your own.
[Create topics](#check-the-kafka-topics) for the MQTT broker messages.
[Watch Kafka](#listen-for-messages) for new messages on the topics.
[Pub & Sub](#send-a-greeting) with an MQTT client.

## Tl;Dr

Download and run the Zilla [zilla-examples/mqtt.kafka.broker](https://github.com/aklivity/zilla-examples/tree/main/mqtt.kafka.broker) example using this install script. It will start Zilla and everything you need for this guide.

```bash:no-line-numbers
wget -qO- https://raw.githubusercontent.com/aklivity/zilla-examples/main/startup.sh | sh -s -- mqtt.kafka.broker
```

::: note
Alternatively, download [mqtt.kafka.broker](https://github.com/aklivity/zilla-examples/releases/latest/download/mqtt.kafka.broker.tar.gz) or the [startup.sh](https://github.com/aklivity/zilla-examples/releases/latest/download/startup.sh) script yourself.
:::

### Prerequisites

Before proceeding, you should have [Compose](https://docs.docker.com/compose/gettingstarted/) or optionally [Helm](https://helm.sh/docs/intro/install/) and [Kubernetes](https://kubernetes.io/docs/tasks/tools/) installed.

::: details Detailed prerequisites

- A connection to the internet
- Docker version 1.13.0+ or later is installed and running
- Docker Desktop or Docker Desktop for Windows on WSL 2
- Container host resources: 1 CPU, 1GB memory

Optional:

- Kafka 3.0+ hosted with the Docker network allowed to communicate
- Helm 3.0+
- Kubernetes 1.13.0+

:::

### Check the Kafka topics

Run the docker command under the `Verify the Kafka topics created` section of the script output. Verify these topics are listed. Read more on the data in these topics in [the overview](../../concepts/kafka-proxies/mqtt-proxy.html#step-2-pub-sub-message-reflect-with-kafka).

```output:no-line-numbers
mqtt-messages
mqtt-retained
mqtt-sessions
```

### Listen for messages

Run the docker command under the `Start a topic consumer to listen for messages` section of the script output. If you didn't use your own Kafka, you can also see all the topics in the [Kafka UI](http://localhost:8080/ui/clusters/local/all-topics).

### Send a greeting

Using [eclipse-mosquitto](https://hub.docker.com/_/eclipse-mosquitto) subscribe to the `zilla` topic.

```bash:no-line-numbers
docker run -it --rm eclipse-mosquitto \
mosquitto_sub -V 'mqttv5' --topic 'zilla' \
--host 'host.docker.internal' --port 7183 --debug
```

In a separate session, publish a message on the `zilla` topic.

```bash:no-line-numbers
docker run -it --rm eclipse-mosquitto \
mosquitto_pub -V 'mqttv5' --topic 'zilla' --message 'Hello, world' \
--host 'host.docker.internal' --port 7183 --debug --insecure
```

Send messages with the retained flag.

```bash:no-line-numbers
docker run -it --rm eclipse-mosquitto \
mosquitto_pub -V 'mqttv5' --topic 'zilla' --message 'Hello, retained' --retain \
--host 'host.docker.internal' --port 7183 --debug --insecure
```

Then restart the `mosquitto_sub` above. The latest retained message is delivered, and the other messages are not.

## Creating this example yourself

### Start a Kafka instance

You can use your own Kafka or set up a local Kafka with [resource.kafka.compose](https://github.com/aklivity/zilla-examples/releases/latest/download/resource.kafka.compose.tar.gz) and follow the setup instructions in the `README.md`.

Export these env variables or overwrite them with your remote Kafka if you skipped the local setup.

```output:no-line-numbers
export KAFKA_HOST=host.docker.internal
export KAFKA_PORT=29092
```

### Bootstrap Kafka

Create these topics in the Kafka environment.

```bash:no-line-numbers
\
/bin/kafka-topics.sh --bootstrap-server $KAFKA_HOST:$KAFKA_PORT --create --if-not-exists --topic mqtt-sessions
/bin/kafka-topics.sh --bootstrap-server $KAFKA_HOST:$KAFKA_PORT --create --if-not-exists --topic mqtt-messages --config cleanup.policy=compact
/bin/kafka-topics.sh --bootstrap-server $KAFKA_HOST:$KAFKA_PORT --create --if-not-exists --topic mqtt-retained --config cleanup.policy=compact
```

### Create your config

Create a new file called `zilla.yaml` and append the below yaml to it.

### Entrypoint

This will configure Zilla for accepting all of the `mqtt` traffic.

```yaml{14-16}
<!-- @include: ./mqtt_kafka_broker_zilla.yaml{-20} -->
```

::: right
[More on binding-tcp](../../reference/config/bindings/binding-tcp.md)
[More on binding-mqtt](../../reference/config/bindings/binding-mqtt.md)
:::

### Service definition

The service definitions will define how the clients using this service will interact with Kafka through Zilla.

```yaml{7-9}
<!-- @include: ./mqtt_kafka_broker_zilla.yaml{22-31} -->
```

::: right
[More on binding-mqtt-kafka](../../reference/config/bindings/binding-mqtt-kafka.md)
[More on topic data](../../concepts/kafka-proxies/mqtt-proxy.html#step-2-pub-sub-message-reflect-with-kafka)
:::

### Add a Kafka sync layer

The Zilla [cache_client and cache_server](../../reference/config/bindings/binding-kafka.html#kind) helps manage the smooth data transfer between the service definition and Kafka.

```yaml{11-12}
<!-- @include: ./mqtt_kafka_broker_zilla.yaml{33-46} -->
```

::: right
[More on binding-kafka cache](../../reference/config/bindings/binding-kafka.md#cache-behavior)
:::

### Point to a Running Kafka instance

This will define the location and connection for Zilla to communicate with Kafka.

```yaml{10-11}
<!-- @include: ./mqtt_kafka_broker_zilla.yaml{47-} -->
```

::: details Full zilla.yaml

```yaml
<!-- @include: ./mqtt_kafka_broker_zilla.yaml -->
```

:::

::: right
[More on binding-kafka client](../../reference/config/bindings/binding-kafka.md#client-behavior)
:::

### Start Zilla

With your `zilla.yaml` config, follow the [Zilla install instructions](../install.md) using your method of choice. Set the necessary Kafka environment variables.

::: code-tabs#bash

@tab Docker

```bash:no-line-numbers
--env KAFKA_HOST="$KAFKA_HOST" --env KAFKA_PORT="$KAFKA_PORT"
```

@tab Helm values.yaml

```yaml:no-line-numbers
# use the values from $KAFKA_HOST $KAFKA_PORT variables
env:
  - name: KAFKA_HOST
    value: "\"host.docker.internal\""
  - name: KAFKA_PORT
    value: "\"29092\""
```

:::

### Adding TLS

You can add TLS to this broker by adding a vault and tls binding as described in the [Server Encryption](../../concepts/config-intro.md#server-encryption-tls-ssl) section.

## Remove the running containers

Find the path to the `teardown.sh` script(s) in the `use the teardown script(s) to clean up` section of the example output and run it. If you didn't provide an external Kafka endpoint, there will be scripts for both Zilla and the local Kafka installs.
