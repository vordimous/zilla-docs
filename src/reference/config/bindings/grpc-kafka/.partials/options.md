### options

> `object`

The `grpc-kafka` specific options.

```yaml
options:
  idempotency:
    metadata: idempotency-key
  reliability:
    field: 32767
    metadata: last-message-id
  correlation:
    headers:
      service: zilla:service
      method: zilla:method
      correlation-id: zilla:correlation-id
      reply-to: zilla:reply-to
```

#### options.idempotency

> `object`

Metadata header used to specify the idempotency key when adapting `grpc` request-response streams to `kafka` topic streams.

#### idempotency.metadata

> `string` | Default: `idempotency-key`

The `grpc` metadata header name for idempotency key.

#### options.reliability

> `object`

Properties used when handling stream recovery.

#### reliability.field

> `integer` | Default: `32767` Minimum: `1` Maximum: `536870911`

The `grpc` unknown field number to send the `message-id`.

#### reliability.metadata

> `string` | Default: `last-message-id`

The `grpc` metadata header name for the last `message-id` seen when resuming a stream.

#### options.correlation

> `object`

Kafka request message headers injected when adapting `grpc` request-response streams to `kafka` topic streams.

#### correlation.headers\*

> `object`

Kafka request message reply to and correlation id header names injected when adapting `grpc` request-response streams to `kafka` topic streams.

#### headers.service

> `string` | Default: `zilla:service`

Kafka header name for `grpc` service.

#### headers.method

> `string` | Default: `zilla:method`

Kafka header name for `grpc` method.

#### headers.correlation-id

> `string` | Default: `zilla:correlation-id`

Kafka header name for request-response correlation identifier.

#### headers.reply-to

> `string` | Default: `zilla:reply-to`

Kafka header name for reply-to topic.
