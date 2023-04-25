---
title: Zilla Runtime Configuration
order: 1
category:
  - config
description: Defines the Zilla runtime engine configuration in zilla.yaml
---

# Zilla Runtime Configuration

The Zilla runtime configuration defines the [`bindings`](binding.md), [`guards`](guard.md) and [`vaults`](vault.md) used by the Zilla runtime engine. The values of properties in the configuration can be literals or expressions of the form `${{env.VARIABLE}}` to resolve a local environment variable value instead.

## Properties

### name

> `string`

Namespace name.

### bindings

> `object` as map of named [`binding`](binding.md) properties

Map of named bindings.

### guards

> `object` as map of named [`guard`](guard.md) properties

Map of named guards.

### vaults

> `object` as map of named [`vault`](vault.md) properties

Map of named vaults.
