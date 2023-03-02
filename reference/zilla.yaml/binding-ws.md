---
description: Zilla runtime ws binding
---

# binding (ws)

Defines a binding with `WebSockets` protocol support, with `server` or `client` behavior.

#### Server behavior

The `server` kind `ws` binding converts inbound `http` request-response streams into `ws` full-duplex streams.

Conditional routes based on `ws` scheme, authority, path or negotiated subprotocol are used to route these streams to an `exit` binding.

#### Client behavior

The `client` kind `ws` binding converts inbound `ws` full duplex streams into `http` request-response streams.

Conditional routes based on `ws` scheme, authority, path or negotiated subprotocol are used to route these streams to an `exit` binding.

## Example

```
"ws_server0":
{
    "type" : "ws",
    "kind": "server",
    "routes":
    [
        {
            "when":
            [
                {
                    "protocol": "echo"
                }
            ],
            "exit": "echo_server0"
        }
    ]
}
```

## Configuration

Binding with support for `ws` protocol.

#### Properties

| Name (\* = required)               | Type                                                                                | Description                                                |
| ---------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `type`\*                           | `const "ws"`                                                                        | Support `ws` protocol                                      |
| `kind`\*                           | <p><code>enum [</code><br>  <code>"client",</code><br>  <code>"server" ]</code></p> | Behave as a `ws` `client` or `server`                      |
| [`options`](binding-ws.md#options) | `object`                                                                            | `ws`-specific options                                      |
| `routes`                           | `array` of [`route`](binding-ws.md#route)                                           | Conditional `ws`-specific routes                           |
| `exit`                             | `string`                                                                            | Default exit binding when no conditional routes are viable |

### options

Options for `ws` protocol.

#### Properties

| Name (\* = required)                 | Type     | Description |
| ------------------------------------ | -------- | ----------- |
| [`defaults`](binding-ws.md#defaults) | `object` | Defaults    |

### defaults

Defaults option for `ws` protocol.

#### Properties

| Name (\* = required) | Type     | Description |
| -------------------- | -------- | ----------- |
| `protocol`           | `string` | Subprotocol |
| `scheme`             | `string` | Scheme      |
| `authority`          | `string` | Authority   |
| `path`               | `string` | Path        |

### route

Routes for `ws` protocol.

#### Properties

| Name (\* = required) | Type                                              | Description                                                        |
| -------------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| `guarded`            | `object` as named map of `string` `array`         | List of roles required by each named guard to authorize this route |
| `when`               | `array` of [`condition`](binding-ws.md#condition) | List of conditions (any match) to match this route                 |
| `exit`\*             | `string`                                          | Next binding when following this route                             |

### condition

Conditions to match routes for `ws` protocol.

#### Properties

| Name (\* = required) | Type     | Description         |
| -------------------- | -------- | ------------------- |
| `protocol`           | `string` | Subprotocol pattern |
| `scheme`             | `string` | Scheme pattern      |
| `authority`          | `string` | Authority pattern   |
| `path`               | `string` | Path pattern        |
