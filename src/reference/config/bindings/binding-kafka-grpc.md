---
shortTitle: kafka-grpc
description: Zilla runtime kafka-grpc binding
category:
  - Binding
tag:
  - Remote Server
---

# kafka-grpc Binding

Zilla runtime kafka-grpc binding.

```yaml {2}
kafka_grpc_proxy:
  type: kafka-grpc
  kind: remote_server
  entry: kafka_cache_client0
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
  routes:
    - when:
        - topic: requests
          reply-to: responses
          method: example.EchoService/*
      exit: grpc0
      with:
        scheme: http
        authority: localhost:8080
```

## Summary

The `remote_server` kind `kafka-grpc` binding adapts `kafka` topic streams to `grpc` request-response streams.

The `grpc` request message is received from a `requests` topic, with a `zilla:correlation-id` header, initiating a `grpc` service method invocation. When the `grpc` response received, a response message is produced to the `responses` topic, with the same `zilla:correlation-id` header to correlate the response.

Note that `grpc` requests and responses can be `unary` or `streaming`.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
  - [options.acks](#options-acks)
  - [options.idempotency](#options-idempotency)
    - [idempotency.metadata](#idempotency-metadata)
  - [options.correlation](#options-correlation)
    - [correlation.headers](#correlation-headers)
    - [headers.service](#headers-service)
    - [headers.method](#headers-method)
    - [headers.correlation-id](#headers-correlation-id)
    - [headers.reply-to](#headers-reply-to)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].topic](#when-topic)
  - [when\[\].reply-to](#when-reply-to)
  - [when\[\].method](#when-method)
- [routes\[\].exit\*](#routes-exit)
- [routes\[\].with](#routes-with)
  - [with.scheme](#with-scheme)
  - [with.authority](#with-authority)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "remote_server" ]

Behave as an `kafka-grpc` `remote_server`.

```yaml
kind: remote_server
```

### options

> `object`

`kafka-grpc`-specific options for adapting `kafka` topic streams to `grpc` request-response streams.

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

> `enum` [ "none", "leader_only", "in_sync_replicas" ]

The `kafka` acknowledgment mode.

#### options.idempotency

> `object`

Metadata header used to specify the idempotency key when adapting `kafka` topic streams to `grpc` request-response streams.

##### idempotency.metadata

> `string`

The `grpc` metadata header name for idempotency key.\
Defaults to `"idempotency-key"`.

#### options.correlation

> `object`

Kafka request message headers injected when adapting `kafka` topic streams to `grpc` request-response streams.

##### correlation.headers

> `object`

Kafka request message correlation header names used when adapting `kafka` topic streams to `grpc` request-response streams.

##### headers.service

> `string`

Kafka header name for `grpc` service.\
Defaults to `"zilla:service"`.

##### headers.method

> `string`

Kafka header name for `grpc` method.\
Defaults to `"zilla:method"`.

##### headers.correlation-id

> `string`

Kafka header name for request-response correlation identifier.\
Defaults to `"zilla:correlation-id"`.

##### headers.reply-to

> `string`

Kafka header name for reply-to topic.\
Defaults to `"zilla:reply-to"`.

### routes

> `array` of `object`

Conditional `kafka-grpc`-specific routes for adapting `kafka` topic streams to `grpc` request-response streams.

```yaml
routes:
  - guarded:
      test:
        - echo:messages
    when:
      - topic: requests
        reply-to: responses
        method: example.EchoService/*
    exit: grpc0
    with:
      scheme: http
      authority: localhost:8080
```

### routes[].guarded

> `object` as named map of `string:string` `array`

Roles required by named guard.

```yaml
routes:
  - guarded:
      test:
        - echo:messages
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route when adapting `kafka` topic streams to `grpc` request-response streams.

```yaml
routes:
  - when:
      - topic: requests
        reply-to: responses
        method: example.EchoService/*
```

#### when[].topic

> `string`

The name of a Kafka topic for requests.

#### when[].reply-to

> `string`

The name of the Kafka topic for correlated responses.

#### when[].method

> `string`

Pattern matching the fully qualified name of a `grpc` service method, in the format `<service>/<method>` allowing wildcard `*` for the method to indicate any method.

### routes[].exit\*

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: kafka_cache_client0
```

### routes[].with

> `object`

Kafka parameters for matched route when adapting `grpc` request-response streams to `kafka` topic fetch streams.

```yaml
with:
  scheme: http
  authority: localhost:8080
```

#### with.scheme

> `string`

The `grpc` request scheme.

#### with.authority

> `string`

The `grpc` request authority.

---

::: right
\* required
:::
