We need to verify that an MQTT client can publish and subscribe to topics and ensure the messages get routed through your Kafka cluster.

### Connect with an MQTT Client

> This verifies MQTT client connectivity to your Kafka cluster via the IoT Ingest and Control MQTT Broker.

We can now verify that the MQTT client can successfully communicate with your Kafka cluster.

::: warning
Replace these TLS server names accordingly for your own custom wildcard DNS pattern.
:::

### Subscribe to a topic

Using [eclipse-mosquitto](https://hub.docker.com/_/eclipse-mosquitto) subscribe to the `zilla` topic.

```bash
docker run -it --rm eclipse-mosquitto \
mosquitto_sub --url mqtts://mqtt.example.aklivity.io/zilla
```

### Publish to a topic

In a separate session, publish a message on the `zilla` topic.

```bash
docker run -it --rm eclipse-mosquitto \
mosquitto_pub --url mqtts://mqtt.example.aklivity.io/zilla --message 'Hello, world'
```

You should see the `Hello, world` message printed by the subscriber.
