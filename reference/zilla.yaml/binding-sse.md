---
description: Zilla runtime sse binding
---

# binding (sse)

Defines a binding with `Server Sent Events (sse)` protocol support, with `server` behavior.

The `server` kind `sse` binding converts inbound `http` request-response streams into `sse` request-response streams, with optionally configured `retry` delay.

Messages received on the `sse` response stream are encoded using `Server Sent Events` protocol, including support for custom `event` types and last event `id`.

## Example

```
"sse_server0":
{
    "type" : "sse",
    "kind": "server",
    "exit": "sse_kafka_proxy0"
}
```

## Configuration

Binding with support for `sse` protocol.

#### Properties

| Name (\* = required)                | Type                                                                                | Description                                                |
| ----------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `type`\*                            | `const "sse"`                                                                       | Support `sse` protocol                                     |
| `kind`\*                            | <p><code>enum [</code><br>  <code>"client",</code><br>  <code>"server" ]</code></p> | Behave as a `sse` `client` or `server`                     |
| [`options`](binding-sse.md#options) | `object`                                                                            | `sse`-specific options                                     |
| `routes`                            | `array` of [`route`](binding-sse.md#route)                                          | Conditional `sse`-specific routes                          |
| `exit`                              | `string`                                                                            | Default exit binding when no conditional routes are viable |

### options

Options for `sse` protocol.

#### Properties

| Name (\* = required) | Type      | Description                                                  |
| -------------------- | --------- | ------------------------------------------------------------ |
| `retry`              | `integer` | <p>Retry delay (ms)<br><br>Defaults to <code>2000</code></p> |

### route

Routes for `sse` protocol.

#### Properties

| Name (\* = required) | Type                                                 | Description                                                        |
| -------------------- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| `guarded`            | `object` as named map of `string` `array`            | List of roles required by each named guard to authorize this route |
| `when`               | `array` of [`condition`](binding-sse.md#condition)`` | List of conditions (any match) to match this route                 |
| `exit`\*             | `string`                                             | Next binding when following this route                             |

### condition

Conditions to match routes for `sse` protocol.

#### Properties

| Name (\* = required) | Type     | Description  |
| -------------------- | -------- | ------------ |
| `path`\*             | `string` | Path pattern |
