---
redirectFrom: /reference/config/guards/guard-jwt.html
shortTitle: jwt
category:
  - Guard
tag:
  - jwt
---

# jwt Guard

Defines a guard with `JSON Web Token (JWT)` support.

The `jwt` guard uses public keys to verify the integrity of `JWT` access tokens when identifying authorized subjects and their associated roles scope. The token issuer and audience can also be constrained to prevent access tokens from other applications from being reused inappropriately.

Each verified JWT access token has an expiration time, and an optional challenge window prior to the expiration time that can be used by specific protocol bindings to send a challenge to renew the access token before it expires.

If using an Identity Provider that exposes a `.well-known/jwks.json` file, simply provide the `issuer` and `audience`. The JWKS will be fetched, remotely.

```yaml {2}
guards:
  my_jwt_guard:
    type: jwt
    options:
      issuer: https://auth.example.com
      audience: https://api.example.com
```

Manual configuration is also supported.

```yaml {2}
guards:
  my_jwt_guard:
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
          kid: "1"
        - kty: RSA
          n: 0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtVT86zwu1RK7aPFFxuhDR1L6tSoc_BJECPebWKRXjBZCiFV4n3oknjhMstn64tZ_2W-5JsGY4Hc5n9yBXArwl93lqt7_RN5w6Cf0h4QyQ5v-65YGjQR0_FDW2QvzqY368QQMicAtaSqzs8KJZgnYb9c7d0zgdAZHzu6qMQvRL5hajrn1n91CbOpbISD08qNLyrdkt-bFTWhAI4vMQFh6WeZu0fM4lFd2NcRwr3XPksINHaQ-G_xBniIqbw0Ls1jF44-csFCur-kEgU8awapJzKnqDKgw
          e: AQAB
          alg: RS256
          kid: "2011-04-29"
      challenge: 30
```

## Configuration (\* required)

### options\*

> `object`

The `jwt` specific options.

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
      kid: "1"
    - kty: RSA
      n: 0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtVT86zwu1RK7aPFFxuhDR1L6tSoc_BJECPebWKRXjBZCiFV4n3oknjhMstn64tZ_2W-5JsGY4Hc5n9yBXArwl93lqt7_RN5w6Cf0h4QyQ5v-65YGjQR0_FDW2QvzqY368QQMicAtaSqzs8KJZgnYb9c7d0zgdAZHzu6qMQvRL5hajrn1n91CbOpbISD08qNLyrdkt-bFTWhAI4vMQFh6WeZu0fM4lFd2NcRwr3XPksINHaQ-G_xBniIqbw0Ls1jF44-csFCur-kEgU8awapJzKnqDKgw
      e: AQAB
      alg: RS256
      kid: "2011-04-29"
```

#### options.issuer

> `string`

Issuer claim.

#### options.audience

> `string`

Audience claim.

#### options.challenge

> `integer`

Challenge period (seconds).

#### options.keys

> `string`, `array` of `object`

If not provided, the `jwt` vault relies on the issuer to infer the location of a remote `.well-known/jwks.json` file.

If a `string` is provided, the value is expected to be a URI.

If an `array` of objects is provided, the value is expected to be a list of object with the supported keys and their values.

::: note Supported keys

**kty**: `string`

> Key type, e.g. "RSA" , "EC".

**kid**: `string`

> Key ID.

**n**: `string`

> "RSA" modulus.

**e**: `string`

> "RSA" exponent.

**alg**: `string`

> "RSA" algorithm, e.g. "RS256".

**crv**: `string`

> "EC" curve name.

**x**: `string`

> "EC" point X coordinate.

**y**: `string`

> "EC" point Y coordinate.

:::
