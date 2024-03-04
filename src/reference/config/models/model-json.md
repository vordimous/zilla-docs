---
shortTitle: json
description: Zilla runtime json model
category:
  - Models
---

# json Model

::: important Feature is in Incubator
Read how to [enable incubator features](../../../how-tos/install.md#enable-incubator-features). Star and watch the [Zilla repo](https://github.com/aklivity/zilla/releases) for new releases!
:::

Zilla runtime json model

```yaml {1}
model: json
catalog:
  items-catalog:
    - strategy: topic
      version: latest
    - subject: items-snapshots
      version: latest
    - id: 1
```

## Summary

Defines a model to utilize schema from catalog to enforce validation, ensuring adherence to predefined data structures.

## Configuration

:::: note Properties

- [catalog\*](#catalog)
  - [catalog.strategy](#catalog-strategy)
  - [catalog.subject](#catalog-subject)
  - [catalog.version](#catalog-version)
  - [catalog.id](#catalog-id)

::: right
\* required
:::

::::

### catalog\*

> `object`

To map defined catalog for schema retrieval based on catalog specific parameters. Any of the possible combination can be configured.

> `id`
-----
> `strategy`
> `version`
-----
> `subject`
> `version`

#### catalog.strategy

> `enum` [ "topic" ]

To determine the subject based on the specified strategy

#### catalog.subject

> `string`

Unique identifier for schema categorization in the catalog.

#### catalog.version

> `string` | Default: `"latest"`

Specific iteration or version of a registered schema in the defined catalog.

#### catalog.id

> `integer`

Define specific schema id to refer from catalog.
