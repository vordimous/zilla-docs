---
shortTitle: apicurio
description: Zilla runtime apicurio catalog
category:
  - Catalog
---

# apicurio Catalog

::: important Feature is in Incubator
Read how to [enable incubator features](../../../how-tos/install.md#enable-incubator-features). Star and watch the [Zilla repo](https://github.com/aklivity/zilla/releases) for new releases!
:::

Zilla runtime apicurio catalog

```yaml {2}
catalog:
  type: apicurio
  options:
    url: http://localhost:8080
    group-id: schemas
    use-id: globalId
    id-encoding: default
```

## Summary

Defines a catalog with schemas, AsyncAPI/OpenAPI definitions pulled from a remote registry to enforce validation or create APIs.

## Configuration

:::: note Properties

- [options](#options)
  - [options.url\*](#options-url)
  - [options.group-id](#options-group-id)
  - [options.use-id](#options-v-id)
  - [options.id-encoding](#options-id-encoding)

::: right
\* required
:::

::::

### options

> `object`

#### options.url\*

> `string`

Apicurio URL to access schemas or AsyncAPI/OpenAPI definitions via API calls.

#### options.group-id

> `string`

The artifact group ID represents an independent scope in Apicurio.

#### options.use-id

> `enum` [ "globalId", "contentId" ] | Default: `"globalId"`

Use global or content identifier for resolving schemas in Apicurio.

#### options.id-encoding

> `enum` [ "default", "legacy" ] | Default: `"default"`

Store identifiers as Apicurio default 8-byte long or legacy 4-byte integer.
