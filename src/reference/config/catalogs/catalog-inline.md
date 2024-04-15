---
shortTitle: inline
description: Zilla runtime inline catalog
category:
  - Catalog
---

# inline Catalog

Zilla runtime inline catalog

```yaml {2}
catalog:
  type: inline
  options:
    subjects: 
      items-snapshots:
        schema: |
          {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "status": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "status"
            ]
          }
```

## Summary

Defines a catalog with schemas to enforce validation. The schemas are defined inline with the other properties.

## Configuration

:::: note Properties

- [options](#options)
  - [options.subjects\*](#options-subjects)
    - [subjects.schema\*](#subjects-schema)
    - [subjects.version](#subjects-version)

::: right
\* required
:::

::::

### options

> `object`

#### options.subjects\*

> `object` as map of named objects

Unique identifier for schema categorization in the registry.

##### subjects.schema\*

> `string`

Definition specifying data structure and format in detail.

##### subjects.version

> `string` | Default: `"latest"`

Specific iteration or version of a registered schema.
