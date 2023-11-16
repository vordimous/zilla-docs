---
shortTitle: fan
description: Zilla runtime fan binding
category:
  - Binding
tag:
  - Server
---

# fan Binding

Zilla runtime fan binding.

```yaml {2}
fan_server:
  type: fan
  kind: server
  exit: echo_server
```

## Summary

Defines a binding with `fan-in` and `fan-out` support, with `server` behavior.

The `server` kind `fan` binding performs fan-in of data on all inbound network streams, grouping them into a single application stream. Then data received from the application stream is fanned-out to all network streams in the group.

When the `exit` is an `echo` server binding, the combination reflects all inbound data from each client to all clients.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [exit\*](#exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "server" ]

Behave as an `fan-in` and `fan-out` `server`.

### exit\*

> `string`

Default exit binding.

```yaml
exit: echo_server
```

---

::: right
\* required
:::
