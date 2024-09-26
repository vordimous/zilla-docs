#### tls.version

> `string`

Protocol version.

#### tls.keys

> `array` of `string`

A list of reference names for the Vault key.

#### tls.trust

> `array` of `string`

A list of reference names for the Vault certificate.

#### tls.signers

> `array` of `string`

A list of reference names for the Vault signer certificate.

#### tls.trustcacerts

> `boolean`

Trust CA certificates. When the this property is not explicitly set it will be automatically set to `true` if [tls.trust](#tls-trust) is `null`.

#### tls.sni

> `array` of `string`

A list of the Server Name Indications.

#### tls.alpn

> `array` of `string`

Application protocols.

#### tls.mutual

> `enum` [ `required`, `requested`, `none` ]

Mutual authentication. When the this property is not explicitly set it will be automatically set to `none` if [tls.trust](#tls-trust) is `null`, otherwise it will be set to `required`.
