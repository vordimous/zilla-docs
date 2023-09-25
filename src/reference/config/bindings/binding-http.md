---
shortTitle: http 
description: Zilla runtime http binding
category:
  - Binding
tag:
  - Server
---

# http Binding

Zilla runtime http binding.

```yaml {2}
http_server:
  type: http
  kind: server
  options:
    access-control:
      policy: cross-origin
    authorization:
      jwt:
        credentials:
          headers:
            authorization: Bearer {credentials}
  routes:
    - when:
        - headers:
            ":scheme": https
            ":authority": example.com:443
      exit: echo_server
```

## Summary

Defines a binding with `http` protocol support, with `server` or `client` behavior.

### Server behavior

The `server` kind `http` binding decodes `HTTP/1.1` protocol or `HTTP/2` protocol on the inbound network stream, producing higher level application streams for each request.

Cross-Origin Resource Sharing (CORS) is supported by specifying an access control policy of `cross-origin`. Further configuration allows for finer-grained access control including specific request origins, methods and headers allowed, and specific response headers exposed.

Authorization is enforced by a [`guard`](../../config/overview.md#guards) and the credentials can be extracted from a cookie, header or query parameter.

Conditional routes based on `http` request headers are used to route these application streams to an `exit` binding.

### Client behavior

The `client` kind `http` binding receives inbound application streams and encodes each request as a network stream via `HTTP/1.1` protocol. Note that the same network stream can be reused to encode multiple `HTTP/1.1` requests.

Conditional routes based on `http` request headers are used to route these network streams to an `exit` binding.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
- [options.versions](#options-versions)
- [options.access-control](#options-access-control)
  - [access-control.policy\*](#access-control-policy)
  - [access-control.policy (same-origin)](#access-control-policy-same-origin)
  - [access-control.policy (cross-origin)](#access-control-policy-cross-origin)
  - [access-control.allow](#access-control-allow)
    - [allow.origins](#allow-origins)
    - [allow.methods](#allow-methods)
    - [allow.headers](#allow-headers)
    - [allow.credentials](#allow-credentials)
  - [access-control.max-age](#access-control-max-age)
  - [access-control.expose](#access-control-expose)
    - [expose.headers](#expose-headers)
- [options.authorization](#options-authorization)
  - [authorization.credentials](#authorization-credentials)
    - [credentials.cookies](#credentials-cookies)
    - [credentials.headers](#credentials-headers)
    - [credentials.query](#credentials-query)
- [options.overrides](#options-overrides)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].headers](#when-headers)
- [routes\[\].exit\*](#routes-exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "server",  "client" ]

Behave as an `http` `server` or `client`.

### options

> `object`

`http`-specific options.

```yaml
options:
  access-control:
    policy: cross-origin
  authorization:
    jwt:
      credentials:
        headers:
          authorization: Bearer {credentials}
```

### options.versions

> `array` of `enum` [ "http/1.1", "h2" ]

Supported protocol versions.

### options.access-control

> **oneOf**: [same-origin](#access-control-policy-same-origin) | [cross-origin](#access-control-policy-cross-origin)

Access control policy for the `HTTP` protocol.

#### access-control.policy\*

> `enum` [ "same-origin" , "cross-origin" ]

Supported access control policies.

#### access-control.policy (same-origin)

> `string`

Extra properties aren't needed when using Same Origin access control for the `HTTP` protocol.

```yaml
options:
  access-control:
    policy: same-origin
```

#### access-control.policy (cross-origin)

> `object`

Additional properties that cover Cross Origin Resource Sharing (CORS) access control for the `HTTP` protocol.

```yaml
options:
  access-control:
    policy: cross-origin
```

#### access-control.allow

> `object`

Allowed cross-origin request origins, methods, headers and credentials.\
Defaults to all origins, methods and headers, without credentials.
CORS allowed request origins, methods, headers and credentials for the `HTTP` protocol.

##### allow.origins

> `array` of `string`

Allowed request origins.

##### allow.methods

> `array` of `string`

Allowed request methods.

##### allow.headers

> `array` of `string`

Allowed request headers.

##### allow.credentials

> `boolean`

Support `fetch` credentials mode `include`.

#### access-control.max-age

> `number`

Maximum cache age (in seconds) for allowed headers and methods.

#### access-control.expose

> `object`

Exposed cross-origin response headers.\
Defaults to all response headers.

##### expose.headers

> `array` of `string`

Exposed response headers.

### options.authorization

> `object` as map of named properties

Authorization by guard for the `HTTP/1.1` and `HTTP/2` protocols.

```yaml
authorization:
  jwt:
    credentials:
      headers:
        authorization: Bearer {credentials}
```

#### authorization.credentials

> `object`

Defines how to extract credentials from the HTTP request.

##### credentials.cookies

> `object` as map of `string`

Named cookie value pattern with `{credentials}`.

##### credentials.headers

> `object` as map of `string`

Named header value pattern with `{credentials}`, e.g. `"Bearer` `{credentials}"`.

##### credentials.query

> `object` as map of `string`

Named query parameter value pattern with `{credentials}`.

### options.overrides

> `object` of name-value header overrides

Request header overrides.

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: echo_server
```

### routes

> `array` of `object`

Conditional `http`-specific routes.

```yaml
routes:
  - when:
      - headers:
          ":scheme": https
          ":authority": example.com:443
    exit: echo_server
```

### routes[].guarded

> `object` as named map of `string:string` `array`

List of roles required by each named guard to authorize this route.

```yaml
routes:
  - guarded:
      test:
        - read:items
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.

```yaml
routes:
  - when:
      - headers:
          ":scheme": https
          ":authority": example.com:443
```

#### when[].headers

> `object` of name-value headers

Header name value pairs (all match).

### routes[].exit\*

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: echo_server
```

---

::: right
\* required
:::
