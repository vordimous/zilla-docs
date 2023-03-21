---
description: Zilla runtime jwt guard
---

# guard (jwt)

Defines a guard with `JSON Web Token (JWT)` support.

The `jwt` guard uses public keys to verify the integrity of `JWT` access tokens when identifying authorized subjects and their associated roles scope. The token issuer and audience can also be constrained to prevent access tokens from other applications from being reused inappropriately.

Each verified JWT access token has an expiration time, and an optional challenge window prior to the expiration time that can be used by specific protocol bindings to send a challenge to renew the access token before it expires.

## Example

```
"jwt0":
{
    "type": "jwt",
    "options":
    {
        "issuer": "https://auth.example.com",
        "audience": "https://api.example.com",
        "keys":
        [
            {
                "kty":"EC",
                "crv":"P-256",
                "x":"MKBCTNIcKUSDii11ySs3526iDZ8AiTo7Tu6KPAqv7D4",
                "y":"4Etl6SRW2YiLUrN5vfvVHuhp7x8PxltmWWlbbM4IFyM",
                "use":"enc",
                "kid":"1"
            },
            {
                "kty":"RSA",
                "n": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtVT86zwu1RK7aPFFxuhDR1L6tSoc_BJECPebWKRXjBZCiFV4n3oknjhMstn64tZ_2W-5JsGY4Hc5n9yBXArwl93lqt7_RN5w6Cf0h4QyQ5v-65YGjQR0_FDW2QvzqY368QQMicAtaSqzs8KJZgnYb9c7d0zgdAZHzu6qMQvRL5hajrn1n91CbOpbISD08qNLyrdkt-bFTWhAI4vMQFh6WeZu0fM4lFd2NcRwr3XPksINHaQ-G_xBniIqbw0Ls1jF44-csFCur-kEgU8awapJzKnqDKgw",
                "e":"AQAB",
                "alg":"RS256",
                "kid":"2011-04-29"
            }
        ],
        "challenge": 30
    }
}
```

## Configuration

Guard with support for `jwt`.

#### Properties

| Name (\* = required)              | Type          | Description            |
| --------------------------------- | ------------- | ---------------------- |
| `type`\*                          | `const "jwt"` | Support `jwt`          |
| [`options`](guard-jwt.md#options) | `object`      | `jwt`-specific options |

### options

Options for `jwt`.

#### Properties

| Name        | Type                      | Description                |
| ----------- | ------------------------- | -------------------------- |
| `issuer`    | `string`                  | Issuer claim               |
| `audience`  | `string`                  | Audience claim             |
| `keys`\*    | [`key`](guard-jwt.md#key) | Signature public keys      |
| `challenge` | `number`                  | Challenge period (seconds) |

### key

Key option for `jwt`.

#### Properties

| Name    | Type     | Description                   |
| ------- | -------- | ----------------------------- |
| `kty`\* | `string` | Key type, e.g. `RSA` , `EC`   |
| `kid`\* | `string` | Key ID                        |
| `n`     | `string` | `RSA` `modulus`               |
| `e`     | `string` | `RSA` `exponent`              |
| `alg`   | `string` | `RSA` algorithm, e.g. `RS256` |
| `crv`   | `string` | `EC` curve name               |
| `x`     | `string` | `EC` point `x` coordinate     |
| `y`     | `string` | `EC` point `y` coordinate     |
