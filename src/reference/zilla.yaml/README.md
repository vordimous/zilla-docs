---
title: Config Yaml
text: "yaml"
icon: "gears"
order: 1
category:
  - config
description: Defines the Zilla runtime engine configuration in zilla.yaml
---

# Zilla Runtime Configuration

The Zilla runtime configuration defines the `bindings`, `guards` and `vaults` used by the Zilla runtime engine. The values of properties in the configuration can be literals or expressions of the form `${{env.VARIABLE}}` to resolve a local environment variable value instead.


## Properties

| Name       | Type                                                        | Description           |
| ---------- | ----------------------------------------------------------- | --------------------- |
| [`name`](#name)     | `string`                                                    | Namespace name        |
| [`bindings`](#bindings) | `object` as map of named [`binding`](binding.md) properties | Map of named bindings |
| [`guards`](#guards)   | `object` as map of named [`guard`](guard.md) properties     | Map of named guards   |
| [`vaults`](#vaults)   | `object` as map of named [vault](vault.md) properties       | Map of named vaults   |

### name

- Type: `string`
- Default: Key of current locale

Namespace name
### bindings

- Type: `object` as map of named [binding](binding.md) properties
- Default: Key of current locale

Map of named bindings
### guards

- Type: `object` as map of named [guard](guard.md) properties
- Default: Key of current locale

Map of named guards
### vaults

- Type: `object` as map of named [vault](vault.md) properties
- Default: Key of current locale

Map of named vaults
