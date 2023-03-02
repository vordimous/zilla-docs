---
description: Zilla runtime kafka binding
---

# binding (kafka)

Defines a binding with `kafka` protocol support, with `cache_client`, `cache_server` or `client` behavior.

#### Cache behavior

The `cache_client` and `cache_server` kinds combine to provide a persistent cache of `kafka` messages per `topic` `partition` honoring the `kafka` `topic` configuration for message expiration and compaction. Messages ordering is guaranteed per `partition` and messages are merged into a unified stream for the `topic` spanning all `partitions`.

The `cache_server` kind supports proactive `fetch` of messages to keep the cache fresh in preparation for new consumers. This is enabled by configuring a list of `bootstrap` topics for the binding.

The `cache_client` kind supports filtering by `kafka` message key, headers or a combination of key and headers.

Message conflation occurs implicitly for `compacted` `kafka` topics, where a slower consumer that is not keeping up with the latest messages can safely skip over each older message that has effectively been replaced by a newer message with the same key.

When a new consumer arrives, the latest messages in the compacted topic are immediately delivered to that consumer, followed by any additional messages as they are produced to the `kafka` `topic`.

When the `kafka` `topic` is not compacted, then the binding can be configured to either replay historical messages first, or start with upcoming live messages instead.

The `cache_client` and `cache_server` also combine to provide a staging area when producing new messages as `kafka` requires exact message length up front when producing new messages and `kafka` does not support producing multiple messages in parallel over the same network connection.

#### Client behavior

The `client` kind `kafka` binding receives inbound application streams and encodes each as a network stream via `kafka` request-response protocol. Note that the same network stream can be reused to encode multiple `kafka` requests, including both `fetch` and `produce` requests.

Conditional routes based on `kafka` `topic` names are used to route these network streams to an `exit` binding that ultimately reaches a `kafka` broker.

## Example

```
"kafka_cache_client0":
{
    "type" : "kafka",
    "kind": "cache_client",
    "options":
    {
        "merged":
        [
            "items-requests",
            "items-responses"
        ]
    },
    "exit": "kafka_cache_server0"
},

"kafka_cache_server0":
{
    "type" : "kafka",
    "kind": "cache_server",
    "options":
    {
        "bootstrap":
        [
            "items-responses"
        ]
    },
    "exit": "kafka_client0"
},

"kafka_client0":
{
    "type" : "kafka",
    "kind": "client",
    "exit": "tcp_client0"
}
```

## Configuration

Binding with support for `kafka` protocol.

#### Properties

| Name (\* = required)                  | Type                                                                                                                        | Description                                                    |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `type`\*                              | `const "kafka"`                                                                                                             | Support `kafka` protocol                                       |
| `kind`\*                              | <p><code>enum [</code><br>  <code>"cache_client",</code><br>  <code>"cache_server",</code><br>  <code>"client" ]</code></p> | Behave as a `kafka` `cache_client`, `cache_server` or `client` |
| [`options`](binding-kafka.md#options) | `object`                                                                                                                    | `kafka`-specific options                                       |
| `routes`                              | `array` of [`route`](binding-kafka.md#route)                                                                                | Conditional `kafka`-specific routes                            |
| `exit`                                | `string`                                                                                                                    | Default exit binding when no conditional routes are viable     |

### options

Options for `kafka` protocol.

#### Properties

| Name (\* = required)            | Type                                         | Description                                              |
| ------------------------------- | -------------------------------------------- | -------------------------------------------------------- |
| `bootstrap`                     | `array` of `string`                          | Topics to bootstrap in cache server even when no clients |
| `topics`                        | `array` of [`topic`](binding-kafka.md#topic) | Topic configuration                                      |
| [`sasl`](binding-kafka.md#sasl) | `object`                                     | SASL credentials                                         |

### topic

Topic-specific configuration when supporting `kafka` protocol.

#### Properties

| Name (\* = required) | Type                                                                                  | Description                                                                               |
| -------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `name`\*             | `string`                                                                              | Topic name                                                                                |
| `defaultOffset`      | <p><code>enum [</code><br>  <code>"live",</code><br>  <code>"historical" ]</code></p> | <p>Fetch offset to use for new consumers<br><br>Defaults to <code>"historical"</code></p> |

### sasl

SASL credentials to use when connecting to `kafka` brokers.

#### Properties

| Name (\* = required) | Type                                                                                                                                                          | Description                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `name`               | `string`                                                                                                                                                      | Mechanism name                                                                             |
| `mechanism`\*        | <p><code>enum [</code><br>  <code>"plain",</code><br>  <code>"scram-sha-1",</code><br>  <code>"scram-sha-256",</code><br>  <code>"scram-sha-512" ]</code></p> | <p>SASL mechanism<br><br>Supports <code>plain</code> and <code>scram</code> mechanisms</p> |
| `username`           | `string`                                                                                                                                                      | SASL username                                                                              |
| `password`           | `string`                                                                                                                                                      | SASL password                                                                              |

### route

Routes for `kafka` protocol.

#### Properties

| Name (\* = required) | Type                                                   | Description                                                        |
| -------------------- | ------------------------------------------------------ | ------------------------------------------------------------------ |
| `guarded`            | `object` as named map of `string` `array`              | List of roles required by each named guard to authorize this route |
| `when`               | `array` of [`condition`](binding-kafka.md#condition)`` | List of conditions (any match) to match this route                 |
| `exit`\*             | `string`                                               | Next binding when following this route                             |

### condition

Conditions to match routes for `kafka` protocol.

#### Properties

| Name (\* = required) | Type     | Description        |
| -------------------- | -------- | ------------------ |
| `topic`\*            | `string` | Topic name pattern |
