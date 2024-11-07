---
redirectFrom: /reference/config/models/model-json.html
shortTitle: json
category:
  - Models
tags:
  - json
---

# json Model

Defines a model to utilize schema from catalog to enforce validation, ensuring adherence to predefined data structures.

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

## Configuration (\* required)

### model: json

> `const`

Specifies the model is `json`.

<!-- @include: ./.partials/cataloged.md -->
