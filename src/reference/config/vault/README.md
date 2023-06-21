---
shortTitle: Vaults
description: Zilla runtime vault type
category:
  - Vault
---

# Vaults

Each configured `vault` represents a container for digital keys and certificates based on a specific implementation `type`.

Vaults can be used by specific protocol bindings, such as `tls`, to negotiate shared encryption keys.

See each of the specific `vault` types linked below for more detailed examples.

## Configuration

Each runtime `vault` has a behavioral type supporting a specific implementation strategy.

### Properties (generic)

### type

> `enum` \[\
> ["filesystem"](vault-filesystem.md)\
> \]

Behavioral type.

### Properties (type-specific)

### options

> `object`

Behavioral options.

---

::: right
\* required
:::
