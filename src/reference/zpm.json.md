---
description: Configures dependencies to be resolved when packaging the Zilla runtime
---

# Zilla Manager Configuration

## Configuration

#### Properties

| Name           | Type                                               | Description                                              |
| -------------- | -------------------------------------------------- | -------------------------------------------------------- |
| `repositories` | `array` of [`repository`](#repository) | List of repository URLs                                  |
| `imports`      | `array` of [`import`](#import)          | List of Maven BOMs to import managed dependency versions |
| `dependencies` | `array` of [`dependency`](#dependency)  | List of Maven dependencies                               |

### repository

#### Type

`string`

#### Pattern

`scheme://host:port/path` (URL)

### import

#### Type

`string`

#### Pattern

`groupId:artifactId:version`

### `dependency`

#### Type

`string`

#### Pattern

`groupId:artifactId[:version]`
