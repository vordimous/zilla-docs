---
description: Zilla runtime http-filesystem binding
---

# binding (http-filesystem)

Defines a binding with `http-filesystem`  support, with `proxy` behavior.

The `proxy` kind `http-filesystem` binding adapts `http` data streams into `filesystem` data streams by mapping the path from an inbound `http` `GET` request into a filesystem relative path.

Behaves as a web server when combined with `tcp,` `tls`, `http` and `filesystem` bindings.

## Example

```
"http_filesystem_proxy0":
{
    "type" : "http-filesystem",
    "kind": "proxy",
    "routes":
    [
        {
            "when":
            [
                {
                    "path": "/{path}"
                }
            ],
            "exit": "filesystem_server0",
            "with":
            {
                "path": "${params.path}"
            }
        }
    ]
}
```

## Configuration

Binding with support for adapting `http` data streams into `filesystem` data streams.

#### Properties

| Name (\* = required) | Type                                                     | Description                                                |
| -------------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| `type`\*             | `const "http-filesystem"`                                | Adapt `http` data streams into `filesystem` data streams   |
| `kind`\*             | `enum [ "proxy" ]`                                       | Behave as an `http-filesystem` `proxy`                     |
| `routes`             | `array` of [`route`](binding-http-filesystem.md#route)`` | Conditional `http-kafka`-specific routes                   |
| `exit`               | `string`                                                 | Default exit binding when no conditional routes are viable |

### route

Routes for adapting `http` data streams into `filesystem` data streams.

#### Properties

| Name (\* = required) | Type                                                           | Description                                                        |
| -------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------ |
| `guarded`            | `object` as named map of `string` `array`                      | List of roles required by each named guard to authorize this route |
| `when`               | `array` of [`condition`](binding-http-filesystem.md#condition) | List of conditions (any match) to match this route                 |
| `exit`\*             | `string`                                                       | Next binding when following this route                             |
| `with`               | [`with`](binding-http-filesystem.md#with)                      | Filesystem parameters used when following this route               |

### condition

HTTP conditions to match routes when adapting `http` data streams into `filesystem` data streams.

#### Properties

| Name (\* = required) | Type     | Description                                                    |
| -------------------- | -------- | -------------------------------------------------------------- |
| `path`\*             | `string` | Path with optional embedded parameter names, such as `/{path}` |

### with

Filesystem parameters from matched route when adapting `http` data streams into `filesystem` data streams.

#### Properties

| Name (\* = required) | Type     | Description                                                                |
| -------------------- | -------- | -------------------------------------------------------------------------- |
| `path`\*             | `string` | Topic name, optionally referencing path parameter such as `${params.path}` |
