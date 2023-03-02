---
description: Zilla runtime amqp binding (incubator)
---

# binding (amqp) 🚧

Defines a binding with `amqp 1.0` protocol support, with `server` behavior.

The `server` kind `amqp` binding decodes `amqp 1.0` protocol on the inbound network stream, producing higher level application streams for each `send` or `receive` `link`.

Conditional routes based on the `link` `address` are used to route these application streams to an `exit` binding.

## Example

```
"amqp_server0":
{
    "type" : "amqp",
    "kind": "server",
    "routes":
    [
        {
            "when":
            [
                {
                    "address": "echo",
                    "capabilities": "send_and_receive"
                }
            ],
            "exit": "echo_server0"
        }
    ]
}
```

## Configuration

Binding with support for `amqp 1.0` protocol.

#### Properties

<table><thead><tr><th>Name (* = required)</th><th>Type</th><th>Description</th><th data-hidden data-type="checkbox">Required</th></tr></thead><tbody><tr><td><code>type</code>*</td><td><code>const "amqp"</code></td><td>Support <code>amqp 1.0</code> protocol</td><td>true</td></tr><tr><td><code>kind</code>*</td><td><code>enum [ "server" ]</code></td><td>Behave as an <code>amqp 1.0</code> <code>server</code></td><td>true</td></tr><tr><td><code>routes</code></td><td><code>array</code> of <a href="binding-amqp.md#route"><code>route</code></a></td><td>Conditional <code>amqp</code>-specific routes</td><td>false</td></tr><tr><td><code>exit</code></td><td><code>string</code></td><td>Default exit binding when no conditional routes are viable</td><td>false</td></tr></tbody></table>

### route

Routes for `amqp 1.0` protocol.

#### Properties

| Name (\* = required) | Type                                                  | Description                                                        |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| `guarded`            | `object` as named map of `string` `array`             | List of roles required by each named guard to authorize this route |
| `when`               | `array` of [`condition`](binding-amqp.md#condition)`` | List of conditions (any match) to match this route                 |
| `exit`\*             | `string`                                              | Next binding when following this route                             |

### condition

Conditions to match routes for `amqp 1.0` protocol.

#### Properties

| Name (\* = required) | Type                                                                                                                                  | Description                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `address`            | `string`                                                                                                                              | Link address                                                                   |
| `capabilities`       | <p><code>enum [</code> <br>  <code>"send_only",</code> <br>  <code>"receive_only",</code> <br>  <code>"send_and_receive" ]</code></p> | <p>Send or receive, or both.<br>Defaults to <code>send_and_receive</code>.</p> |
