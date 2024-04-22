---
shortTitle: filesystem
description: Zilla runtime filesystem catalog
category:
  - Catalog
---

# filesystem Catalog

::: important Feature is in Incubator
Read how to [enable incubator features](../../../how-tos/deploy-operate.md#enable-incubator-features). Star and watch the [Zilla repo](https://github.com/aklivity/zilla/releases) for new releases!
:::

Zilla runtime filesystem catalog

```yaml {2}
catalogs:
  my_catalog:
    type: filesystem
    options:
      subjects:
        my_local_file:
          path: path/to/local_file.txt
```

## Summary

Defines a catalog with schemas, AsyncAPI/OpenAPI definitions or proto files pulled from the filesystem relative `zilla.yaml` to enforce validation, create APIs or gRPC services.

## Configuration

:::: note Properties

- [options](#options)
  - [options.subjects\*](#options-subjects)
    - [subjects.path\*](#subjects-path)

::: right
\* required
:::

::::

### options

> `object`

#### options.subjects\*

> `object` as map of named objects

Unique identifier for artifact categorization in the catalog.

##### subjects.path\*

> `string`

Path to access artifact from the filesystem. The paths are relative to `zilla.yaml`.

