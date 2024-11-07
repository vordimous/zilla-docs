---
redirectFrom: /reference/config/catalogs/catalog-schema-registry.html
shortTitle: schema-registry
category:
  - Catalog
tags:
  - schema-registry
---

# schema-registry Catalog

Defines a catalog with a schema pulled from a remote schema registry to enforce validation.

```yaml {2}
catalog:
  type: schema-registry
  options:
    url: http://reg.example.com:8081
    context: default
```

## Configuration (\* required)

<!-- @include: ./.partials/options-schema-registry.md -->
