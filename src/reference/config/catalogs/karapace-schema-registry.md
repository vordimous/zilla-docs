---
redirectFrom: /reference/config/catalogs/catalog-karapace-schema-registry.html
shortTitle: karapace-schema-registry

category:
  - Catalog
tags:
  - karapace-schema-registry
---

# karapace-schema-registry Catalog

Defines a catalog with a schema pulled from a remote schema registry to enforce validation.

Accepted `type` aliases: `karapace`

```yaml {2}
catalog:
  type: karapace-schema-registry
  options:
    url: http://reg.example.com:8081
    context: default
```

## Configuration (\* required)

<!-- @include: ./.partials/options-schema-registry.md -->
