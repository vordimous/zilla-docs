---
shortTitle: http-kafka
description: Zilla runtime http-kafka binding
category:
  - Binding
tag:
  - Proxy
---

# http-kafka Binding

<!-- markdownlint-disable MD024 -->

Zilla runtime http-kafka binding.

```yaml {2}
http_kafka_proxy:
  type: http-kafka
  kind: proxy
  routes:
    - when:
        - method: GET
          path: /items
      exit: kafka_cache_client
      with:
        capability: fetch
        topic: items-snapshots
        merge:
          content-type: application/json
    - when:
        - method: GET
          path: /items/{id}
      exit: kafka_cache_client
      with:
        capability: fetch
        topic: items-snapshots
        filters:
          - key: ${params.id}
    - when:
        - method: PUT
          path: /items/{id}
        - method: GET
          path: /items/{id};cid={correlationId}
      exit: kafka_cache_client
      with:
        capability: produce
        topic: items-requests
        acks: leader_only
        key: ${params.id}
        reply-to: items-responses
        async:
          location: /items/${params.id};cid=${correlationId}
```

## Summary

The `proxy` kind `http-kafka` binding adapts `http` request-response streams to `kafka` topic streams.

## Fetch capability

Routes with `fetch` capability map `http` `GET` requests to a `kafka` log-compacted topic, supporting filtered retrieval of messages with a specific key, or unfiltered retrieval of all messages with distinct keys in the topic merged into a unified response.

Filtering can be performed by `kafka` message key, message headers, or a combination of both message key and headers, extracting the parameter values from the inbound `http` request path.

Status `200` `http` responses include an `etag` header that can be used with `if-none-match` for subsequent conditional `GET` requests to check for updates. Rather than polling, `http` requests can also include the `prefer: wait=N` header to wait a maximum of `N` seconds before responding with `304` if not modified. When a new message arrives in the topic that would modify the response, then all `prefer: wait=N` clients receive the response immediately.

## Produce capability

Routes with `produce` capability map any `http` request-response to a correlated pair of `kafka` messages. The `http` request message is sent to a `requests` topic, with a `zilla:correlation-id` header. When the request message received and processed by the `kafka` `requests` topic consumer, it produces a response message to the `responses` topic, with the same `zilla:correlation-id` header to correlate the response.

Requests including an `idempotency-key` `http` header can be replayed and safely receive the same response. This requires the `kafka` consumer to detect and ignore the duplicate request with the same `idempotency-key` and `zilla:correlation-id`.

Specifying `async` allows clients to include a `prefer: respond-async` header in the `http` request to receive `202 Accepted` response with `location` response header.

A corresponding `routes[].when` object with matching `GET` method and `location` path is also required for follow up `GET` requests to return the same response as would have been returned if `prefer: respond-async` request header had been omitted.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
  - [options.idempotency](#options-idempotency)
    - [idempotency.header](#idempotency-header)
  - [options.correlation](#options-correlation)
    - [correlation.headers](#correlation-headers)
    - [headers.reply-to](#headers-reply-to)
    - [headers.correlation-id](#headers-correlation-id)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].method](#when-method)
  - [when\[\].path](#when-path)
- [routes\[\].exit\*](#routes-exit)
- [routes\[\].with](#routes-with)
- [with.capability (fetch)](#with-capability-fetch)
  - [with.topic](#with-topic)
  - [with.filters](#with-filters)
    - [filters\[\].key](#filters-key)
    - [filters\[\].headers](#filters-headers)
  - [with.merge](#with-merge)
    - [merge.content-type](#merge-content-type)
    - [merge.patch](#merge-patch)
    - [patch.initial](#patch-initial)
    - [patch.path](#patch-path)
- [with.capability (produce)](#with-capability-produce)
  - [with.topic](#with-topic-1)
  - [with.acks](#with-acks)
  - [with.key](#with-key)
  - [with.overrides](#with-overrides)
  - [with.reply-to](#with-reply-to)
  - [with.async](#with-async)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "proxy" ]

Behave as an `http-kafka` `proxy`.

```yaml
kind: proxy
```

### options

> `object`

`http-kafka`-specific options for adapting `http` request-response streams to `kafka` topic streams.

```yaml
options:
  idempotency:
    header: idempotency-key
  correlation:
    headers:
      reply-to: zilla:reply-to
      correlation-id: zilla:correlation-id
```

#### options.idempotency

> `object`

HTTP request header used to specify the idempotency key when adapting `http` request-response streams to `kafka` topic streams.

##### idempotency.header

> `string` | Default: `"idempotency-key"`

HTTP request header name for idempotency key.

#### options.correlation

> `object`

Kafka request message headers injected when adapting `http` request-response streams to `kafka` topic streams.

##### correlation.headers

> `object`

Kafka request message reply to and correlation id header names injected when adapting `http` request-response streams to `kafka` topic streams.

##### headers.reply-to

> `string` | Default: `"zilla:reply-to"`

Kafka header name for reply-to topic.

##### headers.correlation-id

> `string` | Default: `"zilla:correlation-id"`

Kafka header name for request-response correlation identifier.

### routes

> `array` of `object`

Conditional `http-kafka`-specific routes for adapting `http` request-response streams to `kafka` topic streams.

Correlated Request-Response route:

```yaml
routes:
  - when:
      - method: PUT
        path: /items/{id}
      - method: GET
        path: /items/{id};cid={correlationId}
    exit: kafka_cache_client
    with:
      capability: produce
      topic: items-requests
      acks: leader_only
      key: ${params.id}
      reply-to: items-responses
      async:
        location: /items/${params.id};cid=${correlationId}
```

Single topic CRUD routes:

```yaml
routes:
  - when:
      - method: POST
        path: /items
    exit: kafka_cache_client
    with:
      capability: produce
      topic: items-crud
      key: ${idempotencyKey}
  - when:
      - method: GET
        path: /items
    exit: kafka_cache_client
    with:
      capability: fetch
      topic: items-snapshots
      merge:
        content-type: application/json
  - when:
      - method: GET
        path: /items/{id}
    exit: kafka_cache_client
    with:
      capability: fetch
      topic: items-snapshots
      filters:
        - key: ${params.id}
  - when:
      - path: /items/{id}
    exit: kafka_cache_client
    with:
      capability: produce
      topic: items-crud
      key: ${params.id}
```

### routes[].guarded

> `object` as named map of `string:string` `array`

Roles required by named guard.

```yaml
routes:
  - guarded:
      test:
        - read:items
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route when adapting `http` request-response streams to `kafka` topic streams.
Read more: [When a route matches](../../../concepts/config-intro.md#when-a-route-matches)

```yaml
routes:
  - when:
      - method: GET
        path: /items/{id};cid={correlationId}
```

#### when[].method

> `string`

HTTP Method, such as `GET`, `HEAD`, `POST`, `PUT`, `DELETE`, `CONNECT`, `OPTIONS`, `TRACE`, `PATCH`.

#### when[].path

> `string`

Path with optional embedded parameter names, such as `/{topic}`.

### routes[].exit\*

> `string`

Default exit binding when no conditional routes are viable.

```yaml
routes:
  - when:
    ...
    exit: kafka_cache_client
```

### routes[].with

> **oneOf**: [Fetch](#with-capability-fetch) | [Produce](#with-capability-produce)

Defines the route with the Fetch capability.

```yaml
with:
  capability: fetch
```

Defines the route with the Produce capability.

```yaml
with:
  capability: produce
```

### with.capability (fetch)

> `object`

Kafka parameters for matched route when adapting `http` request-response streams to `kafka` topic fetch streams.

```yaml
with:
  capability: fetch
  topic: items-snapshots
  filters:
    - key: ${params.id}
  merge:
    content-type: application/json
    patch:
      initial: "[]"
      path: /-
```

#### with.topic

> `string`

Topic name, optionally referencing path parameter such as `${params.topic}`.

#### with.filters

> `array` of `object`

List of criteria (any match) to this filter. Kafka filters for matched route when adapting `http` request-response streams to `kafka` topic fetch streams. All specified headers and key must match for the combined criteria to match.

##### filters[].key

> `string`

Message key, optionally referencing path parameter such as `${params.key}`.

##### filters[].headers

> `object`

Message headers, with value optionally referencing path parameter such as `${params.headerX}`.

#### with.merge

> `object`

Merge multiple Kafka messages into a unified HTTP response. Kafka merge configuration for matched route when adapting `http` request-response streams to `kafka` topic streams where all messages are fetched and must be merged into a unified `http` response.

##### merge.content-type

> `const` "application/json"

Content type of merged HTTP response.

##### merge.patch

> `object`

Describes how to patch initial HTTP response to include one or more Kafka messages in unified HTTP response.

- patch (application/json)

  Kafka merge patch configuration for matched route when adapting `http` request-response streams to `kafka` topic streams where all messages are fetched and must be merged into a unified `http` response.

##### patch.initial

> `string`

Initial JSON value.

##### patch.path

> `const` "/-"

JSON Patch path to include each Kafka message in unified HTTP response.

### with.capability (produce)

> `object`

Kafka parameters for matched route when adapting `http` request-response streams to `kafka` topic produce streams.

```yaml
with:
  capability: produce
  topic: items-requests
  acks: leader_only
  key: ${params.id}
  reply-to: items-responses
  async:
    location: /items/${params.id};cid=${correlationId}
```

#### with.topic

> `string`

Kafka topic name, optionally referencing path parameter such as `${params.topic}`.

#### with.acks

> `enum` [ "none", "leader_only", "in_sync_replicas" ] | Default: `"in_sync_replicas"`

Kafka acknowledgement mode

#### with.key

> `string`

Kafka message key, optionally referencing path parameter such as `${params.id}`.

#### with.overrides

> `object`

Kafka message headers, with values optionally referencing path parameter.

#### with.reply-to

> `string`

Kafka reply-to topic name.

#### with.async

> `object`

Allows an HTTP response to be retrieved asynchronously

##### async.location

> `string`

Path where the async result can be fetched, with values optionally referencing path parameter or `${correlationId}`.

---

::: right
\* required
:::
