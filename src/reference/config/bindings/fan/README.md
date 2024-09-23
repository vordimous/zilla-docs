---
redirectFrom: /reference/config/bindings/binding-fan.html
dir:
  collapsible: false
  link: true
shortTitle: fan
category:
  - Binding
tag:
  - fan
  - server
---

# fan Binding

Defines a binding with `fan-in` and `fan-out` support, with `server` behavior.

## server

> [Full config](./server.md)

Behave as an `fan-in` and `fan-out` `server`. The `server` kind `fan` binding performs fan-in of data on all inbound network streams, grouping them into a single application stream. Then data received from the application stream is fanned-out to all network streams in the group.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```
