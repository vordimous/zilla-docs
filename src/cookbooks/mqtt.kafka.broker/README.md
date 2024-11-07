# mqtt.kafka.broker

This is the resource folder for the running the [MQTT Kafka broker guide](https://docs.aklivity.io/zilla/latest/how-tos/mqtt/mqtt.kafka.broker.html) found on our docs.

## Running locally

This cookbook runs using Docker compose.

### Setup

The `setup.sh` script will:

- create the necessary kafka topics
- create an MQTT broker at `mqtt://localhost:7183`

- Setup with a bitnami Kafka cluster

    ```bash
    ./setup.sh
    ```

- Setup with a Redpanda cluster

    ```bash
    KAFKA_VENDOR_PROFILE=redpanda ./setup.sh
    ```

- alternatively with the plain docker compose command respectively

    ```bash
    docker compose --profile kafka --profile init-kafka up -d
    ```

    ```bash
    KAFKA_VENDOR_PROFILE=redpanda docker compose --profile redpanda --profile init-redpanda up -d
    ```

### Using this cookbook

Follow the steps on our [MQTT Kafka broker guide](https://docs.aklivity.io/zilla/latest/how-tos/mqtt/mqtt.kafka.broker.html#send-a-greeting)

### Teardown

The `teardown.sh` script will remove any resources created.

```bash
./teardown.sh
```
