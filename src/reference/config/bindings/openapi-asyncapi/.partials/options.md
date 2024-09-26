### options

> `object`

The `openapi-asyncapi` specific options.

```yaml
options:
  specs:
    openapi:
      my-openapi-spec:
        catalog:
          my_catalog:
            subject: petstore
            version: latest
    asyncapi:
      my-asyncapi-spec:
        catalog:
            my_catalog:
              subject: petstore
              version: latest
```

#### options.specs

> `object`

OpenAPI and AsyncAPI specs definition.

#### specs.openapi\*

> `object` as map of named `object` properties

Options for each configured OpenAPI spec.

#### openapi.catalog

> `object` as map of named `object` properties

The Catalog specific options.

#### catalog.subject\*

> `string`

Subject name used when storing the catalog artifact.

#### catalog.version

> `string` | Default: `latest`

Catalog artifact version to use.

#### specs.asyncapi\*

> `object` as map of named `object` properties

Options for each configured AsyncAPI spec.

#### asyncapi.catalog

> `object` as map of named `object` properties

The `catalog` catalog specific options.

<!-- markdownlint-disable MD024 -->
#### catalog.subject\*

> `string`

Subject name used when storing the catalog artifact.

#### catalog.version

> `string` | Default: `latest`

Catalog artifact version to use.
<!-- markdownlint-enable MD024 -->
