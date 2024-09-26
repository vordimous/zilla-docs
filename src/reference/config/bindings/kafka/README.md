---
redirectFrom: /reference/config/bindings/binding-kafka.html
dir:
  collapsible: false
  link: true
shortTitle: kafka
category:
  - Binding
tag:
  - kafka
  - cache_client
  - cache_server
  - client
---

# kafka Binding

Defines a binding with `kafka` protocol support, with `cache_client`, `cache_server` or `client` behavior.

## Cache Behavior

The `cache_client` and `cache_server` kinds combine to provide a persistent cache of `kafka` messages per `topic` `partition` honoring the `kafka` `topic` configuration for message expiration and compaction. Messages ordering is guaranteed per `partition` and messages are merged into a unified stream for the `topic` spanning all `partitions`.

The `cache_server` kind supports proactive `fetch` of messages to keep the cache fresh in preparation for new consumers. This is enabled by configuring a list of `bootstrap` topics for the binding.

The `cache_client` kind supports filtering by `kafka` message key, headers or a combination of key and headers.

Message conflation occurs implicitly for `compacted` `kafka` topics, where a slower consumer that is not keeping up with the latest messages can safely skip over each older message that has effectively been replaced by a newer message with the same key.

When a new consumer arrives, the latest messages in the compacted topic are immediately delivered to that consumer, followed by any additional messages as they are produced to the `kafka` `topic`.

When the `kafka` `topic` is not compacted, then the binding can be configured to either replay historical messages first, or start with upcoming live messages instead.

The `cache_client` and `cache_server` also combine to provide a staging area when producing new messages as `kafka` requires exact message length up front when producing new messages and `kafka` does not support producing multiple messages in parallel over the same network connection.

## cache_client

> [Full config](./cache_client.md)

```yaml {3}
<!-- @include: ./.partials/cache_client.yaml -->
```

## cache_server

> [Full config](./cache_server.md)

```yaml {3}
<!-- @include: ./.partials/cache_server.yaml -->
```

## client

> [Full config](./client.md)

The `client` kind `kafka` binding receives inbound application streams and encodes each as a network stream via `kafka` request-response protocol. Note that the same network stream can be reused to encode multiple `kafka` requests, including both `fetch` and `produce` requests.

Conditional routes based on `kafka` `topic` names are used to route these network streams to an `exit` binding that ultimately reaches a `kafka` broker.

```yaml {3}
<!-- @include: ./.partials/client.yaml -->
```
