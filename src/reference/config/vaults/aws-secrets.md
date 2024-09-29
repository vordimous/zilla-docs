---
shortTitle: aws-secrets
icon: aky-zilla-plus
category:
  - Vault
---

# aws-secrets Vault

A Zilla runtime aws-secrets vault that enables remote access of AWS services from an EC2 instance.

This is typically combined with a [tls](../bindings/tls/README.md) binding `vault` property, referencing resources such as `secrets` by Amazon Resource Names (ARNs).

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

```yaml {2}
server:
  type: aws-secrets
```
