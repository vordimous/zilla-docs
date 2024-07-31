---
shortTitle: apicurio-registry
description: Zilla runtime apicurio-registry catalog
category:
  - Catalog
---

# apicurio-registry Catalog

Zilla runtime apicurio-registry catalog.

Accepted `type` aliases:  `apicurio`

```yaml {2}
catalog:
  type: apicurio-registry
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
  - [options.use-id](#options-use-id)
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
