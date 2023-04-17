---
shortTitle: binding (echo)
description: Zilla runtime echo binding
category:
  - Binding
tag:
  - Server
---

# Echo binding

Zilla runtime **echo** binding.

::: code-tabs#yaml

@tab:active zilla.yaml

```yaml
echo_server0:
    type: echo
    kind: server
```

:::

- [`type`](#type) The type of binding beind defined
- [`kind`](#kind) How the binding will behave


## Summary

This binding supports the `echo` protocol and is run with the `server` behavior. It reads inbound messages and writes it back to the sender.

## Properties

### **type** \*

- `const "echo"`

Supports `echo` protocol

### **kind** \*

- `enum [ "server" ]`

Behaves as an `echo` `server`

\* = required
