---
description: Zilla runtime tcp binding
---

# binding (tcp)

Defines a binding with `tcp` protocol support, with `server` or `client` behavior.

The `server` kind `tcp` binding listens for inbound socket connections, producing higher level application streams for each remote `tcp` client.

The `client` kind `tcp` binding receives inbound application streams and initiates outbound `tcp` network connections to a remote `tcp` server address.

Conditional routes based on the hostname authority and network address mask are used to route these streams to an `exit` binding.

## Example

```
"tcp_server0":
{
    "type" : "tcp",
    "kind": "server",
    "options":
    {
        "host": "0.0.0.0",
        "port": 12345
    },
    "exit": "echo_server0"
}
```

## Configuration

Binding with support for `tcp` protocol.

#### Properties

| Name (\* = required)                | Type                                                                                | Description                                                                        |
| ----------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `type`\*                            | `const "tcp"`                                                                       | Support `tcp` protocol                                                             |
| `kind`\*                            | <p><code>enum [</code><br>  <code>"client",</code><br>  <code>"server" ]</code></p> | Behave as a `tcp` `client` or `server`                                             |
| [`options`](binding-tcp.md#options) | `object`                                                                            | `tcp`-specific options                                                             |
| `routes`                            | `array` of [`route`](binding-tcp.md#route)                                          | Conditional `tcp`-specific routes                                                  |
| `exit`                              | `string`                                                                            | Default exit binding when no conditional routes are viable, for kind `server` only |

### options

Options for `tcp` protocol.

#### Properties

| Name (\* = required) | Type                                                                                                                                                   | Description                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `host`               | `string`                                                                                                                                               | Hostname or IP address                        |
| `port`               | <p><code>integer</code> | <br><code>string</code> | <br><code>array</code> of <code>integer</code> | <br><code>array</code> of <code>string</code></p> | Port number(s), including port number ranges. |

### route

Routes for `tcp` protocol.

#### Properties

| Name (\* = required) | Type                                                 | Description                                                        |
| -------------------- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| `guarded`            | `object` as named map of `string` `array`            | List of roles required by each named guard to authorize this route |
| `when`               | `array` of [`condition`](binding-tcp.md#condition)`` | List of conditions (any match) to match this route                 |
| `exit`\*             | `string`                                             | Next binding when following this route, for kind `server` only     |

### condition

Conditions to match routes for `tcp` protocol.

#### Properties

| Name (\* = required) | Type     | Description          |
| -------------------- | -------- | -------------------- |
| `authority`          | `string` | Associated authority |
| `cidr`               | `string` | CIDR mask            |
