---
redirectFrom: /reference/config/catalogs/catalog-inline.html
shortTitle: inline
category:
  - Catalog
tags:
  - inline
---

# inline Catalog

Defines a catalog with schemas to enforce validation. The schemas are defined inline with the other properties.

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

## Configuration (\* required)

### options

> `object`

The `inline` specific options.

#### options.subjects

> `object` as map of named `object` properties

Unique identifier for schema categorization in the registry.

#### subjects.schema\*

> `string`

Definition specifying data structure and format in detail.

#### subjects.version

> `string` | Default: `latest`

Specific iteration or version of a registered schema.
