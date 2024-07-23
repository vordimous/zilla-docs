---
description: How to connect to your own Apache Kafka from Zilla.
---

# Apache Kafka

This is how to connect to your own Apache Kafka from Zilla. The examples use the below Environment variables.

| Environment variable       | Description                                                               |
| -------------------------- | ------------------------------------------------------------------------- |
| `TRUSTORE_PATH`            | The path to the `truststore` that stores CA cert that you want to trust.  |
| `TRUSTORE_TYPE`            | KeyStore type such as `pkcs12`, `jceks`, and etc                          |
| `TRUSTORE_PASSWORD`        | Truststore password.                                                      |
| `KEYSTORE_PATH`            | The path to the `keystore` that stores access key.                        |
| `KEYSTORE_TYPE`            | KeyStore type such as `pkcs12`, `jceks`, and etc                          |
| `KEYSTORE_PASSWORD`        | Keystore password.                                                        |
| `CA_CERT_ALIES`            | Unique string that identifies the certificate entry in the truststore.    |
| `SIGNED_CLIENT_CERT_ALIES` | A unique string that identifies the key cert entry chain in the keystore. |
| `KAFKA_BOOTSTRAP_SERVER`   | Target Kafka Bootstrap server.                                            |
| `SASL_USERNAME`            | SASL authorization username.                                              |
| `SASL_PASSWORD`            | SASL authorization password.                                              |

## Configure Zilla for

### PLAINTEXT Kafka

To connect to any Kafka using the `PLAINTEXT` protocol is as simple as defining your TCP binding as shown below.

::: code-tabs#yaml

@tab zilla.yaml

```yaml
bindings:
...
  south_kafka_client:
    type: kafka
    kind: client
    options:
      servers:
        - ${{env.KAFKA_BOOTSTRAP_SERVER}}
    exit: south_tcp_client
  south_tcp_client:
    type: tcp
    kind: client
```

:::

As usual, you need to define the host and port and flush the data to the network. For the full working config please take a look at the [http.kafka.cache example](https://github.com/aklivity/zilla-examples/blob/main/http.kafka.cache/).

### Kafka over TLS/SSL

By default, Kafka communicates in `PLAINTEXT`, which means that all data is sent without encryption. However, Kafka running in production needs to expose only a secure connection that encrypts communication, and you should therefore configure Zilla to use TLS/SSL encrypted communication.

If the `Kafka` cluster is secured by a TLS server certificate that is provided by a public certificate authority, then configure Zilla add a TLS client binding as shown below with the `trustcacerts` option to set to `true`.

::: info NOTE
The `exit` from `south_kafka_client` binding now changes to `south_tls_client`.
:::

::: code-tabs#yaml

@tab zilla.yaml

```yaml
bindings:
...
  south_kafka_client:
    type: kafka
    kind: client
    options:
      servers:
        - ${{env.KAFKA_BOOTSTRAP_SERVER}}
    exit: south_tls_client
  south_tls_client:
    type: tls
    kind: client
    exit: south_tcp_client
  south_tcp_client:
    type: tcp
    kind: client
```

:::

However, if the `Kafka` cluster is secured by a TLS server certificate that is signed by a private certificate authority then you need to add a `vault` [config](../../reference/config/vaults/vault-filesystem.md) to provide access to certificates needed by the TLS client binding.

::: code-tabs#yaml

@tab zilla.yaml

```yaml
vaults:
  client_vault:
    type: filesystem
    options:
      trust:
        store: ${{env.TRUSTORE_PATH}}
        type: ${{env.STORE_TYPE}}
        password: ${{env.TRUSTORE_PASSWORD}}
bindings:
...
  south_kafka_client:
    type: kafka
    kind: client
    options:
      servers:
        - ${{env.KAFKA_BOOTSTRAP_SERVER}}
    exit: south_tls_client
  south_tls_client:
    type: tls
    kind: client
    vault: client_vault
    options:
      trust:
        - ${{env.CA_CERT_ALIAS}}
    exit: south_tcp_client
  south_tcp_client:
    type: tcp
    kind: client
```

:::

However, if the `Kafka` cluster is secured by a TLS server certificate that is signed by a private certificate authority then you need to add a `vault` [config](../../reference/config/vaults/vault-filesystem.md) to provide access to certificates needed by the TLS client binding.

To test the above config you can use it to add or replace the necessary bindings in the [http.kafka.sasl.scram example](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.sasl.scram).

### Kafka over TLS/SSL using client certificates

Next, you will explore how to connect to `Kafka` cluster over `TLS/SSL` using client certificates.

The following items need to be prepared:

- `truststore.p12` - contains the trusted server certificates or certificate authorities
- `keystore.p12` - contains the signed client certificates

Kafka clients connecting to Kafka clusters that are configured for `TLS mutual authentication` require three files; a `Client Key`, a `Client Certificate`, and a `CA Certificate`.

You can use the scripts shown below to generate `truststore.p12` and `keystore.p12` files using the three files.

::: code-tabs#bash

@tab truststore.p12

```bash:no-line-numbers
keytool -import -file ca.pem -alias YOUR_KAFKA_SIGNED_CLIENT_CERT_ALIAS \
-keystore truststore.p12
```

@tab keystore.p12

```bash:no-line-numbers
openssl pkcs12 -export -in service.cert -inkey service.key
-out keystore.p12 -name YOUR_KAFKA_CA_CERT_ALIAS \
-CAfile ca.pem
```

:::

You also need to configure a `vault` with `truststore` and `keystore`, then reference the vault in the `south_tls_client` binding.

::: code-tabs#yaml

@tab zilla.yaml

```yaml
vaults:
  client_vault:
    type: filesystem
    options:
      trust:
        store: ${{env.TRUSTORE_PATH}}
        type: ${{env.TRUSTORE_TYPE}}
        password: ${{env.TRUSTORE_PASSWORD}}
      keys:
        store: ${{env.KEYSTORE_PATH}}
        type: ${{env.KEYSTORE_TYPE}}
        password: ${{env.KEYSTORE_PASSWORD}}
bindings:
...
  south_kafka_client:
    type: kafka
    kind: client
    options:
      servers:
        - ${{env.KAFKA_BOOTSTRAP_SERVER}}
    exit: south_tls_client
  south_tls_client:
    type: tls
    kind: client
    vault: client_vault
    options:
      trust:
        - ${{env.CA_CERT_ALIAS}}
      keys:
        - ${{env.SIGNED_CLIENT_CERT_ALIAS}}
    exit: south_tcp_client
  south_tcp_client:
    type: tcp
    kind: client
```

:::

::: info NOTE
SNI adds the domain name to the TLS handshake process so that the Zilla process reaches the right domain name and receives the correct SSL certificate.
:::

To test the above config you can use it to add or replace the necessary bindings in the [http.kafka.sasl.scram example](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.sasl.scram).

### Kafka over SASL

Apache Kafka brokers support client authentication using SASL. SASL authentication can be enabled concurrently with TLS/SSL encryption.

Apache Kafka supports the following SASL mechanisms are:

- GSSAPI (Kerberos authentication)
- OAUTHBEARER
- SCRAM
- PLAIN
- Delegation Tokens
- LDAP

::: info NOTE
Zilla currently supports SASL PLAIN authentication to Kafka.

Please add your feedback to the [SASL enhancement request](https://github.com/aklivity/zilla/issues/12).
:::

::: code-tabs#yaml

@tab zilla.yaml

```yaml
bindings:
...
  south_kafka_client:
    type: kafka
    kind: client
    options:
      servers:
        - ${{env.KAFKA_BOOTSTRAP_SERVER}}
      sasl:
        mechanism: plain
        username: ${{env.SASL_USERNAME}}
        password: ${{env.SASL_PASSWORD}}
    exit: south_tls_client
  south_tls_client:
    type: tls
    kind: client
    exit: south_tcp_client
  south_tcp_client:
    type: tcp
    kind: client
```

:::

To test the above SASL config you can try out the  [http.kafka.sasl.scram example](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.sasl.scram).
