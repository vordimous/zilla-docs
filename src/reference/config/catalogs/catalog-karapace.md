---
shortTitle: karapace
description: Zilla runtime karapace catalog
category:
  - Catalog
---

# karapace Catalog

Zilla runtime karapace catalog

```yaml {2}
catalog:
  type: karapace
  options:
    url: http://reg.example.com:8081
    context: default
```

## Summary

Defines a catalog with a schema pulled from a remote schema registry to enforce validation.

## Configuration

:::: note Properties

- [options](#options)
  - [options.url\*](#options-url)
  - [options.context](#options-context)

::: right
\* required
:::

::::

### options

> `object`

#### options.url\*

> `string`

Karapace Schema Registry URL to access schemas via API calls.

#### options.context

> `string` | Default: `"default"`

Schema context represents an independent scope in the Karapace schema registry.
