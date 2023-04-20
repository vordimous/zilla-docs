---
shortTitle: vault (filesystem)
description: Zilla runtime filesystem vault
category:
  - Vault
---

# filesystem Vault

Zilla runtime filesystem vault

```yaml {2}
server:
  type: filesystem
  options:
    keys:
      store: localhost.p12
      type: pkcs12
      password: "{{env.KEYS_PASSWORD}}"
```

Defines a vault stored on the local filesystem.

The `filesystem` vault uses `PKCS12` format to store signed certificates and keys.

The `keys` option is used to identify the local peer in a `TLS` handshake.

The `trust` option is used to verify identity of the remote peer in a `TLS` handshake.

The `signers` option is used to challenge for mutual authentication in a `TLS` handshake.

Note that use of `{{env.*}}` syntax to read an environment variable currently requires setting `zilla.engine.config.syntax.mustache=true` in `.zilla/zilla.properties`.

## Configuration

Guard with support for local `filesystem`.

#### Properties

## type\*

> `const "filesystem"`

 Support `filesystem`

## [`options`](vault-filesystem.md#options)

> `object`

 `filesystem`-specific options

### options

Options for local `filesystem`.

#### Properties

## keys

 [`store`](vault-filesystem.md#store) | Private keys

## trust

 [`store`](vault-filesystem.md#store) | Trust certificates

## signers

 [`store`](vault-filesystem.md#store) | Signer certificates

### store

Store option for local `filesystem`.

#### Properties

## store\*

> `string`

 Relative path to keystore

## type

> `string`

 <p>Keystore type,<br>defaults to <code>"pkcs12"</code></p>

## password

> `string`

 Keystore password

---

::: right
\* required
:::
