# Models

When Zilla interacts with the data inside of a message, it only parses the necessary metadata with standard formats. The processing of messages is simple and uses fewer resources to proxy data streams. A [`model`](../reference/config/models/) adds the type syntax or structure definitions that Zilla needs to deserialize the remaining message parts.

## Primitive Models

Primitive models will have additional properties based on the type used.

```yaml
model: string
encoding: utf_8
```

> [Validating message keys](../how-tos/models/index.md#validating-message-keys) | [http.proxy.schema.inline example](https://github.com/aklivity/zilla-examples/tree/main/http.proxy.schema.inline)

## Schema Models

Schema-based models will reference a [catalog](./catalogs.md) to supply the binding with the configured model definition. Schemas referenced by their subject will fetch the latest version of that schema.

- Fetch the latest schema by `subject`.

 ```yaml
  model: avro
  catalog:
    my_catalog:
     - subject: my_schema_subject
 ```

- Fetch the latest schema by the schema definition on a Kafka `topic`.

 ```yaml
  model: avro
  catalog:
    my_catalog:
     - strategy: topic
 ```

- Fetch a specific schema by its schema ID.

 ```yaml
  model: avro
  catalog:
    my_catalog:
     - id: 42
 ```

> [Validating a new message](../how-tos/models/index.md#validating-a-new-message) | [Expose a different model format](../how-tos/models/index.md#expose-a-different-model-format) | [http.kafka.karapace example](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.karapace)
