---
redirectFrom: /reference/config/catalogs/catalog-apicurio-registry.html
shortTitle: apicurio-registry
category:
  - Catalog
tags:
  - apicurio-registry
---

# apicurio-registry Catalog

Defines a catalog with schemas, AsyncAPI/OpenAPI definitions pulled from a remote registry to enforce validation or create APIs.

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

## Configuration (\* required)

### options

> `object`

The `apicurio-registry` specific options.

#### options.url

> `string`

Apicurio URL to access schemas or AsyncAPI/OpenAPI definitions via API calls.

#### options.group-id

> `string` | Default: `default`

The artifact group ID represents an independent scope in Apicurio.

#### options.use-id

> `enum` [ `globalId`, `contentId` ] | Default: `globalId`

Use global or content identifier for resolving schemas in Apicurio.

#### options.id-encoding

> `enum` [ `default`, `legacy` ] | Default: `default`

Store identifiers as Apicurio default 8-byte long or legacy 4-byte integer.

#### options.max-age

> `integer` | Default: `300`

The maximum duration in seconds to keep a cached schema before fetching the schema again.
