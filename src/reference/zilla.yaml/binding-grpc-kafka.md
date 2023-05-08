---
shortTitle: binding (grpc-kafka) 🚧
description: Zilla runtime grpc-kafka binding
category:
  - Binding
tag:
  - Proxy
---

# grpc-kafka Binding 🚧

Zilla runtime grpc-kafka binding.

```yaml {2}
grpc_kafka_proxy0:
  type: grpc-kafka
  kind: proxy
  options:
    reliability:
      field: 32767
      metadata: last-message-id
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
        - method: example.FanoutService/*
          metadata:
            custom-text: custom value
            custom-binary:
              base64: Y3VzdG9tIHZhbHVl
      exit: kafka_cache_client0
      with:
        capability: fetch
        topic: messages
        filters:
          key: custom-key
          headers:
            custom-text: custom-value
    - when:
        - method: example.EchoService/*
          metadata:
            custom-text: custom value
            custom-binary:
              base64: Y3VzdG9tIHZhbHVl
      exit: kafka_cache_client0
      with:
        capability: produce
        topic: requests
        acks: leader_only
        key: custom-key
        overrides:
          custom-text: custom-value
        reply-to: responses
```

## Summary

The `proxy` kind `grpc-kafka` binding adapts `grpc` request-response streams to `kafka` topic streams.

## Fetch capability

Routes with `fetch` capability map `grpc` `Empty` requests to a `kafka` topic, supporting filtered retrieval of messages with a specific key or headers, or unfiltered retrieval of all messages in the topic merged into a unified response.

Filtering can be performed by `kafka` message key, message headers, or a combination of both message key and headers.

Reliable message delivery is achieved by capturing the value of the `reliability` `field` injected into each response stream message at the `grpc` client, and replaying the value via the `reliability` `metadata` header when reestablishing the stream with a new `grpc` request.

## Produce capability

Routes with `produce` capability map any `grpc` request-response to a correlated stream of `kafka` messages. The `grpc` request message(s) are sent to a `requests` topic, with a `zilla:correlation-id` header. When the request message(s) are received and processed by the `kafka` `requests` topic consumer, it produces response message(s) to the `responses` topic, with the same `zilla:correlation-id` header to correlate the response.

Requests including an `idempotency-key` `grpc` metadata header can be replayed and safely receive the same response. This requires the `kafka` consumer to detect and ignore the duplicate request with the same `idempotency-key` and `zilla:correlation-id`.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
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
  - [when\[\].method](#when-method)
  - [when\[\].metadata](#when-metadata)
      - [metadata.base64](#metadata-base64)
- [routes\[\].exit\*](#routes-exit)
- [routes\[\].with\*](#routes-with)
- [with.capability (fetch)](#with-capability-fetch)
  - [with.topic](#with-topic)
  - [with.filters](#with-filters)
    - [filters\[\].key](#filters-key)
    - [filters\[\].headers](#filters-headers)
- [with.capability (produce)](#with-capability-produce)
  - [with.topic](#with-topic-1)
  - [with.acks](#with-acks)
  - [with.key](#with-key)
  - [with.overrides](#with-overrides)
  - [with.reply-to](#with-reply-to)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "proxy" ]

Behave as an `grpc-kafka` `proxy`.

```yaml
kind: proxy
```

### options

> `object`

`grpc-kafka`-specific options for adapting `grpc` request-response streams to `kafka` topic streams.

```yaml
options:
  idempotency:
    metadata: idempotency-key
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

##### idempotency.metadata

> `string`

The `grpc` metadata header name for idempotency key.\
Defaults to `"idempotency-key"`.

#### options.correlation

> `object`

Kafka request message headers injected when adapting `grpc` request-response streams to `kafka` topic streams.

##### correlation.headers

> `object`

Kafka request message reply to and correlation id header names injected when adapting `grpc` request-response streams to `kafka` topic streams.

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

Conditional `grpc-kafka`-specific routes for adapting `grpc` request-response streams to `kafka` topic streams.

```yaml
routes:
  - guarded:
      test0:
        - read:messages
    when:
      - service: example.FanoutService
        metadata:
          custom-text: custom value
          custom-binary:
            base64: Y3VzdG9tIHZhbHVl
    exit: kafka_cache_client0
    with:
      capability: fetch
      topic: messages
      filters:
        key: custom-key
        headers:
          custom-text: custom-value
  - guarded:
      test0:
        - echo:messages
    when:
      - method: example.EchoService/*
        metadata:
          custom-text: custom value
          custom-binary:
            base64: Y3VzdG9tIHZhbHVl
    exit: kafka_cache_client0
    with:
      capability: produce
      topic: requests
      acks: leader_only
      key: custom-key
      overrides:
        custom-text: custom-value
      reply-to: responses
```

### routes[].guarded

> `object` as named map of `string:string` `array`

Roles required by named guard.

```yaml
routes:
  - guarded:
      test0:
        - read:messages
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route when adapting `grpc` request-response streams to `kafka` topic streams.

```yaml
routes:
  - when:
      - method: example.EchoService/*
        metadata:
          custom-text: custom value
          custom-binary:
            base64: Y3VzdG9tIHZhbHVl
```

#### when[].method

> `string`

Pattern matching the fully qualified name of a `grpc` service method, in the format `<service>/<method>` allowing wildcard `*` for the method to indicate any method.

#### when[].metadata

> `object` of name-value headers

Metadata header name value pairs (all match).

Each metadata header value can be `string` or `object` with `base64` property.

##### metadata.base64

> `string`

Base64 encoded value for binary metadata header.

### routes[].exit\*

> `string`

Next binding when following this route.

```yaml
exit: kafka_cache_client0
```

### routes[].with\*

> **oneOf**: [fetch](#with-capability-fetch) | [produce](#with-capability-produce)

Defines the route with the `fetch` capability.

```yaml
with:
  capability: fetch
```

Defines the route with the `produce` capability.

```yaml
with:
  capability: produce
```

### with.capability (fetch)

> `object`

Kafka parameters for matched route when adapting `grpc` request-response streams to `kafka` topic fetch streams.

```yaml
with:
  capability: fetch
  topic: messages
  filters:
    key: custom-key
    headers:
      custom-text: custom-value
```

#### with.topic

> `string`

The name of a Kafka topic.

#### with.filters

> `array` of `object`

List of criteria (any match) to this filter. Kafka filters for matched route when adapting `grpc` request-response streams to `kafka` topic fetch streams. All specified headers and key must match for the combined criteria to match.

##### filters[].key

> `string`

The filter criteria for the Kafka message key.

##### filters[].headers

> `object`

The filter criteria for the Kafka message headers.

### with.capability (produce)

> `object`

Kafka parameters for matched route when adapting `grpc` request-response streams to `kafka` topic produce streams.

```yaml
with:
  capability: produce
  topic: requests
  acks: leader_only
  key: custom-key
  overrides:
    custom-text: custom-value
  reply-to: responses
```

#### with.topic

> `string`

The name of a Kafka topic for requests.

#### with.acks

> `enum` [ "none", "leader_only", "in_sync_replicas" ]

Kafka acknowledgment mode\
Defaults to `"in_sync_replicas"`.

#### with.key

> `string`

The Kafka message key to include with each message.

#### with.overrides

> `object`

The Kafka message headers to inject with each message.

#### with.reply-to

> `string`

The name of the Kafka topic for correlated responses.

---

::: right
\* required
:::
