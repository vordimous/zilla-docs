---
shortTitle: tls 
description: Zilla runtime tls binding
category:
  - Binding
tag:
  - Server
---

# tls Binding

Zilla runtime tls binding.

```yaml {2}
tls_server:
  type: tls
  kind: server
  vault: server
  options:
    keys:
      - localhost
    sni:
      - localhost
    alpn:
      - echo
  routes:
    - when:
        - alpn: echo
    exit: echo_server
```

## Summary

Defines a binding with `tls` protocol support, with `server`, `client` or `proxy` behavior.

### Server behavior

The `server` kind tls binding decodes encrypted `TLS` protocol on the inbound network stream, producing higher level cleartext application streams for each request.

Certificates and keys required to complete the `TLS` handshake are provided by a `vault` referenced in the binding configuration.

Conditional routes based on `tls` hostname authority or negotiated ALPN protocol are used to route these streams to an `exit` binding.

### Client behavior

The `client` kind `tls` binding receives inbound application streams and encodes each as an encrypted network stream via `TLS` protocol.

Certificates and keys required to complete the `TLS` handshake are provided by a `vault` referenced in the binding configuration.

Conditional routes based on `tls` hostname authority or negotiated ALPN protocol are used to route these streams to an `exit` binding.

### Proxy behavior

The `proxy` kind `tls` binding detects `ClientHello` `server_name` extension to provide TLS virtual hosting by routing based on server name.

A `vault` is not required to proxy `TLS` protocol as the handshake is only observed read-only as it routes through the `tls` `proxy` binding.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [vault](#vault)
- [options](#options)
- [options.version](#options-version)
- [options.keys](#options-keys)
- [options.trust](#options-trust)
- [options.signers](#options-signers)
- [options.trustcacerts](#options-trustcacerts)
- [options.sni\*](#options-sni)
- [options.alpn](#options-alpn)
- [options.mutual](#options-mutual)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].authority](#when-authority)
  - [when\[\].alpn](#when-alpn)
- [routes\[\].exit\*](#routes-exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "client", "server", "proxy" ]

Behave as a `tls` `client`, `server` or `proxy`.

### vault

> `string`

Vault name.

### options

> `object`

`tls`-specific options.

```yaml
options:
  keys:
  - localhost
  sni:
  - localhost
  alpn:
  - echo
```

### options.version

> `string`

Protocol version.

### options.keys

> `array` of `string`

Vault key refs.

### options.trust

> `array` of `string`

Vault certificate refs.

### options.signers

> `array` of `string`

Vault signer certificate refs.

### options.trustcacerts

> `boolean`

Trust CA certificates.

### options.sni\*

> `array` of `string`

Server names.

### options.alpn

> `array` of `string`

Application protocols.

### options.mutual

> `enum` [ "required", "requested", "none" ]

Mutual authentication\
Defaults to `"none"`.

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: echo_server
```

### routes

> `array` of `object`

Conditional `tls`-specific routes.

```yaml
routes:
  - when:
      - alpn: echo
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
      - alpn: echo
```

#### when[].authority

> `string`

Associated authority.

#### when[].alpn

> `string`

Application protocol.

### routes[].exit\*

> `string`

Next binding when following this route.

```yaml
exit: echo_server
```

---

::: right
\* required
:::
