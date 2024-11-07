---
shortTitle: float
category:
  - Models
tags:
  - float
---

# float Model

Defines a model to enforce validation for float data.

```yaml {1}
model: float
```

## Configuration (\* required)

### model: float

> `const`

Specifies the model is a `float`.

<!-- @include: ./.partials/number.md -->

### range

> `string` | Pattern: `((?:\\(|\\[))(-?\\d+(?:\\.\\d+)?)?,(-?\\d+(?:\\.\\d+)?)?((?:\\)|\\]))`
