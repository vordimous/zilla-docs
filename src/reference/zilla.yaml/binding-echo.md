---
description: Zilla runtime echo binding
---

# binding (echo)

Defines a binding with `echo` protocol support, with `server` behavior.

The `server` kind `echo` binding reads inbound writes it back to the sender.

## Example

```
"echo_server0":
{
    "type" : "echo",
    "kind": "server"
}
```

## Configuration

Binding with support for `echo` protocol.

#### Properties

| Name (\* = required) | Type                | Description                  |
| -------------------- | ------------------- | ---------------------------- |
| `type`\*             | `const "echo"`      | Support `echo` protocol      |
| `kind`\*             | `enum [ "server" ]` | Behave as an `echo` `server` |

