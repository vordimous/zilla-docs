---
shortTitle: sse-kafka
description: Zilla runtime sse-kafka binding
category:
  - Binding
tag:
  - Proxy
---

# sse-kafka Binding

Zilla runtime sse-kafka binding.

```yaml {2}
sse_kafka_proxy:
  type: sse-kafka
  kind: proxy
  routes:
    - when:
        - path: /items
      exit: kafka_cache_client
      with:
        topic: items-snapshots
        event:
          id: '["${base64(key)}","${etag}"]'
```

## Summary

Defines a binding with `sse-kafka` support, with `proxy` behavior.

The `proxy` kind `sse-kafka` binding adapts `sse` data streams into `kafka` data streams, so that `kafka` messages can be delivered to `sse` clients.

Filtering can be performed by `kafka` message key, message headers, or a combination of both message key and headers, extracting the parameter values from the inbound `sse` path.

Progress across `kafka` topic partitions is conveyed to the `sse` client via event `id` and when the stream is implicitly paused during `sse` client reconnect, the `last-event-id` header in the `sse` reconnect request contains the last received event `id` value, allowing the `sse` stream to resume reliable message delivery automatically.

The event `id` can be configured to include the message `key` and `etag` of each message, avoiding the need to duplicate the key in the message body and making it suitable for integration with `http-kafka` binding's use of `etag` for conditional `if-match` operations.

When a `kafka` tombstone (`null` value) message is received by the `sse-kafka` binding, it delivers a `delete` event to the `sse` client. This informs the client which specific message has been deleted by observing the message key from the `sse` `delete` event `id`.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].path\*](#when-path)
- [routes\[\].exit\*](#routes-exit)
- [routes\[\].with](#routes-with)
  - [with.topic\*](#with-topic)
  - [with.filters](#with-filters)
    - [filters\[\].key](#filters-key)
    - [filters\[\].headers](#filters-headers)
  - [with.event](#with-event)
    - [event.id\*](#event-id)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "proxy" ]

Behave as a `sse-kafka` `proxy`.

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: kafka_cache_client
```

### routes

> `array` of `object`

Conditional `sse-kafka`-specific routes for adapting `sse` data streams to `kafka` data streams.

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

### routes[].guarded

> `object` as named map of `string:string` `array`

List of roles required by each named guard to authorize this route.

```yaml
routes:
  - guarded:
      my_guard:
        - read:items
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.
Read more: [When a route matches](../../../concepts/config-intro.md#when-a-route-matches)

```yaml
routes:
  - when:
      - path: /items
```

#### when[].path\*

> `string`

Path with optional embedded parameter names, such as `/{topic}`.

### routes[].exit\*

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: kafka_cache_client
```

### routes[].with

> `object`

Kafka parameters used when adapting `sse` data streams to `kafka` data streams.

#### with.topic\*

> `string`

Topic name, optionally referencing path parameter such as `${params.topic}`.

#### with.filters

> `array` of `object`

List of criteria (any match)Kafka filters for matched route when adapting `sse` data streams to `kafka` data streams.

All specified headers and key must match for the combined criteria to match.

##### filters[].key

> `string`

Message key, optionally referencing path parameter such as `${params.key}`.

##### filters[].headers

> `map` of `name: value` properties

Message headers, with value optionally referencing path parameter such as `${params.headerX}`.

#### with.event

> `object`

Defines the SSE event syntax used when delivering Kafka messages to SSE clients.

##### event.id\*

> `enum` [ `"${etag}"`, `"["${base64(key)}","${etag}"]"` ] | Default: `"${etag}"`

Format of `id` field in `sse` `event`

---

::: right
\* required
:::
