---
redirectFrom: /reference/config/models/model-avro.html
shortTitle: avro
category:
  - Models
tags:
  - avro
---

# avro model

Defines a model to utilize schema from catalog to enforce validation, ensuring adherence to predefined data structures.

```yaml {1}
model: avro
view: json
catalog:
  items-catalog:
    - strategy: topic
      version: latest
    - subject: items-snapshots
      version: latest
    - id: 1
```

## Configuration (\* required)

### model: avro

> `const`

Specifies the model is `avro`.

### view

> `enum` [ `json` ]

Transforms the model from this data type to the Avro schema on produce and to this data type from the Avro schema on consume.

<!-- @include: ./.partials/cataloged.md -->
