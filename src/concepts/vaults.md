# Vaults

Each configured [`vault`](../reference/config/overview.md#vaults) represents a container for digital keys and certificates based on a specific implementation `type`.

```yaml
---
name: zilla-namespace

vaults:
  my_servers:
    type: filesystem
    options:
      keys:
        store: tls/localhost.p12
        type: pkcs12
        password: ${{env.KEYSTORE_PASSWORD}}
```
