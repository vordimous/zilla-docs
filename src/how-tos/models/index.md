# Structured Message data

Adding structured types to the message data streams in Zilla.

## Adding models structure to Kafka messages

The `kafka` `cache_client` and `cache_server` bindings are responsible for interacting with the messages stored on Kafka topics. This is where Zilla can implement any structured type definitions. The schema for the message can come from the Kafka topic's schema definition using the topic `strategy` or be a reference to a schema's `subject` or `id`. The [catalog](../catalogs/index.md) definition will determine which methods are available when referencing schemas.

### Validating message keys

The message key for a topic can be set to any primitive model type and Zilla will validate the key when a message is Produced on a topic.

```yaml
  north_kafka_cache_client:
    type: kafka
    kind: cache_client
    options:
      topics:
        - name: my-kafka-topic
          key:
            model: string
```

### Validating a new message

The `kafka cache_client` binding can parse the message value, or body of the message, that is Produced on a topic.

```yaml
  north_kafka_cache_client:
    type: kafka
    kind: cache_client
    options:
      topics:
        - name: my-kafka-topic
          value:
            model: avro
            catalog:
              my_catalog:
                - strategy: topic
```

### Enforcing a schema on Fetch

The `kafka cache_server` can enforce a schema on messages Fetched from a topic. This will prevent any messages that are pruduced on a Kafka topic from getting cosumed by a client if that messages doesn't match to the specified schema.

```yaml
  south_kafka_cache_server:
    type: kafka
    kind: cache_server
    options:
      bootstrap:
        - my-kafka-topic
      topics:
        - name: my-kafka-topic
          value:
            model: avro
            catalog:
              my_catalog:
                - strategy: topic
```

### Expose a different model format

The `kafka cache_client` can read the `view` model and translate it into the specified `model` for when a message is produced on the Kafka topic. Then the `kafka cache_server` can read the `model` from the topic and translate it into the `view` model.

In this case the `view` model that clients interact with needs to be a JSON object but the topic `model` is a serialize Avro object.

```yaml
  north_kafka_cache_client:
    type: kafka
    kind: cache_client
    options:
      topics:
        - name: my-kafka-topic
          value:
            model: avro
            view: json
            catalog:
              my_catalog:
                - strategy: topic
    exit: south_kafka_cache_server
  south_kafka_cache_server:
    type: kafka
    kind: cache_server
    options:
      bootstrap:
        - my-kafka-topic
      topics:
        - name: my-kafka-topic
          value:
            model: avro
            view: json
            catalog:
              my_catalog:
                - strategy: topic
```
