---
shortTitle: openapi-asyncapi
description: Zilla runtime openapi-asyncapi binding
category:
  - Binding
tag:
  - Proxy
---

# openapi-asyncapi Binding

Zilla runtime `openapi-asyncapi` binding.

```yaml {2}
openapi_asyncapi_proxy:
  type: openapi-asyncapi
  kind: proxy
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
  routes:
    - when:
        - api-id: my-openapi-spec
      exit: asyncapi_client
      with:
        api-id: my-asyncapi-spec
```

## Summary

The `proxy` kind `openapi-asyncapi` binding adapts OpenAPI request-response streams to AsyncAPI streams.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
  - [options.specs](#options-specs)
    - [specs.openapi](#specs-openapi)
        - [openapi.catalog](#openapi-catalog)
          - [catalog.subject](#catalog-subject)
          - [catalog.version](#catalog-version)
    - [specs.asyncapi](#specs-asyncapi)
        - [asyncapi.catalog](#asyncapi-catalog)
          - [catalog.subject](#catalog-subject)
          - [catalog.version](#catalog-version)
- [routes](#routes)
- [routes\[\].when](#routes-when)
  - [when\[\].api-id](#when-api-id)
  - [when\[\].operation-id](#when-operation-id)
- [routes\[\].exit\*](#routes-exit)
- [routes\[\].with](#routes-with)
  - [with.api-id](#with-api-id)
  - [with.operation-id](#with-operation-id)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "proxy" ]

Behave as an `openapi-asyncapi` `proxy`.

```yaml
kind: proxy
```

### options

> `object`

`openapi-asyncapi`-specific options.

```yaml
options:
  specs:
    openapi:
      my-openapi-spec: spec/openapi.yaml
    asyncapi:
      my-asyncapi-spec: spec/asyncapi.yaml
```

#### options.specs

> `object`

OpenAPI and AsyncAPI specs definition.

##### specs.openapi

> `object` of `name: value` properties

#### openapi.catalog

> `object` as map of named properties

catalog specific options.

#### catalog.subject

> `string`

Subject name used when storing the catalog artifact.

#### catalog.version

> `string`

Catalog artifact version to use.

##### specs.asyncapi

> `object` of `name: value` properties

#### asyncapi.catalog

> `object` as map of named properties

`catalog` catalog specific options.

#### catalog.subject

> `string`

`catalog` subject name.

#### catalog.version

> `string`

`catalog` version.

### routes

> `array` of `object`

Conditional `openapi-asyncapi`-specific routes for adapting `openapi` operations to `asyncapi` operations.

### routes[].when

> `array` of `object`

List of conditions to match this route when adapting `openapi` request-response streams to `asyncapi` streams.
Read more: [When a route matches](../../../concepts/config-intro.md#when-a-route-matches)

#### when[].api-id

> `string`

OpenAPI spec identifier that matches from the `openapi` binding request stream.

#### when[].operation-id

> `string`

OpenAPI OperationId that can be mapped between OpenAPI and AsyncAPI spec

### routes[].exit\*

> `string`

Default exit binding when no conditional routes are viable.

```yaml
routes:
  - when:
    ...
    exit: asyncapi_client
```

### routes[].with

> `object`

Defines the route with the AsyncAPI spec identifier and OperationId.

```yaml
with:
  api-id: my-asyncapi-spec
```

#### with.api-id

> `string`

AsyncAPI spec identifier that the route exits with to the next binding

#### with.operation-id

> `string`

AsyncAPI OperationId that the route exits with to the next binding

---

::: right
\* required
:::
