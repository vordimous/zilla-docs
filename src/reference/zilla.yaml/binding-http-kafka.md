---
shortTitle: binding (http-kafka)
description: Zilla runtime http-kafka binding
category:
  - Binding
tag:
  - Proxy
---

# http-kafka Binding

Zilla runtime http-kafka binding

```yaml {2}
http_kafka_proxy0:
  type: http-kafka
  kind: proxy
  routes:
    - when:
        - method: GET
          path: "/items"
      exit: kafka_cache_client0
      with:
        capability: fetch
        topic: items-snapshots
        merge:
          content-type: application/json
    - when:
        - method: GET
          path: "/items/{id}"
      exit: kafka_cache_client0
      with:
        capability: fetch
        topic: items-snapshots
        filters:
          - key: "${params.id}"
    - when:
        - path: "/items/{id}"
        - method: GET
          path: "/items/{id};{correlationId}"
      exit: kafka_cache_client0
      with:
        capability: produce
        topic: items-requests
        acks: leader_only
        key: "${params.id}"
        reply-to: items-responses
        async:
          location: "/items/${params.id};${correlationId}"
```

## Summary

The `proxy` kind `http-kafka` binding adapts `http` request-response streams to `kafka` topic streams.

### Fetch capability

Routes with `fetch` capability map `http` `GET` requests to a `kafka` log-compacted topic, supporting filtered retrieval of messages with a specific key, or unfiltered retrieval of all messages with distinct keys in the topic merged into a unified response.

Filtering can be performed by `kafka` message key, message headers, or a combination of both message key and headers, extracting the parameter values from the inbound `http` request path.

Status `200` `http` responses include an `etag` header that can be used with `if-none-match` for subsequent conditional `GET` requests to check for updates. Rather than polling, `http` requests can also include the `prefer: wait=N` header to wait a maximum of `N` seconds before responding with `304` if not modified. When a new message arrives in the topic that would modify the response, then all `prefer: wait=N` clients receive the response immediately.

### Produce capability

Routes with `produce` capability map any `http` request-response to a correlated pair of `kafka` messages. The `http` request message is sent to a `requests` topic, with a `zilla:correlation-id` header. When the request message received and processed by the `kafka` `requests` topic consumer, it produces a response message to the `responses` topic, with the same `zilla:correlation-id` header to correlate the response.

Requests including an `idempotency-key` `http` header can be replayed and safely receive the same response. This requires the `kafka` consumer to detect and ignore the duplicate request with the same `idempotency-key` and `zilla:correlation-id`.

Specifying `async` allows clients to include a `prefer: respond-async` header in the `http` request to receive `202 Accepted` response with `location` response header.

A corresponding `route` `condition` with matching `GET` method and `location` path is also required for follow up `GET` requests to return the same response as would have been returned if `prefer: respond-async` request header had been omitted.

## Configuration


:::: note Properties

- [Fetch capability](#fetch-capability)
- [Produce capability](#produce-capability)
- [kind\*](#kind)
- [options](#options)
  - [options.idempotency | `object`](#options-idempotency-object)
    - [idempotency.header | `string`](#idempotency-header-string)
  - [options.correlation | `object`](#options-correlation-object)
    - [correlation.headers | `object`](#correlation-headers-object)
    - [headers.reply-to | `string`](#headers-reply-to-string)
    - [headers.correlation-id | `string`](#headers-correlation-id-string)
- [routes](#routes)
  - [route | `object`](#route-object)
- [route.guarded](#route-guarded)
- [route.when](#route-when)
  - [when\[\].method | `string`](#when-method-string)
  - [when\[\].path | `string`](#when-path-string)
- [route.exit\*](#route-exit)
- [route.with](#route-with)
- [with.capability (fetch)](#with-capability-fetch)
  - [with.topic | `string`](#with-topic-string)
  - [with.filters | `array` of `filter object`](#with-filters-array-of-filter-object)
    - [filter | `object`](#filter-object)
    - [filter.key | `string`](#filter-key-string)
    - [filter.headers | `object`](#filter-headers-object)
  - [with.merge | `object`](#with-merge-object)
  - [merge.content-type | `const "application/json"`](#merge-content-type-const-application-json)
  - [merge.patch | `object`](#merge-patch-object)
  - [patch.initial | `string`](#patch-initial-string)
  - [patch.path | `const "/-"`](#patch-path-const)
- [with.capability (produce)](#with-capability-produce)
  - [with.topic | `string`](#with-topic-string-1)
  - [with.acks | `enum [ "none", "leader_only", "in_sync_replicas" ]`](#with-acks-enum-none-leader-only-in-sync-replicas)
  - [with.key | `string`](#with-key-string)
  - [with.overrides | `object`](#with-overrides-object)
  - [with.reply-to | `string`](#with-reply-to-string)
  - [with.async | `object`](#with-async-object)


::: right
\* = required
:::

::::

### kind\*

> enum [ "proxy" ]

Behave as an `http-kafka` `proxy`

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

#### options.idempotency | `object`

HTTP request header used to specify the idempotency key when adapting `http` request-response streams to `kafka` topic streams.

##### idempotency.header | `string`

HTTP request header name for idempotency key.\
Defaults to `"idempotency-key"`

#### options.correlation | `object`

Kafka request message headers injected when adapting `http` request-response streams to `kafka` topic streams.

##### correlation.headers | `object`

Kafka request message reply to and correlation id header names injected when adapting `http` request-response streams to `kafka` topic streams.

##### headers.reply-to | `string`

Kafka header name for reply-to topic.\
Defaults to `"zilla:reply-to"`.

##### headers.correlation-id | `string`

Kafka header name for request-response correlation identifier.\
Defaults to `"zilla:correlation-id"`.

### routes

> `array` of [`route`](#route-object)

Conditional `http-kafka`-specific routes

```yaml
routes:
  - when:
      - method: GET
        path: "/items"
    exit: kafka_cache_client0
    with:
      capability: fetch
      topic: items-snapshots
      merge:
        content-type: application/json
  - when:
      - method: GET
        path: "/items/{id}"
    exit: kafka_cache_client0
    with:
      capability: fetch
      topic: items-snapshots
      filters:
        - key: "${params.id}"
  - when:
      - path: "/items/{id}"
      - method: GET
        path: "/items/{id};{correlationId}"
    exit: kafka_cache_client0
    with:
      capability: produce
      topic: items-requests
      acks: leader_only
      key: "${params.id}"
      reply-to: items-responses
```

#### route | `object`

A route for adapting `http` request-response streams to `kafka` topic streams.

### route.guarded

> `object` as named map of `string:string` `array`

Roles required by named guard

```yaml
routes:
  - guarded:
      test0:
        - read:items
```

### route.when

> `array` of `condition object`

List of conditions (any match) to match this route

```yaml
routes:
  - when:
      - method: GET
        path: "/items/{id};{correlationId}"
```

::: note condition object
A condition matches routes for adapting `http` request-response streams to `kafka` topic streams.
:::

#### when[].method | `string`

HTTP Method, such as `GET`, `HEAD`, `POST`, `PUT`, `DELETE`, `CONNECT`, `OPTIONS`, `TRACE`, `PATCH`

#### when[].path | `string`

Path with optional embedded parameter names, such as `/{topic}`

### route.exit\*

> `string`

Default exit binding when no conditional routes are viable

```yaml
routes:
  exit: kafka0
```


### route.with

> **oneOf**: [Fetch](#with-capability-fetch) | [Produce](#with-capability-produce)

Defines the route with the Fetch capability

```yaml
with:
  capability: fetch
```

Defines the route with the Produce capability

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
    - key: "${params.id}"
```

#### with.topic | `string`

Topic name, optionally referencing path parameter such as `${params.topic}`

#### with.filters | `array` of `filter object`

List of criteria (any match)

##### filter | `object`

Kafka filters for matched route when adapting `http` request-response streams to `kafka` topic fetch streams. All specified headers and key must match for the combined criteria to match.

##### filter.key | `string`

Message key, optionally referencing path parameter such as `${params.key}`

##### filter.headers | `object`

Message headers, with value optionally referencing path parameter such as `${params.headerX}`

#### with.merge | `object`

Merge multiple Kafka messages into a unified HTTP response. Kafka merge configuration for matched route when adapting `http` request-response streams to `kafka` topic streams where all messages are fetched and must be merged into a unified `http` response.

```yaml
merge:
  content-type: application/json
  patch:
    initial: "[]"
    path: /-
```

#### merge.content-type | `const "application/json"`

Content type of merged HTTP response.

#### merge.patch | `object`

Describes how to patch initial HTTP response to include one or more Kafka messages in unified HTTP response.

- patch (application/json)

  Kafka merge patch configuration for matched route when adapting `http` request-response streams to `kafka` topic streams where all messages are fetched and must be merged into a unified `http` response.

#### patch.initial | `string`

Initial JSON value.

#### patch.path | `const "/-"`

JSON Patch path to include each Kafka message in unified HTTP response.


### with.capability (produce)

> `object`

Kafka parameters for matched route when adapting `http` request-response streams to `kafka` topic pruduce streams.

```yaml
with:
  capability: produce
  topic: items-requests
  acks: leader_only
  key: "${params.id}"
  reply-to: items-responses
  async:
    location: "/items/${params.id};${correlationId}"
```

#### with.topic | `string`

Kafka topic name, optionally referencing path parameter such as `${params.topic}`

#### with.acks | `enum [ "none", "leader_only", "in_sync_replicas" ]`

Kafka acknowledgement mode\
Defaults to `in_sync_replicas`.

#### with.key | `string`

Kafka message key, optionally referencing path parameter such as `${params.id}`

#### with.overrides | `object`

Kafka message headers, with values optionally referencing path parameter.

#### with.reply-to | `string`

Kafka reply-to topic name.

#### with.async | `object`

HTTP response headers, with values optionally referencing path parameter or `${correlationId}`

---

::: right
\* required
:::
