---
shortTitle: vault
description: Zilla runtime vault type
category:
  - Vault
---

# Vault

Each configured `vault` represents a container for digital keys and certificates based on a specific implementation `type`.

Vaults can be used by specific protocol bindings, such as `tls`, to negotiate shared encryption keys.

See each of the specific `vault` types linked below for more detailed examples.

### Configuration

Each runtime `vault` has a behavioral type supporting a specific implementation strategy.

#### Properties (generic)

## type

 <p><code>enum [</code><br>  [`"filesystem"`](vault-filesystem.md)<br><code>]</code></p> | Behavioral type

#### Properties (type-specific)

## options

> `object`

 Behavioral options

---

::: right
\* required
:::
