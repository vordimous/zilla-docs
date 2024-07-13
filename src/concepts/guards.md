# Guards

Each configured [`guard`](../reference/config/overview.md#guards) represents a security checkpoint for one or more bindings based on a specific implementation `type`. Guards can be used by specific protocol bindings to enforce authorization requirements. Associated roles can be enforced during routing by only following routes `guarded` by specific role requirements when authorized. This implicitly supports falling through to lower privilege routes when `guarded` higher privilege routes are not authorized.

```yaml
---
name: zilla-namespace

guards:
  authn_jwt:
    type: jwt
    options:
      issuer: https://auth.example.com
      audience: https://api.example.com
      keys:
        - kty: RSA
          n: ...
          e: ...
          alg: RS256
          kid: example
```
