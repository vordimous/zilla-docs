---
description: Zilla runtime sse-kafka binding
---

# binding (sse-kafka)

Defines a binding with `sse-kafka`  support, with `proxy` behavior.

The `proxy` kind `sse-kafka` binding adapts `sse` data streams into `kafka` data streams, so that `kafka` messages can be delivered to `sse` clients.

Filtering can be performed by `kafka` message key, message headers, or a combination of both message key and headers, extracting the parameter values from the inbound `sse` path.

Progress across `kafka` topic partitions is conveyed to the `sse` client via event `id` and when the stream is implicitly paused during `sse` client reconnect, the `last-event-id` header in the `sse` reconnect request contains the last received event `id` value, allowing the `sse` stream to resume reliable message delivery automatically.

The event `id` can be configured to include the message `key` and `etag` of each message, avoiding the need to duplicate the key in the message body and making it suitable for integration with `http-kafka` binding's use of `etag` for conditional `if-match` operations.

When a `kafka` tombstone (`null` value) message is received by the `sse-kafka` binding, it delivers a `delete` event to the `sse` client. This informs the client which specific message has been deleted by observing the message key from the `sse` `delete` event `id`.

## Example

```
"sse_kafka_proxy0":
{
    "type" : "sse-kafka",
    "kind": "proxy",
    "routes":
    [
        {
            "when":
            [
                {
                    "path": "/items"
                }
            ],
            "exit": "kafka_cache_client0",
            "with":
            {
                "topic": "items-snapshots",
                "event":
                {
                    "id": "[\"${base64(key)}\",\"${etag}\"]"
                }
            }
        }
    ]
}
```

## Configuration

Binding with support for adapting `sse` data streams to `kafka` data streams.

#### Properties

| Name (\* = required) | Type                                             | Description                                                |
| -------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| `type`\*             | `const "sse-kafka"`                              | Adapt `sse` data streams to `kafka` data streams           |
| `kind`\*             | `enum [ "proxy" ]`                               | Behave as a `sse-kafka` `proxy`                            |
| `routes`             | `array` of [`route`](binding-sse-kafka.md#route) | Conditional `sse-kafka`-specific routes                    |
| `exit`               | `string`                                         | Default exit binding when no conditional routes are viable |

### route

Routes for adapting `sse` data streams to `kafka` data streams.

#### Properties

| Name (\* = required) | Type                                                       | Description                                                        |
| -------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ |
| `guarded`            | `object` as named map of `string` `array`                  | List of roles required by each named guard to authorize this route |
| `when`               | `array` of [`condition`](binding-sse-kafka.md#condition)`` | List of conditions (any match) to match this route                 |
| `exit`\*             | `string`                                                   | Next binding when following this route                             |
| `with`               | [`with`](binding-sse-kafka.md#with)                        | Kafka parameters used when following this route                    |

### condition

Conditions to match routes for adapting `sse` data streams to `kafka` data streams.

#### Properties

| Name (\* = required) | Type     | Description                                                     |
| -------------------- | -------- | --------------------------------------------------------------- |
| `path`\*             | `string` | Path with optional embedded parameter names, such as `/{topic}` |

### with

Kafka parameters for matched route when adapting `sse` data streams to `kafka` data streams.

#### Properties

| Name (\* = required)                      | Type                                               | Description                                                                 |
| ----------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------- |
| `topic`\*                                 | `string`                                           | Topic name, optionally referencing path parameter such as `${params.topic}` |
| `filters`                                 | `array` of [`filter`](binding-sse-kafka.md#filter) | List of criteria (any match)                                                |
| ``[`event`](binding-sse-kafka.md#event)`` | `object`                                           | Defines the syntax of the `event` `id`                                      |

### filter

Kafka filters for matched route when adapting `sse` data streams to `kafka` data streams.

All specified headers and key must match for the combined criteria to match.

#### Properties

| Name (\* = required) | Type     | Description                                                                                   |
| -------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `key`                | `string` | Message key, optionally referencing path parameter such as `${params.key}`                    |
| `headers`            | `object` | Message headers, with value optionally referencing path parameter such as `${params.headerX}` |

### event

SSE event syntax used when delivering Kafka messages to SSE clients.

#### Properties

| Name (\* = required) | Type                                                                                                                           | Description                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `id`\*               | <p><code>enum [</code><br>  <code>"${etag}",</code><br>  <code>"[\"${base64(key)}\",\"${etag}\"]"</code><br><code>]</code></p> | <p>Format of <code>id</code> field in <code>sse</code> <code>event</code><br><br>Defaults to <code>"${etag}"</code></p> |

