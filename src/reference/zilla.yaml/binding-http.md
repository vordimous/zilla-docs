---
description: Zilla runtime http binding
---

# binding (http)

Defines a binding with `http` protocol support, with `server` or `client` behavior.

#### Server behavior

The `server` kind `http` binding decodes `HTTP/1.1` protocol or `HTTP/2` protocol on the inbound network stream, producing higher level application streams for each request.

Cross-Origin Resource Sharing (CORS) is supported by specifying an access control policy of `cross-origin`. Further configuration allows for finer-grained access control including specific request origins, methods and headers allowed, and specific response headers exposed.

Authorization is enforced by a [`guard`](guard.md) and the credentials can be extracted from a cookie, header or query parameter.

Conditional routes based on `http` request headers are used to route these application streams to an `exit` binding.

#### Client behavior

The `client` kind `http` binding receives inbound application streams and encodes each request as a network stream via `HTTP/1.1` protocol. Note that the same network stream can be reused to encode multiple `HTTP/1.1` requests.

Conditional routes based on `http` request headers are used to route these network streams to an `exit` binding.

## Example

```
"http_server0":
{
    "type" : "http",
    "kind": "server",
    "options":
    {
        "access-control":
        {
            "policy": "cross-origin"
        },
        "authorization":
        {
            "jwt0":
            {
                "credentials":
                {
                    "headers":
                    {
                        "authorization": "Bearer {credentials}"
                    }
                }
            }
        }
    },
    "routes":
    [
        {
            "when":
            [
                {
                    "headers":
                    {
                        ":scheme": "https",
                        ":authority": "example.com:443"
                    }
                }
            ],
            "exit": "echo_server0"
        }
    ]
}
```

## Configuration

Binding with support for `http` protocol.

#### Properties

| Name (\* = required)                 | Type                                                                                      | Description                                                |
| ------------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `type`\*                             | `const "http"`                                                                            | Support `http` protocol                                    |
| `kind`\*                             | <p><code>enum [</code></p><p>  <code>"server",</code></p><p>  <code>"client" ]</code></p> | Behave as an `http` `server` or `client`                   |
| [`options`](binding-http.md#options) | `object`                                                                                  | `http`-specifc options                                     |
| `routes`                             | `array` of [`route`](binding-http.md#route)                                               | Conditional `http`-specific routes                         |
| `exit`                               | `string`                                                                                  | Default exit binding when no conditional routes are viable |

### options

Options for `HTTP` protocol.

#### Properties

| Name (\* = required)                               | Type                                                                                                    | Description                 |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------- |
| `versions`                                         | <p><code>array</code> of <code>enum [</code><br>  <code>"http/1.1",</code><br>  <code>"h2" ]</code></p> | Supported protocol versions |
| [`access-control`](binding-http.md#access-control) | `object`                                                                                                | Access control policy       |
| `authorization`                                    | `object` as map of named [`authorization`](binding-http.md#authorization) properties                    | Authorization by guard      |
| `overrides`                                        | `object` of name-value header overrides                                                                 | Request header overrides    |

### access-control

Access control for `HTTP` protocol.

#### Properties

| Name (\* = required) | Type                                                                                                                                                                                                          | Description                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `policy`\*           | <p><code>enum [</code><br><code></code>  <code>"same-origin"</code> <code>,</code><br><code></code>  <a href="binding-http.md#access-control-cross-origin"><code>"cross-origin"</code></a> <code>]</code></p> | Supported access control policies |

### access-control (cross-origin)

Cross Origin Resource Sharing (CORS) access control for `HTTP` protocol.

#### Properties

| Name (\* = required)                   | Type                   | Description                                                                                                                                              |
| -------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `policy`\*                             | `const "cross-origin"` | Support cross-origin access control policy                                                                                                               |
| ``[`allow`](binding-http.md#allow)``   | `object`               | <p>Allowed cross-origin request origins, methods, headers and credentials.<br><br>Defaults to all origins, methods and headers, without credentials.</p> |
| `max-age`                              | `number`               | Maximum cache age (in seconds) for allowed headers and methods.                                                                                          |
| ``[`expose`](binding-http.md#expose)`` | `object`               | <p>Exposed cross-origin response headers.<br><br>Defaults to all response headers.</p>                                                                   |

### allow

CORS allowed request origins, methods, headers and credentials for `HTTP` protocol.

#### Properties

| Name (\* = required) | Type              | Description                                 |
| -------------------- | ----------------- | ------------------------------------------- |
| `origins`            | `array of string` | Allowed request origins.                    |
| `methods`            | `array of string` | Allowed request methods.                    |
| `headers`            | `array of string` | Allowed request headers                     |
| `credentials`        | `boolean`         | Support `fetch` credentials mode `include`. |

### expose

CORS exposed response headers for `HTTP` protocol.

#### Properties

| Name (\* = required) | Type              | Description              |
| -------------------- | ----------------- | ------------------------ |
| `headers`            | `array of string` | Exposed response headers |

### authorization

Authorization for `HTTP/1.1` and `HTTP/2` protocols.

#### Properties

| Name (\* = required)                         | Type     | Description                                               |
| -------------------------------------------- | -------- | --------------------------------------------------------- |
| [`credentials`](binding-http.md#credentials) | `object` | Defines how to extract credentials from the HTTP request. |

### credentials

Credentials for `HTTP` protocol.

#### Properties

| Name (\* = required) | Type                        | Description                                                                      |
| -------------------- | --------------------------- | -------------------------------------------------------------------------------- |
| `cookies`            | `object` as map of `string` | Named cookie value pattern with `{credentials}`                                  |
| `headers`            | `object` as map of `string` | Named header value pattern with `{credentials}`, e.g. `"Bearer` `{credentials}"` |
| `query`              | `object` as map of `string` | Named query parameter value pattern with `{credentials}`                         |

### route

Routes for `HTTP` protocol.

#### Properties

| Name (\* = required) | Type                                                  | Description                                                        |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| `guarded`            | `object` as named map of `string` `array`             | List of roles required by each named guard to authorize this route |
| `when`               | `array` of [`condition`](binding-http.md#condition)`` | List of conditions (any match) to match this route                 |
| `exit`\*             | `string`                                              | Next binding when following this route                             |

### condition

Conditions to match routes for `HTTP` protocol.

#### Properties

| Name (\* = required) | Type                           | Description                                   |
| -------------------- | ------------------------------ | --------------------------------------------- |
| `headers`            | `object` of name-value headers | <p>Header name value pairs<br>(all match)</p> |
