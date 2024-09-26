#### topics[].transforms

> `array`

Extract key or value attributes from the typed Kafka message to apply to the Kafka message id or Kafka headers. The `extract-key` property must come before the `extract-headers` property if they both exist.

```yaml
transforms:
  - extract-key: ${message.key.id}
```

```yaml
transforms:
  - extract-headers:
      my-kafka-header: ${message.value.test}
```

```yaml
transforms:
  - extract-key: ${message.value.id}
  - extract-headers:
      my-kafka-header: ${message.value.test}
```

#### transforms[].extract-key

> `string` | Pattern: `^\\$\\{message\\.(key|value)\\.([A-Za-z_][A-Za-z0-9_]*)\\}$`

Use a part of the Kafka message as the Kafka message key.

#### transforms[].extract-headers

> `object` as map of named `string` properties | Pattern: `^\\$\\{message\\.(key|value)\\.([A-Za-z_][A-Za-z0-9_]*)\\}$`

Use a part of the Kafka message as a Kafka message header.
