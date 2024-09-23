---
redirectFrom: /reference/config/bindings/binding-echo.html
dir:
  collapsible: false
  link: true
shortTitle: echo
category:
  - Binding
tag:
  - echo
  - server
---

# echo Binding

This binding supports the `echo` protocol and is run with the `server` behavior. It reads inbound messages and writes it back to the sender.

## server

> [Full config](./server.md)

Behaves as an `echo` `server`.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```
