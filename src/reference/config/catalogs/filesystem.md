---
redirectFrom: /reference/config/catalogs/catalog-filesystem.html
shortTitle: filesystem
category:
  - Catalog
tags:
  - filesystem
---

# filesystem Catalog

Defines a catalog with schemas, AsyncAPI/OpenAPI definitions or proto files pulled from the filesystem relative `zilla.yaml` to enforce validation, create APIs or gRPC services.

```yaml {2}
catalogs:
  my_catalog:
    type: filesystem
    options:
      subjects:
        my_local_file:
          path: path/to/local_file.txt
```

## Configuration (\* required)

### options

> `object`

The `filesystem` specific options.

#### options.subjects

> `object` as map of named `object` properties

Unique identifier for artifact categorization in the catalog.

#### subjects.path\*

> `string`

Path to access artifact from the filesystem. The paths are relative to `zilla.yaml`.
