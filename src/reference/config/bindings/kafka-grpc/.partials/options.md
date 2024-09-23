
### options

> `object`

The `kafka-grpc` specific options.

```yaml
options:
  acks: leader_only
  idempotency:
    metadata: idempotency-key
  correlation:
    headers:
      service: zilla:service
      method: zilla:method
      correlation-id: zilla:correlation-id
      reply-to: zilla:reply-to
```

#### options.acks

> `enum` [ `none`, `leader_only`, `in_sync_replicas` ] | Default: `in_sync_replicas`

The `kafka` acknowledgment mode.

#### options.idempotency

> `object`

Metadata header used to specify the idempotency key.

#### idempotency.metadata

> `string` | Default: `idempotency-key`

The `grpc` metadata header name for idempotency key.

#### options.correlation

> `object`

Kafka request message headers injected.

#### correlation.headers

> `object`

Kafka request message correlation header names used.

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
