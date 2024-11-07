---
shortTitle: server
---

# grpc server

The grpc server binding adapts `http` request-response streams to `grpc` request-response streams, with support for both `application/grpc+proto` and `application/grpc-web+proto` content types.

```yaml {4-6,9-13}
<!-- @include: ./.partials/server.yaml -->
```

## Configuration (\* required)

### catalog

> `object` as map of named `array`

To map defined catalog for schema retrieval based on catalog specific parameters.

```yaml
catalog:
  my_catalog:
    - subject: http
```

#### catalog[].subject\*

> `string`

Unique identifier for schema categorization in the catalog.

#### catalog[].version

> `string` | Default: `latest`

Specific iteration or version of a registered schema in the defined catalog.

<!-- @include: ./.partials/options.md -->
<!-- @include: ../.partials/exit.md -->
<!-- @include: ./.partials/routes.md -->
<!-- @include: ../.partials/telemetry-grpc.md -->
