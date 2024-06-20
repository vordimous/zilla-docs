---
shortTitle: aws-glue
description: Zilla runtime aws-glue catalog
icon: aky-zilla-plus
category:
  - Catalog
---

# aws-glue Catalog

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

Zilla runtime aws-glue catalog.

```yaml {2}
catalog:
  type: aws-glue
  options:
    registry: zilla
    max-age: 30
    compression: zlib
```

## Summary

Defines a catalog that can fetch schemas [AWS Glue](https://aws.amazon.com/glue/) to enforce validation.

## Configuration

:::: note Properties

- [options](#options)
  - [options.registry\*](#options-registry)
  - [options.max-age](#options-max-age)
  - [options.compression](#options-compression)

::: right
\* required
:::

::::

### options

> `object`

#### options.registry\*

> `string`

The AWS Glue Registry name to access schemas.

#### options.max-age

> `number` | Default: `"300"`

Configures the time to live in `seconds` for the schema information retrieved against the latest version. The default is 300 seconds or 5 minutes.

#### options.compression

> `enum` [ "none", "zlib" ] | Default: `"none"`

Configures the compression level for the message payloads that are serialized by the models configured in this catalog.
