---
redirectFrom: /reference/config/bindings/binding-sse-kafka.html
dir:
  collapsible: false
  link: true
shortTitle: sse-kafka
category:
  - Binding
tag:
  - sse-kafka
  - proxy
---

# sse-kafka Binding

Defines a binding with `sse-kafka` support, with `proxy` behavior.

## proxy

> [Full config](./proxy.md)

The `proxy` kind `sse-kafka` binding adapts `sse` data streams into `kafka` data streams, so that `kafka` messages can be delivered to `sse` clients.

Filtering can be performed by `kafka` message key, message headers, or a combination of both message key and headers, extracting the parameter values from the inbound `sse` path.

Progress across `kafka` topic partitions is conveyed to the `sse` client via event `id` and when the stream is implicitly paused during `sse` client reconnect, the `last-event-id` header in the `sse` reconnect request contains the last received event `id` value, allowing the `sse` stream to resume reliable message delivery automatically.

The event `id` can be configured to include the message `key` and `etag` of each message, avoiding the need to duplicate the key in the message body and making it suitable for integration with `http-kafka` binding's use of `etag` for conditional `if-match` operations.

When a `kafka` tombstone (`null` value) message is received by the `sse-kafka` binding, it delivers a `delete` event to the `sse` client. This informs the client which specific message has been deleted by observing the message key from the `sse` `delete` event `id`.

```yaml {3}
<!-- @include: ./.partials/proxy.yaml -->
```
