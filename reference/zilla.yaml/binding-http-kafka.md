---
description: Zilla runtime http-kafka binding
---

# binding (http-kafka)

Defines a binding with `http-kafka`  support, with `proxy` behavior.

The `proxy` kind `http-kafka` binding adapts `http` request-response streams to `kafka` topic streams.

#### Fetch capability

Routes with `fetch` capability map `http` `GET` requests to a `kafka` log-compacted topic, supporting filtered retrieval of messages with a specific key, or unfiltered retrieval of all messages with distinct keys in the topic merged into a unified response.

Filtering can be performed by `kafka` message key, message headers, or a combination of both message key and headers, extracting the parameter values from the inbound `http` request path.

Status `200` `http` responses include an `etag` header that can be used with `if-none-match` for subsequent conditional `GET` requests to check for updates. Rather than polling, `http` requests can also include the `prefer: wait=N` header to wait a maximum of `N` seconds before responding with `304` if not modified. When a new message arrives in the topic that would modify the response, then all `prefer: wait=N` clients receive the response immediately.

#### Produce capability

Routes with `produce` capability map any `http` request-response to a correlated pair of `kafka` messages. The `http` request message is sent to a `requests` topic, with a `zilla:correlation-id` header. When the request message received and processed by the `kafka` `requests` topic consumer, it produces a response message to the `responses` topic, with the same `zilla:correlation-id` header to correlate the response.

Requests including an `idempotency-key` `http` header can be replayed and safely receive the same response. This requires the `kafka` consumer to detect and ignore the duplicate request with the same `idempotency-key` and `zilla:correlation-id`.

Specifying `async` allows clients to include a `prefer: respond-async` header in the `http` request to receive `202 Accepted` response with `location` response header.

A corresponding `route` `condition` with matching `GET` method and `location` path is also required for follow up `GET` requests to return the same response as would have been returned if `prefer: respond-async` request header had been omitted.

## Example

```
"http_kafka_proxy0":
{
    "type" : "http-kafka",
    "kind": "proxy",
    "routes":
    [
        {
            "when":
            [
                {
                    "method": "GET",
                    "path": "/items"
                }
            ],
            "exit": "kafka_cache_client0",
            "with":
            {
                "capability": "fetch",
                "topic": "items-snapshots",
                "merge":
                {
                    "content-type": "application/json"
                }
            }
        },
        {
            "exit": "kafka_cache_client0",
            "when":
            [
                {
                    "method": "GET",
                    "path": "/items/{id}"
                }
            ],
            "with":
            {
                "capability": "fetch",
                "topic": "items-snapshots",
                "filters":
                [
                    {
                        "key": "${params.id}"
                    }
                ]
            }
        },
        {
            "when":
            [
                {
                    "path": "/items/{id}"
                },
                {
                    "method": "GET",
                    "path": "/items/{id};{correlationId}"
                },
            ],
            "exit": "kafka_cache_client0",
            "with":
            {
                "capability": "produce",
                "topic": "items-requests",
                "acks": "leader_only",
                "key": "${params.id}",
                "reply-to": "items-responses",
                 "async":
                {
                    "location": "/items/${params.id};${correlationId}"
                }
            }
        }
    ]
}
```

## Configuration

Binding with support for adapting `http` request-response streams to `kafka` topic streams.

#### Properties

| Name (\* = required)                       | Type                                              | Description                                                    |
| ------------------------------------------ | ------------------------------------------------- | -------------------------------------------------------------- |
| `type`\*                                   | `const "http-kafka"`                              | Adapt `http` request-response streams to `kafka` topic streams |
| `kind`\*                                   | `enum [ "proxy" ]`                                | Behave as an `http-kafka` `proxy`                              |
| [`options`](binding-http-kafka.md#options) | `object`                                          | `http-kafka`-specific options                                  |
| `routes`                                   | `array` of [`route`](binding-http-kafka.md#route) | Conditional `http-kafka`-specific routes                       |
| `exit`                                     | `string`                                          | Default exit binding when no conditional routes are viable     |

### options

Options for adapting `http` request-response streams to `kafka` topic streams.

#### Properties

| Name (\* = required)                               | Type     | Description                      |
| -------------------------------------------------- | -------- | -------------------------------- |
| [`idempotency`](binding-http-kafka.md#idempotency) | `object` | Idempotency key                  |
| [`correlation`](binding-http-kafka.md#correlation) | `object` | Correlate requests and responses |

### idempotency

HTTP request header used to specify the idempotency key when adapting `http` request-response streams to `kafka` topic streams.

#### Properties

| Name (\* = required) | Type     | Description                                                                                           |
| -------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `header`             | `string` | <p>HTTP request header name for idempotency key<br><br>Defaults to <code>"idempotency-key"</code></p> |

### correlation

Kafka request message headers injected when adapting `http` request-response streams to `kafka` topic streams.

#### Properties

| Name (\* = required)                       | Type     | Description         |
| ------------------------------------------ | -------- | ------------------- |
| [`headers`](binding-http-kafka.md#headers) | `object` | Correlation headers |

### headers

Kafka request message reply to and correlation id header names injected when adapting `http` request-response streams to `kafka` topic streams.

#### Properties

| Name (\* = required) | Type     | Description                                                                                                               |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `reply-to`           | `string` | <p>Kafka header name for reply-to topic.<br>Defaults to <code>"zilla:reply-to"</code>.</p>                                |
| `correlation-id`     | `string` | <p>Kafka header name for request-response correlation identifier.<br>Defaults to <code>"zilla:correlation-id"</code>.</p> |

### route

Routes for adapting `http` request-response streams to `kafka` topic streams.

#### Properties

| Name (\* = required) | Type                                                                                                                                                              | Description                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `guarded`            | `object` as named map of `string` `array`                                                                                                                         | Roles required by named guard                      |
| `when`               | `array` of [`condition`](binding-http-kafka.md#condition)``                                                                                                       | <p>List of conditions<br>(any match)</p>           |
| `exit`\*             | `string`                                                                                                                                                          | List of conditions (any match) to match this route |
| `with`               | <p><a href="binding-http-kafka.md#with-fetch"><code>with (fetch)</code></a> |<br><a href="binding-http-kafka.md#with-produce"><code>with (produce)</code></a></p> | Kafka parameters used when following this route    |

### condition

Conditions to match routes for adapting `http` request-response streams to `kafka` topic streams.

#### Properties

| Name (\* = required) | Type     | Description                                                     |
| -------------------- | -------- | --------------------------------------------------------------- |
| `method`             | `string` | Method, such as `GET`.                                          |
| `path`               | `string` | Path with optional embedded parameter names, such as `/{topic}` |

### with (fetch)

Kafka parameters for matched route when adapting `http` request-response streams to `kafka` topic fetch streams.

#### Properties

| Name (\* = required)                   | Type                                                | Description                                                                 |
| -------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------- |
| `capability`                           | `const "fetch"`                                     | Fetch capability                                                            |
| `topic`                                | `string`                                            | Topic name, optionally referencing path parameter such as `${params.topic}` |
| `filters`                              | `array` of [`filter`](binding-http-kafka.md#filter) | List of criteria (any match)                                                |
| [`merge`](binding-http-kafka.md#merge) | `object`                                            | Merge multiple Kafka messages into a unified HTTP response.                 |

### filter

Kafka filters for matched route when adapting `http` request-response streams to `kafka` topic fetch streams.

All specified headers and key must match for the combined criteria to match.

#### Properties

| Name (\* = required) | Type     | Description                                                                                   |
| -------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `key`                | `string` | Message key, optionally referencing path parameter such as `${params.key}`                    |
| `headers`            | `object` | Message headers, with value optionally referencing path parameter such as `${params.headerX}` |

### merge

Kafka merge configuration for matched route when adapting `http` request-response streams to `kafka` topic streams where all messages are fetched and must be merged into a unified `http` response.

#### Properties

| Name (\* = required)                                    | Type                       | Description                                                                                                  |
| ------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `content-type`                                          | `const "application/json"` | Content type of merged HTTP response.                                                                        |
| [`patch`](binding-http-kafka.md#patch-application-json) | `object`                   | Describes how to patch initial HTTP response to include one or more Kafka messages in unified HTTP response. |

### patch (application/json)

Kafka merge patch configuration for matched route when adapting `http` request-response streams to `kafka` topic streams where all messages are fetched and must be merged into a unified `http` response.

#### Properties

| Name (\* = required) | Type                                                     | Description                                                             |
| -------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------- |
| `initial`            | <p><code>string</code></p><p><code>const "[]"</code></p> | Initial JSON value.                                                     |
| `path`               | <p><code>string</code><br><code>const "/-"</code></p>    | JSON Patch path to include each Kafka message in unified HTTP response. |

### with (produce)

Kafka parameters from matched route when adapting `http` request-response streams to `kafka` topic produce streams.

#### Properties

| Name (\* = required) | Type                                                                                                                                                                  | Description                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `capability`         | `const "produce"`                                                                                                                                                     | Produce capability.                                                                            |
| `topic`              | `string`                                                                                                                                                              | Kafka topic name, optionally referencing path parameter such as `${params.topic}`              |
| `acks`               | <p><code>enum [</code><br>  <code>"none"</code> <code>,</code><br>  <code>"leader_only"</code> <code>,</code><br>  <code>"in_sync_replicas"</code> <code>]</code></p> | <p>Kafka acknowledgement mode<br><br>Defaults to <code>in_sync_replicas</code>.</p>            |
| `key`                | `string`                                                                                                                                                              | Kafka message key, optionally referencing path parameter such as `${params.id}`                |
| `overrides`          | `object`                                                                                                                                                              | Kafka message headers, with values optionally referencing path parameter.                      |
| `reply-to`           | `string`                                                                                                                                                              | Kafka reply-to topic name.                                                                     |
| `async`              | `object`                                                                                                                                                              | HTTP response headers, with values optionally referencing path parameter or `${correlationId}` |
