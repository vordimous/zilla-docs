---
redirectFrom: /reference/config/catalogs/catalog-aws-glue.html
shortTitle: aws-glue
icon: aky-zilla-plus
category:
  - Catalog
tags:
  - aws-glue
---

# aws-glue Catalog

Zilla runtime aws-glue catalog supports the official [AWS Glue](https://aws.amazon.com/glue/) registry. It defines a catalog that can fetch schemas [AWS Glue](https://aws.amazon.com/glue/) to enforce validation.

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

```yaml {2}
catalog:
  type: aws-glue
  options:
    registry: zilla
    max-age: 30
    compression: zlib
```

## Configuration (\* required)

### options

> `object`

The `aws-glue` specific options.

#### options.registry\*

> `string`

The AWS Glue Registry name to access schemas.

#### options.max-age

> `integer` | Default: `300`

Configures the time to live in `seconds` for the schema information retrieved against the latest version. The default is 300 seconds or 5 minutes.

#### options.compression

> `enum` [ `none`, `zlib` ] | Default: `none`

Configures the compression level for the message payloads that are serialized by the models configured in this catalog.
