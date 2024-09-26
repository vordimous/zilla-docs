---
shortTitle: server
---

# http server

The http server binding decodes `HTTP/1.1` protocol or `HTTP/2` protocol on the inbound network stream, producing higher level application streams for each request.

Cross-Origin Resource Sharing (CORS) is supported by specifying an access control policy of `cross-origin`. Further configuration allows for finer-grained access control including specific request origins, methods and headers allowed, and specific response headers exposed.

Authorization is enforced by a [`guard`](../../../config/overview.md#guards) and the credentials can be extracted from a cookie, header or query parameter.

Conditional routes based on `http` request headers are used to route these application streams to an `exit` binding.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## Configuration (\* required)

### options

> `object`

The `server` specific options.

```yaml
options:
  access-control:
    policy: cross-origin
  authorization:
    my_jwt_guard:
      credentials:
        headers:
          authorization: Bearer {credentials}
  overrides:
    custom-text: custom-value
```

<!-- @include: ./.partials/options.md -->

#### options.access-control

> `object`

Defines the [same-origin](#access-control-policy-same-origin) or [cross-origin](#access-control-policy-cross-origin) access control policy for the `HTTP` protocol.

#### access-control.policy

> `enum` [ `same-origin`, `cross-origin` ] | Default: `same-origin`

Supported access control policies.

#### access-control.policy: same-origin

> `const`

Extra properties aren't needed when using Same Origin access control for the `HTTP` protocol.

```yaml
options:
  access-control:
    policy: same-origin
```

#### access-control.policy: cross-origin

> `const`

Additional properties that cover Cross Origin Resource Sharing (CORS) access control for the `HTTP` protocol.

```yaml
options:
  access-control:
    policy: cross-origin
```

#### access-control.allow

> `object`

Sets the CORS allowed request origins, methods, headers and credentials for the `HTTP` protocol.

::: important
Omission of the allow object means Zilla will allow all origins, methods and headers, without credentials.
:::

#### allow.origins

> `array` of `string`

Allowed request origins. Omission of this property is considered allow all `*`.

#### allow.methods

> `array` of `string`

Allowed request methods. Omission of this property is considered allow all `*`.

#### allow.headers

> `array` of `string`

Allowed request headers. Omission of this property is considered allow all `*`.

#### allow.credentials

> `boolean`

Support `fetch` credentials mode `include`.

#### access-control.max-age

> `integer`

Maximum cache age (in seconds) for allowed headers and methods.

#### access-control.expose

> `object`

Exposed cross-origin response headers.

::: important
Omission means all response headers.
:::

#### expose.headers

> `array` of `string`

Exposed response headers.

#### options.authorization

> `object` as map of named `object` properties

Authorization by a named guard for the `HTTP/1.1` and `HTTP/2` protocols.

```yaml
authorization:
  my_jwt_guard:
    credentials:
      headers:
        authorization: Bearer {credentials}
```

<!-- @include: ../.partials/options-http-auth.md -->

<!-- @include: ./.partials/routes.md -->
<!-- @include: ../.partials/exit.md -->
<!-- @include: ../.partials/telemetry-http.md -->
