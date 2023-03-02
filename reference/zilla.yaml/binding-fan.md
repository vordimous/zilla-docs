---
description: Zilla runtime fan binding
---

# binding (fan)

Defines a binding with `fan-in` and `fan-out`  support, with `server` behavior.

The `server` kind `fan` binding performs fan-in of data on all inbound network streams, grouping them into a single application stream. Then data received from the application stream is fanned-out to all network streams in the group.

When the `exit` is an `echo` server binding, the combination reflects all inbound data from each client to all clients.

## Example

```
"fan_server0":
{
    "type" : "fan",
    "kind": "server",
    "exit": "echo_server0"
}
```

## Configuration

Binding with support for `fan-in` and `fan-out`.

#### Properties

| Name (\* = required) | Type                | Description                                  |
| -------------------- | ------------------- | -------------------------------------------- |
| `type`\*             | `const "fan"`       | Support `fan-in` and `fan-out`.              |
| `kind`\*             | `enum [ "server" ]` | Behave as an `fan-in` and `fan-out` `server` |
| `exit`\*             | `string`            | Default exit binding                         |
