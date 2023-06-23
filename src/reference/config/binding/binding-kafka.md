---
shortTitle: kafka 
description: Zilla runtime kafka binding
category:
  - Binding
tag:
  - Server
---

# kafka Binding

Zilla runtime kafka binding.

```yaml {2,10,17}
kafka_cache_client:
  type: kafka
  kind: cache_client
  options:
    merged:
      - items-requests
      - items-responses
  exit: kafka_cache_server
kafka_cache_server:
  type: kafka
  kind: cache_server
  options:
    bootstrap:
      - items-responses
  exit: kafka_client0
kafka_client:
  type: kafka
  kind: client
  exit: tcp_client0
```

## Summary

Defines a binding with `kafka` protocol support, with `cache_client`, `cache_server` or `client` behavior.

### Cache behavior

The `cache_client` and `cache_server` kinds combine to provide a persistent cache of `kafka` messages per `topic` `partition` honoring the `kafka` `topic` configuration for message expiration and compaction. Messages ordering is guaranteed per `partition` and messages are merged into a unified stream for the `topic` spanning all `partitions`.

The `cache_server` kind supports proactive `fetch` of messages to keep the cache fresh in preparation for new consumers. This is enabled by configuring a list of `bootstrap` topics for the binding.

The `cache_client` kind supports filtering by `kafka` message key, headers or a combination of key and headers.

Message conflation occurs implicitly for `compacted` `kafka` topics, where a slower consumer that is not keeping up with the latest messages can safely skip over each older message that has effectively been replaced by a newer message with the same key.

When a new consumer arrives, the latest messages in the compacted topic are immediately delivered to that consumer, followed by any additional messages as they are produced to the `kafka` `topic`.

When the `kafka` `topic` is not compacted, then the binding can be configured to either replay historical messages first, or start with upcoming live messages instead.

The `cache_client` and `cache_server` also combine to provide a staging area when producing new messages as `kafka` requires exact message length up front when producing new messages and `kafka` does not support producing multiple messages in parallel over the same network connection.

### Client behavior

The `client` kind `kafka` binding receives inbound application streams and encodes each as a network stream via `kafka` request-response protocol. Note that the same network stream can be reused to encode multiple `kafka` requests, including both `fetch` and `produce` requests.

Conditional routes based on `kafka` `topic` names are used to route these network streams to an `exit` binding that ultimately reaches a `kafka` broker.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
- [options.bootstrap](#options-bootstrap)
- [options.topics](#options-topics)
  - [topics\[\].name\*](#topics-name)
  - [topics\[\].defaultOffset](#topics-defaultoffset)
- [options.sasl](#options-sasl)
  - [sasl.name](#sasl-name)
  - [sasl.mechanism\*](#sasl-mechanism)
  - [sasl.username](#sasl-username)
  - [sasl.password](#sasl-password)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].topic\*](#when-topic)
- [routes\[\].exit\*](#routes-exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "cache_client", "cache_server", "client" ]

Behave as a `kafka` `cache_client`, `cache_server` or `client`.

### options

> `object`

`kafka`-specific options.

```yaml
options:
  merged:
    - items-requests
    - items-responses
```

### options.bootstrap

> `array` of `string`

Topics to bootstrap in cache server even when no clients.

### options.topics

> `array` of `object`

Topic configuration.

#### topics[].name\*

> `string`

Topic name.

#### topics[].defaultOffset

> `enum` [ "live", "historical" ]

Fetch offset to use for new consumers\
Defaults to `"historical"`.

### options.sasl

> `object`

SASL credentials to use when connecting to `kafka` brokers.

#### sasl.name

> `string`

Mechanism name.

#### sasl.mechanism\*

> `enum` [ "plain", "scram-sha-1", "scram-sha-256", "scram-sha-512" ]

SASL mechanism\
Supports `plain` and `scram` mechanisms.

#### sasl.username

> `string`

SASL username.

#### sasl.password

> `string`

SASL password.

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: echo_server
```

### routes

> `array` of `object`

Conditional `kafka`-specific routes.

### routes[].guarded

> `object` as named map of `string:string` `array`

List of roles required by each named guard to authorize this route.

```yaml
routes:
  - guarded:
      test:
        - read:items
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.

#### when[].topic\*

> `string`

Topic name pattern.

### routes[].exit\*

> `string`

Next binding when following this route.

```yaml
exit: echo_server
```

---

::: right
\* required
:::
