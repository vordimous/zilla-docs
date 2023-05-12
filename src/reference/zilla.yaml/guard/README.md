---
shortTitle: Guards
description: Zilla runtime guard type
category:
  - Guard
---

# Guards

Each configured `guard` represents a security checkpoint for one or more bindings based on a specific implementation `type`.

Guards can be used by specific protocol bindings to enforce authorization requirements.

Associated roles can be enforced during routing by only following routes `guarded` by specific role requirements when authorized. This implicitly supports falling through to lower privilege routes when `guarded` higher privilege routes are not authorized.

See each of the specific `guard` types linked below for more detailed examples.

## Configuration

Each runtime `guard` has a behavioral type supporting a specific implementation strategy.

### Properties (generic)

### type

> `enum` \[\
> ["jwt"](guard-jwt.md)\
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
