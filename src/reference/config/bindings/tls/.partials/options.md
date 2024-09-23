### options

> `object`

The `tls` specific options.

```yaml
options:
  keys:
  - localhost
  sni:
  - localhost
  alpn:
  - echo
```

#### options.version

> `string`

Protocol version.

#### options.keys

> `array` of `string`

A list of reference names for the Vault key.

#### options.trust

> `array` of `string`

A list of reference names for the Vault certificate.

#### options.signers

> `array` of `string`

A list of reference names for the Vault signer certificate.

#### options.trustcacerts

> `boolean`

Trust CA certificates. When the this property is not explicitly set it will be automatically set to `true` if [options.trust](#options-trust) is `null`.

#### options.sni

> `array` of `string`

A list of the Server Name Indications.

#### options.alpn

> `array` of `string`

Application protocols.

#### options.mutual

> `enum` [ `required`, `requested`, `none` ]

Mutual authentication. When the this property is not explicitly set it will be automatically set to `none` if [options.trust](#options-trust) is `null`, otherwise it will be set to `required`.
