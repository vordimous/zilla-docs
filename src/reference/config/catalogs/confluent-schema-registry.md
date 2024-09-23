---
redirectFrom: /reference/config/catalogs/catalog-confluent-schema-registry.html
shortTitle: confluent-schema-registry
icon: aky-zilla-plus
category:
  - Catalog
tags:
  - confluent-schema-registry
---

# confluent-schema-registry Catalog

Defines a catalog with a schema pulled from a remote schema registry to enforce validation.

Zilla runtime confluent-schema-registry catalog supports the official [Confluent](https://docs.confluent.io/platform/current/schema-registry/index.html) schema registry.

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

```yaml {2}
catalog:
  type: confluent-schema-registry
  options:
    url: http://reg.example.com:8081
    context: default
```

## Configuration (\* required)

<!-- @include: ./.partials/options-schema-registry.md -->
