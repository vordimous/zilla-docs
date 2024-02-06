---
shortTitle: protobuf
description: Zilla runtime protobuf model
category:
  - Models
---

# protobuf Model

::: info Feature Coming Soon <HopeIcon icon="fas fa-circle-right"/>
This is currently on the [Zilla roadmap](https://github.com/orgs/aklivity/projects/4). Star and watch the [Zilla repo](https://github.com/aklivity/zilla/releases) for new releases!
:::

Zilla runtime protobuf model

```yaml {1}
model: protobuf
view: json
catalog:
  items-catalog:
    - strategy: topic
      version: latest
      record: EchoMessage
    - subject: items-snapshots
      version: latest
      record: EchoMessage
    - id: 1
      record: EchoMessage
```

## Summary

Defines a model to utilize schema from catalog to enforce validation, ensuring adherence to predefined data structures.

## Configuration

:::: note Properties

- [view](#view)
- [catalog\*](#catalog)
  - [catalog.strategy](#catalog-strategy)
  - [catalog.subject](#catalog-subject)
  - [catalog.version](#catalog-version)
  - [catalog.id](#catalog-id)
  - [catalog.record\*](#catalog-record)

::: right
\* required
:::

::::

### view

> `enum` [ "json" ]

Transforms the model from this data type to the Protobuf schema on produce and to this data type from the Protobuf schema on consume.

### catalog\*

> `object`

To map defined catalog for schema retrieval based on catalog specific parameters. Any of the possible combination can be configured.

> `id`
> `record`
-----
> `strategy`
> `version`
> `record`
-----
> `subject`
> `version`
> `record`

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

#### catalog.record\*

> `string`

Define specific record to refer from Protobuf schema.
