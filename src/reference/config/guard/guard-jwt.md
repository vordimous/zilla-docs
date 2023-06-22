---
shortTitle: jwt
description: Zilla runtime jwt guard
category:
  - Binding
tag:
  - Server
---

# jwt Guard

Zilla runtime jwt guard.

```yaml {2}
jwt:
  type: jwt
  options:
    issuer: https://auth.example.com
    audience: https://api.example.com
    keys:
      - kty: EC
        crv: P-256
        x: MKBCTNIcKUSDii11ySs3526iDZ8AiTo7Tu6KPAqv7D4
        y: 4Etl6SRW2YiLUrN5vfvVHuhp7x8PxltmWWlbbM4IFyM
        use: enc
        kid: '1'
      - kty: RSA
        n: 0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtVT86zwu1RK7aPFFxuhDR1L6tSoc_BJECPebWKRXjBZCiFV4n3oknjhMstn64tZ_2W-5JsGY4Hc5n9yBXArwl93lqt7_RN5w6Cf0h4QyQ5v-65YGjQR0_FDW2QvzqY368QQMicAtaSqzs8KJZgnYb9c7d0zgdAZHzu6qMQvRL5hajrn1n91CbOpbISD08qNLyrdkt-bFTWhAI4vMQFh6WeZu0fM4lFd2NcRwr3XPksINHaQ-G_xBniIqbw0Ls1jF44-csFCur-kEgU8awapJzKnqDKgw
        e: AQAB
        alg: RS256
        kid: '2011-04-29'
    challenge: 30
```

## Summary

Defines a guard with `JSON Web Token (JWT)` support.

The `jwt` guard uses public keys to verify the integrity of `JWT` access tokens when identifying authorized subjects and their associated roles scope. The token issuer and audience can also be constrained to prevent access tokens from other applications from being reused inappropriately.

Each verified JWT access token has an expiration time, and an optional challenge window prior to the expiration time that can be used by specific protocol bindings to send a challenge to renew the access token before it expires.

## Configuration

:::: note Properties

- [options](#options)
- [options.issuer](#options-issuer)
- [options.audience](#options-audience)
- [options.challenge](#options-challenge)
- [options.keys\*](#options-keys)
- [keys\[\].kty\*](#keys-kty)
- [keys\[\].kid\*](#keys-kid)
- [keys\[\].n](#keys-n)
- [keys\[\].e](#keys-e)
- [keys\[\].alg](#keys-alg)
- [keys\[\].crv](#keys-crv)
- [keys\[\].x](#keys-x)
- [keys\[\].y](#keys-y)

::: right
\* required
:::

::::

### options

> `object`

`jwt`-specific options.

```yaml
options:
  issuer: https://auth.example.com
  audience: https://api.example.com
  challenge: 30
  keys:
    - kty: EC
      crv: P-256
      x: MKBCTNIcKUSDii11ySs3526iDZ8AiTo7Tu6KPAqv7D4
      y: 4Etl6SRW2YiLUrN5vfvVHuhp7x8PxltmWWlbbM4IFyM
      use: enc
      kid: '1'
    - kty: RSA
      n: 0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtVT86zwu1RK7aPFFxuhDR1L6tSoc_BJECPebWKRXjBZCiFV4n3oknjhMstn64tZ_2W-5JsGY4Hc5n9yBXArwl93lqt7_RN5w6Cf0h4QyQ5v-65YGjQR0_FDW2QvzqY368QQMicAtaSqzs8KJZgnYb9c7d0zgdAZHzu6qMQvRL5hajrn1n91CbOpbISD08qNLyrdkt-bFTWhAI4vMQFh6WeZu0fM4lFd2NcRwr3XPksINHaQ-G_xBniIqbw0Ls1jF44-csFCur-kEgU8awapJzKnqDKgw
      e: AQAB
      alg: RS256
      kid: '2011-04-29'
```

### options.issuer

> `string`

Issuer claim.

### options.audience

> `string`

Audience claim.

### options.challenge

> `number`

Challenge period (seconds).

### options.keys\*

> `array` of `object`

### keys[].kty\*

> `string`

Key type, e.g. `RSA` , `EC`.

### keys[].kid\*

> `string`

Key ID.

### keys[].n

> `string`

`RSA` `modulus`.

### keys[].e

> `string`

`RSA` `exponent`.

### keys[].alg

> `string`

`RSA` algorithm, e.g. `RS256`.

### keys[].crv

> `string`

`EC` curve name.

### keys[].x

> `string`

`EC` point `x` coordinate.

### keys[].y

> `string`

`EC` point `y` coordinate.

---

::: right
\* required
:::
