---
description: In this guide, you create Kafka topics and use Zilla to map MQTT broker messages onto those topics.
---

# Running an MQTT Kafka broker

In this guide, you create Kafka topics and use Zilla to map MQTT broker messages onto those topics.

Specifically, you will:

[Verify prerequisites](#prerequisites) to run this guide.
[Install and run](#tl-dr) Zilla with Kafka or use your own.
[Create topics](#check-the-kafka-topics) for the MQTT broker messages.
[Watch Kafka](#listen-for-messages) for new messages on the topics.
[Pub & Sub](#send-a-greeting) with an MQTT client.
[Route messages](#message-routing) to different Kafka topics.

## Tl;Dr

Download and run the Zilla `mqtt.kafka.broker` cookbook using this install script. It will start Zilla and everything you need for this guide.

```bash
wget -qO- https://raw.githubusercontent.com/aklivity/zilla-examples/main/startup.sh | sh -s -- mqtt.kafka.broker
```

::: note
Alternatively, download [mqtt.kafka.broker](https://github.com/aklivity/zilla-docs/releases/latest/download/mqtt.kafka.broker.tar.gz) and follow the `README` yourself.
:::

### Prerequisites

Before proceeding, you should have [Compose](https://docs.docker.com/compose/gettingstarted/) installed.

::: details Detailed prerequisites

- A connection to the internet
- Docker version 1.13.0+ or later is installed and running
- Docker Desktop or Docker Desktop for Windows on WSL 2
- Container host resources: 1 CPU, 1GB memory

Optional:

- Kafka 3.0+ hosted with the Docker network allowed to communicate

:::

### Check the Kafka topics

Run the docker command under the `Verify the Kafka topics created` section of the script output. Verify these topics are listed. Read more on the data in these topics in [the overview.](../../concepts/kafka-proxies/mqtt-proxy.md#step-2-pub-sub-message-reflect-with-kafka)

```output:no-line-numbers
mqtt-messages
mqtt-devices
mqtt-retained
mqtt-sessions
```

### Listen for messages

Run the docker command under the `Start a topic consumer to listen for messages` section of the script output. If you didn't use your own Kafka, you can also see all the topics in the [Kafka UI.](http://localhost:8080/ui/clusters/local/all-topics)

### Send a greeting

Using [eclipse-mosquitto](https://hub.docker.com/_/eclipse-mosquitto) subscribe to the `zilla` topic.

```bash
docker run -it --rm eclipse-mosquitto \
mosquitto_sub --url mqtt://host.docker.internal:7183/zilla
```

In a separate session, publish a message on the `zilla` topic.

```bash
docker run -it --rm eclipse-mosquitto \
mosquitto_pub --url mqtt://host.docker.internal:7183/zilla --message 'Hello, world'
```

Send messages with the retained flag.

```bash
docker run -it --rm eclipse-mosquitto \
mosquitto_pub --url mqtt://host.docker.internal:7183/zilla --message 'Hello, retained' --retain
```

Then restart the `mosquitto_sub` above. The latest retained message is delivered, and the other messages are not.

### Message routing

Send a message from a device and a sensor.

```bash
docker run -it --rm eclipse-mosquitto \
mosquitto_pub --url mqtt://host.docker.internal:7183/place/01/device/01 --message 'I am device01'
```

```bash
docker run -it --rm eclipse-mosquitto \
mosquitto_pub --url mqtt://host.docker.internal:7183/place/01/sensor/01 --message 'I am sensor01'
```

You can check the [Kafka UI](http://localhost:8080/ui/clusters/local/all-topics) and see that device01's message was delivered to the `mqtt-devices` topic while sensor01's message is on the `mqtt-messages` topic.

## Creating this example yourself

### Start a Kafka or Redpanda instance

You will need to create the required topics below.

```output:no-line-numbers
mqtt-messages
mqtt-devices cleanup.policy=compact
mqtt-retained cleanup.policy=compact
mqtt-sessions cleanup.policy=compact
```

### Create your config

Create a new file called `zilla.yaml` and append the below yaml to it.

### Entrypoint

This will configure Zilla for accepting all of the `mqtt` traffic. The [tcp](../../reference/config/bindings/tcp/README.md) binding defines the ports Zilla will accept traffic for both MQTT and WebSocket connections.

```yaml{12-13,15-16}
<!-- @include: ../../cookbooks/mqtt.kafka.broker/zilla.yaml#entrypoint -->
```

::: right
[More on binding-tcp](../../reference/config/bindings/tcp/README.md)
:::

A [ws](../../reference/config/bindings/tcp/) binding is added to handle any MQTT over WebSocket using the `mqtt` protocol. The [mqtt](../../reference/config/bindings/mqtt/README.md) binding then handles all of the MQTT message traffic that needs to go to Kafka.

```yaml{17,22}
<!-- @include: ../../cookbooks/mqtt.kafka.broker/zilla.yaml#server -->
```

::: right
[More on binding-mqtt](../../reference/config/bindings/mqtt/README.md)
[More on binding-ws](../../reference/config/bindings/tcp/README.md)
:::

### Service definition

The service definition defines how the clients using this service will interact with Kafka through Zilla. The required set of Kafka topics are defined in the [options.topics](../../reference/config/bindings/mqtt-kafka/proxy.md#options-topics) where Zilla manages any MQTT required features. A client identity can be determined by pulling the identifier out of the topic using the [options.clients](../../reference/config/bindings/mqtt-kafka/proxy.md#options-clients) property.

```yaml{7-9,21}
<!-- @include: ../../cookbooks/mqtt.kafka.broker/zilla.yaml#kafka_mapping -->
```

::: right
[More on binding-mqtt-kafka](../../reference/config/bindings/mqtt-kafka/README.md)
[More on topic data](../../concepts/kafka-proxies/mqtt-proxy.md#step-2-pub-sub-message-reflect-with-kafka)
:::

Additionally, a route is defined to capture any "device" messages and route them to a specific topic called `mqtt-devices`. Here Zilla enables routing different topic patterns into one Kafka topic using MQTT supported wildcards. All other messages will use the default `exit` and end up in the `mqtt-messages` topic.

```yaml{4,5,7,8,10}
  <!-- @include: ../../cookbooks/mqtt.kafka.broker/zilla.yaml#device_mapping -->
```

::: right
[More on When a route matches](../../concepts/bindings.md#when-a-route-matches)
[More on mqtt-kafka binding routes](../../reference/config/bindings/mqtt-kafka/proxy.md#routes)
:::

### Add a Kafka sync layer

The Zilla [cache_client](../../reference/config/bindings/kafka/cache_client.md) and [cache_server](../../reference/config/bindings/kafka/cache_server.md) helps manage the smooth data transfer between the service definition and Kafka. It is important to bootstrap the topics that will be brokering MQTT messages.

```yaml{11-13}
<!-- @include: ../../cookbooks/mqtt.kafka.broker/zilla.yaml#kafka_sync -->
```

::: right
[More on kafka binding cache](../../reference/config/bindings/kafka/README.md#cache-behavior)
:::

### Point to a Running Kafka instance

This will define the location and connection for Zilla to communicate with Kafka.

```yaml{7}
<!-- @include: ../../cookbooks/mqtt.kafka.broker/zilla.yaml#kafka_client -->
```

::: details Full zilla.yaml

```yaml
<!-- @include: ../../cookbooks/mqtt.kafka.broker/zilla.yaml -->
```

:::

::: right
[More on kafka cache_client binding](../../reference/config/bindings/kafka/cache_client.md)
:::

### Start Zilla

With your `zilla.yaml` config, follow the [Zilla install instructions](../deploy-operate/index.md) using your method of choice. Set the necessary `KAFKA_BOOTSTRAP_SERVER` environment variable to your running Kafka instance.

### Adding TLS

You can add TLS to this MQTT broker by adding a vault and tls binding as described in the [Server Encryption](../../concepts/bindings.md#server-encryption-tls-ssl) section.

## Remove the running containers

Find the path to the `teardown.sh` script(s) in the `use the teardown script(s) to clean up` section of the example output and run it. If you didn't provide an external Kafka endpoint, there will be scripts for both Zilla and the local Kafka installs.
