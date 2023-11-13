---
shortTitle: aws
description: Zilla runtime aws vault
icon: aky-zilla-plus
category:
  - Vault
---

# aws Vault

Zilla runtime aws vault.

```yaml {2}
server:
  type: aws
  options:
    overrides:
      acm: http://localhost:8080/acm
      acmpca: http://localhost:8080/acmpca
      secretsmanager: http://localhost:8000/secretsmanager
      resourcegroupstaggingapi: http://localhost:8000/resourcegroupstaggingapi
```

## Summary

Defines a vault remotely accessing AWS services from an EC2 instance.

This is typically combined with `tls` binding `vault` property, referencing resources such as `secrets` by Amazon Resource Names (ARNs).

## Configuration

:::: note Properties

- [options](#options)
- [options.overrides](#options-overrides)
  - [overrides.acm](#overrides-acm)
  - [overrides.acmpca](#overrides-acmpca)
  - [overrides.secretsmanager](#overrides-secretsmanager)
  - [overrides.resourcegroupstaggingapi](#overrides-resourcegroupstaggingapi)

::: right
\* required
:::

::::

### options

> `object`

`aws`-specific options.

```yaml
options:
  overrides:
    acm: http://localhost:8080/acm
    acmpca: http://localhost:8080/acmpca
    secretsmanager: http://localhost:8000/secretsmanager
    resourcegroupstaggingapi: http://localhost:8000/resourcegroupstaggingapi
```

### options.overrides

> `object`

Endpoint URL overrides for AWS service APIs.

#### overrides.acm

> `string`

Endpoint URL override for AWS Certificate Manager API.

#### overrides.acmpca

> `string`

Endpoint URL override for AWS Certificate Manager Private Certificate Authority API.

#### overrides.secretsmanager

> `string`

Endpoint URL override for AWS Secrets Manager API.

#### overrides.resourcegroupstaggingapi

> `string`

Endpoint URL override for AWS Resource Groups Tagging API.

---

::: right
\* required
:::
