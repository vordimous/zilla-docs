---
title: Zilla Runtime Configuration
order: 1
category:
  - config
description: Defines the Zilla runtime engine configuration in zilla.yaml
---

# Zilla Runtime Configuration

The Zilla runtime configuration defines the [`bindings`](binding/README.md), [`guards`](guard/README.md) and [`vaults`](vault/README.md) used by the Zilla runtime engine. The values of properties in the configuration can be literals or expressions of the form `${{env.VARIABLE}}` to resolve a local environment variable value instead.

## Properties

### name

> `string`

Namespace name.

### bindings

> `object` as map of named [`binding`](binding/README.md) properties

Map of named bindings.

### guards

> `object` as map of named [`guard`](guard/README.md) properties

Map of named guards.

### vaults

> `object` as map of named [`vault`](vault/README.md) properties

Map of named vaults.

### telemetry

> `object` as map of named [`vault`](vault/README.md) properties

Map of named vaults.
