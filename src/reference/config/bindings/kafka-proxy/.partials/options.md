
### options\*

> `object`

The `kafka-proxy` specific options.

```yaml
options:
  external:
    host: kafka-#.external.net
    port: 9093
  internal:
    host: b-#.kafka.internal.net
    port: 9094
```

#### options.external\*

> `object`

Kafka proxy endpoint used by external clients.

```yaml
external:
  host: kafka-#.external.net
  port: 9093
```

#### external.host\*

> `string`

Hostname pattern for external Kafka broker names, where `#` is an integer.

#### external.port\*

> `integer`

Port number for external Kafka broker.

#### options.internal\*

> `object`

Internal Kafka broker endpoint.

```yaml
internal:
  host: b-#.kafka.internal.net
  port: 9094
```

#### internal.host\*

> `string`

Hostname pattern for internal Kafka broker names, where `#` is an integer.

#### internal.port\*

> `integer`

Port number for internal Kafka broker.
