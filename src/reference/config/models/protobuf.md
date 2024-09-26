---
redirectFrom: /reference/config/models/model-protobuf.html
shortTitle: protobuf
category:
  - Models
tags:
  - protobuf
---

# protobuf Model

Defines a model to utilize schema from catalog to enforce validation, ensuring adherence to predefined data structures.

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

## Configuration (\* required)

### model: protobuf

> `const`

Specifies the model is a `protobuf`.

### view

> `enum` [ `json` ]

Transforms the model from this data type to the Protobuf schema on produce and to this data type from the Protobuf schema on consume.

### catalog\*

> `object` as map of named `array`

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

#### catalog[].id\*

> `integer`

Define specific schema id to refer from catalog.

#### catalog[].version

> `string` | Default: `latest`

Specific iteration or version of a registered schema in the defined catalog.

#### catalog[].strategy\*

> `enum` [ `topic` ]

To determine the subject based on the specified strategy

#### catalog[].subject\*

> `string`

Unique identifier for schema categorization in the catalog.

#### catalog[].record\*

> `string`

Define specific record to refer from Protobuf schema.
