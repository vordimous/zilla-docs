---
description: Zilla runtime tls binding
---

# binding (tls)

Defines a binding with `tls` protocol support, with `server`, `client` or `proxy` behavior.

#### Server behavior

The `server` kind tls binding decodes encrypted `TLS` protocol protocol on the inbound network stream, producing higher level cleartext application streams for each request.

Certificates and keys required to complete the `TLS` handshake are provided by a `vault` referenced in the binding configuration.

Conditional routes based on `tls` hostname authority or negotiated ALPN protocol are used to route these streams to an `exit` binding.

#### Client behavior

The `client` kind `tls` binding receives inbound application streams and encodes each as an encrypted network stream via `TLS` protocol.

Certificates and keys required to complete the `TLS` handshake are provided by a `vault` referenced in the binding configuration.

Conditional routes based on `tls` hostname authority or negotiated ALPN protocol are used to route these streams to an `exit` binding.

#### Proxy behavior

The `proxy` kind `tls` binding detects `ClientHello` `server_name` extension to provide TLS virtual hosting by routing based on server name.

A `vault` is not required to proxy `TLS` protocol as the handshake is only observed read-only as it routes through the `tls` `proxy` binding.

## Example

```
"tls_server0":
{
    "type" : "tls",
    "kind": "server",
    "vault": "server",
    "options":
    {
        "keys": [ "localhost" ],
        "sni": [ "localhost" ],
        "alpn": [ "echo" ]
    },
    "routes":
    [
        {
            "when":
            [
                {
                    "alpn": "echo"
                }
            ],
            "exit": "echo_server0"
        }
    ]
}
```

## Configuration

Binding with support for `tls` protocol.

#### Properties

| Name (\* = required)                | Type                                                                                                           | Description                                                |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `type`\*                            | `const "tls"`                                                                                                  | Support `tls` protocol                                     |
| `kind`\*                            | <p><code>enum [</code><br>  <code>"client",</code><br>  <code>"server",</code><br>  <code>"proxy" ]</code></p> | Behave as a `tls` `client`, `server` or `proxy`            |
| `vault`                             | `string`                                                                                                       | Vault name                                                 |
| [`options`](binding-tls.md#options) | `object`                                                                                                       | `tls`-specific options                                     |
| `routes`                            | `array` of [`route`](binding-tls.md#route)                                                                     | Conditional `tls`-specific routes                          |
| `exit`                              | `string`                                                                                                       | Default exit binding when no conditional routes are viable |

### options

Options for `tls` protocol.

#### Properties

| Name (\* = required) | Type                                                                                                                               | Description                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `version`            | `string`                                                                                                                           | Protocol version                                                  |
| `keys`               | `array` of `string`                                                                                                                | Vault key refs                                                    |
| `trust`              | `array` of `string`                                                                                                                | Vault certificate refs                                            |
| `signers`            | `array` of `string`                                                                                                                | Vault signer certificate refs                                     |
| `trustcacerts`       | `boolean`                                                                                                                          | Trust CA certificates                                             |
| `sni`\*              | `array` of `string`                                                                                                                | Server names                                                      |
| `alpn`               | `array` of `string`                                                                                                                | Application protocols                                             |
| `mutual`             | <p><code>enum [</code><br>  <code>"required",</code><br>  <code>"requested",</code><br>  <code>"none"</code><br><code>]</code></p> | <p>Mutual authentication<br><br>Defaults to <code>none</code></p> |

### route

Routes for `tls` protocol.

#### Properties

| Name (\* = required) | Type                                                 | Description                                                        |
| -------------------- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| `guarded`            | `object` as named map of `string` `array`            | List of roles required by each named guard to authorize this route |
| `when`               | `array` of [`condition`](binding-tls.md#condition)`` | List of conditions (any match) to match this route                 |
| `exit`\*             | `string`                                             | Next binding when following this route                             |

### condition

Conditions to match routes for `tls` protocol.

#### Properties

| Name        | Type     | Description          |
| ----------- | -------- | -------------------- |
| `authority` | `string` | Associated authority |
| `alpn`      | `string` | Application protocol |
