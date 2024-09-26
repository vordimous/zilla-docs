### routes

> `array` of `object`

Conditional `sse-kafka` specific routes.

```yaml
routes:
  - when:
      - path: /items
    exit: kafka_cache_client
    with:
      topic: items-snapshots
      event:
        id: '["${base64(key)}","${etag}"]'
```

#### routes[].guarded

> `object` as map of named `array` of `string`

List of roles required by each named guard to authorize this route.

```yaml
routes:
  - guarded:
      my_guard:
        - read:items
```

#### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

```yaml
routes:
  - when:
      - path: /items
```

#### when[].path

> `string`

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

#### routes[].with

> `object`

Kafka parameters used when adapting `sse` data streams to `kafka` data streams.

#### with.topic\*

> `string`

Topic name, optionally referencing path parameter such as `${params.topic}`.

#### with.filters

> `array` of `object`

Kafka filters for matched route when adapting `sse` data streams to `kafka` data streams.

List of criteria (any match). All specified headers and key must match for the combined criteria to match.

#### filters[].key

> `string`

Message key, optionally referencing path parameter such as `${params.key}`.

#### filters[].headers

> `object` as map of named `string` properties

Message headers, with value optionally referencing path parameter such as `${params.headerX}`.

#### with.event

> `object`

Defines the SSE event syntax used when delivering Kafka messages to SSE clients.

#### event.id

> `enum` [ `${etag}`, `["${base64(key)}","${etag}"]` ] | Default: `${etag}`

Format of `id` field in `sse` `event`
