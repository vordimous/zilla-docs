### routes\*

> `array` of `object`

Conditional `http-kafka` specific routes.

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

#### routes[].guarded

> `object` as map of named `array` of `string`

Roles required by named guard.

```yaml
routes:
  - guarded:
      my_guard:
        - read:items
```

#### routes[].when

> `array` of `object`

List of conditions (any match) to match this route when adapting `http` request-response streams to `kafka` topic streams.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

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

> `string` | Pattern: `^/`

Path with optional embedded parameter names, such as `/{topic}`.

#### routes[].exit

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: kafka_cache_client
```

#### routes[].with\*

> `object`

Defines the route with the [Fetch](#with-capability-fetch) capability.

```yaml
with:
  capability: fetch
```

Defines the route with the [Produce](#with-capability-produce) capability.

```yaml
with:
  capability: produce
```

#### with.capability: fetch\*

> `const`

Kafka parameters for matched route when adapting `http` request-response streams to `kafka` topic fetch streams.

Routes with `fetch` capability map `http` `GET` requests to a `kafka` log-compacted topic, supporting filtered retrieval of messages with a specific key, or unfiltered retrieval of all messages with distinct keys in the topic merged into a unified response.

Filtering can be performed by `kafka` message key, message headers, or a combination of both message key and headers, extracting the parameter values from the inbound `http` request path.

Status `200` `http` responses include an `etag` header that can be used with `if-none-match` for subsequent conditional `GET` requests to check for updates. Rather than polling, `http` requests can also include the `prefer: wait=N` header to wait a maximum of `N` seconds before responding with `304` if not modified. When a new message arrives in the topic that would modify the response, then all `prefer: wait=N` clients receive the response immediately.

```yaml
with:
  capability: fetch
  topic: items-snapshots
  filters:
    - key: ${params.id}
  merge:
    content-type: application/json
    patch:
      initial: []
      path: /-
```

#### with.topic\*

> `string`

Topic name, optionally referencing path parameter such as `${params.topic}`.

#### with.filters

> `array` of `object`

List of criteria (any match) to this filter. Kafka filters for matched route when adapting `http` request-response streams to `kafka` topic fetch streams. All specified headers and key must match for the combined criteria to match.

#### filters[].key

> `string`

Message key, optionally referencing path parameter such as `${params.key}`.

#### filters[].headers

> `object` as map of named `string` properties

Message headers, with value optionally referencing path parameter such as `${params.headerX}`.

#### with.merge

> `object`

Merge multiple Kafka messages into a unified HTTP response. Kafka merge configuration for matched route when adapting `http` request-response streams to `kafka` topic streams where all messages are fetched and must be merged into a unified `http` response.

#### merge.content-type: application/json\*

> `const`

Content type of merged HTTP response.

#### merge.patch

> `object`

Describes how to patch initial HTTP response to include one or more Kafka messages in unified HTTP response.

- patch (application/json)

  Kafka merge patch configuration for matched route when adapting `http` request-response streams to `kafka` topic streams where all messages are fetched and must be merged into a unified `http` response.

#### patch.initial: []\*

> `const`

Initial JSON value.

#### patch.path: /-\*

> `const`

JSON Patch path to include each Kafka message in unified HTTP response.

#### with.capability: produce\*

> `const`

Kafka parameters for matched route when adapting `http` request-response streams to `kafka` topic produce streams.

Routes with `produce` capability map any `http` request-response to a correlated pair of `kafka` messages. The `http` request message is sent to a `requests` topic, with a `zilla:correlation-id` header. When the request message received and processed by the `kafka` `requests` topic consumer, it produces a response message to the `responses` topic, with the same `zilla:correlation-id` header to correlate the response.

Requests including an `idempotency-key` `http` header can be replayed and safely receive the same response. This requires the `kafka` consumer to detect and ignore the duplicate request with the same `idempotency-key` and `zilla:correlation-id`.

Specifying `async` allows clients to include a `prefer: respond-async` header in the `http` request to receive `202 Accepted` response with `location` response header.

A corresponding `routes[].when` object with matching `GET` method and `location` path is also required for follow up `GET` requests to return the same response as would have been returned if `prefer: respond-async` request header had been omitted.

```yaml
with:
  capability: produce
  topic: items-requests
  acks: leader_only
  key: ${params.id}
  reply-to: items-responses
  overrides:
    custom-text: custom-value
  async:
    location: /items/${params.id};cid=${correlationId}
```

<!-- markdownlint-disable MD024 -->
#### with.topic\*

> `string`

Kafka topic name, optionally referencing path parameter such as `${params.topic}`.
<!-- markdownlint-enable MD024 -->

#### with.acks

> `enum` [ `none`, `leader_only`, `in_sync_replicas` ] | Default: `in_sync_replicas`

Kafka acknowledgement mode

#### with.key

> `string`

Kafka message key, optionally referencing path parameter such as `${params.id}`.

#### with.overrides

> `object` as map of named `string` properties

Kafka message headers, with values optionally referencing path parameter.

#### with.reply-to

> `string`

Kafka reply-to topic name.

#### with.async

> `object` as map of named `string` properties

Allows an HTTP response to be retrieved asynchronously.

A `location: <path>` property can be used to define the path where an async result can be fetched, with the `<path>` value optionally referencing route path parameters or the `${correlationId}`.
