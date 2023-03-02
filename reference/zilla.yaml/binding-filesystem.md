---
description: Zilla runtime filesystem binding
---

# binding (filesystem)

Defines a binding with `filesystem`  support, with `server` behavior.

The `server` kind `filesystem` binding provides access to files and directories on the local filesystem, optionally following symbolic links.

Behaves as a web server when combined with `tcp,` `tls`, `http` and `http-filesystem` bindings.

## Example

```
"filesystem_server0":
{
    "type" : "filesystem",
    "kind": "server",
    "options":
    {
        "location": "web/"
    }
}
```

## Configuration

Binding with support for `filesystem`.

#### Properties

| Name (\* = required)                       | Type                 | Description                                      |
| ------------------------------------------ | -------------------- | ------------------------------------------------ |
| `type`\*                                   | `const "filesystem"` | Support `filesystem` accessfiles and directories |
| `kind`\*                                   | `enum [ "server" ]`  | Behave as a `filesystem` `server`                |
| [`options`](binding-filesystem.md#options) | `object`             | `filesystem`-specifc options                     |

### options

Options for `filesystem` access.

#### Properties

| Name (\* = required) | Type                                                                                                       | Description                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `location`           | `string`                                                                                                   | File system URI or directory name with trailing slash.                  |
| `symlinks`           | <p><code>enum [</code><br>  <code>follow</code> <code>,</code><br>  <code>ignore</code> <code>]</code></p> | <p>How to treat symbolic links.<br>Defaults to <code>ignore</code>.</p> |
