---
description: Zilla runtime mqtt binding (incubator)
---

# binding (mqtt) 🚧

Defines a binding with `mqtt 5.0` protocol support, with `server` behavior.

The `server` kind `mqtt` binding decodes `mqtt 5.0` protocol on the inbound network stream, producing higher level application streams for each `publish` or `subscribe` `topic`.

Conditional routes based on the `topic` `name` are used to route these application streams to an `exit` binding.

## Example

```
"mqtt_server0":
{
    "type" : "mqtt",
    "kind": "server",
    "routes":
    [
        {
            "when":
            [
                {
                    "topic": "echo",
                    "capabilities": "publish_and_subscribe"
                }
            ],
            "exit": "echo_server0"
        }   
    ]
}
```

## Configuration

Binding with support for `mqtt 5.0` protocol.

#### Properties

| Name (\* = required) | Type                                        | Description                                                |
| -------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| `type`\*             | `const "mqtt"`                              | Support `mqtt 5.0` protocol                                |
| `kind`\*             | `enum [ "server" ]`                         | Behave as a `mqtt` `server`                                |
| `routes`             | `array` of [`route`](binding-mqtt.md#route) | Conditional `mqtt`-specific routes                         |
| `exit`               | `string`                                    | Default exit binding when no conditional routes are viable |

### route

Routes for `mqtt 5.0` protocol.

#### Properties

| Name (\* = required) | Type                                                  | Description                                                        |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| `guarded`            | `object` as named map of `string` `array`             | List of roles required by each named guard to authorize this route |
| `when`               | `array` of [`condition`](binding-mqtt.md#condition)`` | List of conditions (any match) to match this route                 |
| `exit`\*             | `string`                                              | Next binding when following this route                             |

### condition

Conditions to match routes for `mqtt 5.0` protocol.

#### Properties

| Name (\* = required) | Type                                                                                                                                            | Description                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `topic`\*            | `string`                                                                                                                                        | Topic name                                                                               |
| `capabilities`       | <p><code>enum [</code> <br>  <code>"publish_only",</code> <br>  <code>"subscribe_only",</code> <br>  <code>"publish_and_subscribe" ]</code></p> | <p>Publish or subscribe, or both.<br>Defaults to <code>publish_and_subscribe</code>.</p> |
