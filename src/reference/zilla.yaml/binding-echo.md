---
shortTitle: binding (echo)
description: Zilla runtime echo binding
category:
  - Binding
tag:
  - Server
---

# echo binding

Zilla runtime echo binding.

```yaml {2}
echo_server0:
    type: echo
    kind: server
```

- [`kind`](#kind) How the binding will behave


## Summary

This binding supports the `echo` protocol and is run with the `server` behavior. It reads inbound messages and writes it back to the sender.

## Configuration


### kind\*

> enum [ "server" ]

Behaves as an `echo` `server`


```yaml
kind: server
```

---

\* = required
