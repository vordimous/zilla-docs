# Connect your Kafka

## Introduction

In this guide, you will explore how to connect to your own Kafka from Zilla.&#x20;

A brief explanation of replaceable values from the config examples below:

| Value                       | Description                                                               |
| --------------------------- | ------------------------------------------------------------------------- |
| `TRUSTORE_PATH`             | The path to the `truststore` that stores CA cert that you want to trust.  |
| `TRUSTORE_PASSWORD`         | Truststore password.                                                      |
| `KEYSTORE_PATH`             | The path to the `keystore` that stores access key.                        |
| `KEYSTORE_PASSWORD`         | Keystore password.                                                        |
| `STORE_TYPE`                | KeyStore type such as `pkcs12`, `jceks`, and etc                          |
| `CA_CERT_ALIES`             | Unique string that identifies the certificate entry in the truststore.    |
| `SIGNED_CLIENT_CERT_ALIES`  | A unique string that identifies the key cert entry chain in the keystore. |
| `BOOTSTRAP_SERVER_HOSTNAME` | Target Kafka hostname.                                                    |
| `BOOTSTRAP_SERVER_PORT`     | Target Kafka port number.                                                 |
| `SASL_USERNAME`             | SASL authorization username.                                              |
| `SASL_PASSWORD`             | SASL authorization password.                                              |

## Connect to `PLAINTEXT` Kafka

To connect to any Kafka on **PLAINTEXT** protocol is as simple as defining your TCP binding as shown below.

#### zilla.json

```json
{
    "bindings":
    {
        ...
        "kafka_client0":
        {
            "type" : "kafka",
            "kind": "client",
            "exit": "tcp_client0"
        },
        "tcp_client0":
        {
            "type" : "tcp",
            "kind": "client",
            "options":
            {
                "host": "BOOTSTRAP_SERVER_HOSTNAME",
                "port": BOOTSTRAP_SERVER_PORT
            },
            "routes":
            [
                {
                    "when":
                    [
                        {
                            "cidr": "0.0.0.0/0"
                        }
                    ]
                }
            ]
        }
     }     
}
```


As usual, you need to define the host and port and flush the data to the network. For the full working config please take a look at this [example](https://github.com/aklivity/zilla-examples/blob/main/http.kafka.cache/).

## Connect to Kafka over `TLS/SSL`

By default, Kafka communicates in `PLAINTEXT`, which means that all data is sent without encryption.  However, Kafka running in production needs to expose only a secure connection that encrypts communication, and you should therefore configure Zilla to use TLS/SSL encrypted communication.

If the `Kafka` cluster is secured by a `TLS` server certificate that is provided by a public certificate authority, then configure `Zilla` add a `TLS` client binding as shown below with the `trustcacerts` option to set to `true`.

::: info NOTE
The `exit` from `kafka_client0` binding now changes to `tls_client0`.
:::

#### zilla.json

```json
{
    "bindings":
    {
        ...
        "kafka_client0":
        {
            "type" : "kafka",
            "kind": "client",
            "exit": "tls_client0"
        },
        "tls_client0":
        {
            "type" : "tls",
            "kind": "client",
            "options":
            {
                "trustcacerts": true
                "sni": ["BOOTSTRAP_SERVER_HOSTNAME"]
            },
            "exit": "tcp_client0"
        },
        "tcp_client0":
        {
            "type" : "tcp",
            "kind": "client",
            "options":
            {
                "host": "BOOTSTRAP_SERVER_HOSTNAME",
                "port": BOOTSTRAP_SERVER_PORT
            },
            "routes":
            [
                {
                    "when":
                    [
                        {
                            "cidr": "0.0.0.0/0"
                        }
                    ]
                }
            ]
        }
    }
}
```


However, if the `Kafka` cluster is secured by a `TLS` server certificate that is signed by a private certificate authority then you need to add a `vault` [config](https://docs.aklivity.io/zilla/reference/zilla.json/vault-filesystem) to provide access to certificates needed by the `TLS` client binding.

#### zilla.json

```json
{
    "vaults":
    {
        "client_vault":
        {
            "type": "filesystem",
            "options":
            {
                "trust":
                {
                    "store": "TRUSTORE_PATH",
                    "type": "STORE_TYPE",
                    "password": "TRUSTORE_PASSWORD"
                }
            }
        }
    },
    "bindings":
    {
        ...
        "kafka_client0":
        {
            "type" : "kafka",
            "kind": "client",
            "exit": "tls_client0"
        },
        "tls_client0":
        {
            "type" : "tls",
            "kind": "client",
            "vault": "client_vault",
            "options":
            {    
                "trust": ["CA_CERT_ALIAS"],
                "sni": ["BOOTSTRAP_SERVER_HOSTNAME"]
            },
            "exit": "tcp_client0"
        },
        "tcp_client0":
        {
            "type" : "tcp",
            "kind": "client",
            "options":
            {
                "host": "BOOTSTRAP_SERVER_HOSTNAME",
                "port": BOOTSTRAP_SERVER_PORT
            },
            "routes":
            [
                {
                    "when":
                    [
                        {
                            "cidr": "0.0.0.0/0"
                        }
                    ]
                }
            ]
        }
    }
}
```


## Connect to Kafka over `TLS/SSL` using client certificates

Next, you will explore how to connect to `Kafka` cluster over `TLS/SSL` using client certificates.

The following items need to be prepared:

* `truststore.p12` -  contains the trusted server certificates or certificate authorities
* `keystore.p12` -  contains the signed client certificates

Kafka clients connecting to Kafka clusters that are configured for `TLS mutual authentication` require three files; a `Client Key`, a `Client Certificate`, and a `CA Certificate`.

You can use the scripts shown below to generate `truststore.p12` and `keystore.p12` files using the three files.


::: code-tabs#shell

@tab truststore.p12

```bash
keytool -import -file ca.pem -alias YOUR_KAFKA_SIGNED_CLIENT_CERT_ALIAS \
        -keystore truststore.p12
```

@tab keystore.p12

```bash
openssl pkcs12 -export -in service.cert -inkey service.key
    -out keystore.p12 -name YOUR_KAFKA_CA_CERT_ALIAS \
    -CAfile ca.pem
```

:::

You also need to configure a `vault`  with `truststore` and `keystore`, then reference the vault in the `tls_client0` binding.

#### zilla.json

```json
{
    "vaults":
    {
        "client_vault":
        {
            "type": "filesystem",
            "options":
            {
                "trust":
                {
                    "store": "TRUSTORE_PATH",
                    "type": "STORE_TYPE",
                    "password": "TRUSTORE_PASSWORD"
                },
                "keys":
                {
                    "store": "KEYSTORE_PATH",
                    "type": "STORE_TYPE",
                    "password": "KEYSTORE_PASSWORD"
                }
            }
        }
    },
    "bindings":
    {
        ...
        "kafka_client0":
        {
            "type" : "kafka",
            "kind": "client",
            "exit": "tls_client0"
        },
        "tls_client0":
        {
            "type" : "tls",
            "kind": "client",
            "vault": "client_vault",
            "options":
            {    
                "trust": ["CA_CERT_ALIAS"],
                "keys": ["SIGNED_CLIENT_CERT_ALIAS"],
                "sni": ["BOOTSTRAP_SERVER_HOSTNAME"]
            },
            "exit": "tcp_client0"
        },
        "tcp_client0":
        {
            "type" : "tcp",
            "kind": "client",
            "options":
            {
                "host": "BOOTSTRAP_SERVER_HOSTNAME",
                "port": BOOTSTRAP_SERVER_PORT
            },
            "routes":
            [
                {
                    "when":
                    [
                        {
                            "cidr": "0.0.0.0/0"
                        }
                    ]
                }
            ]
        }
    }
}
```


::: info NOTE
SNI adds the domain name to the TLS handshake process so that the Zilla process reaches the right domain name and receives the correct SSL certificate.
:::

## Connect to Kafka over SASL

Apache Kafka brokers support client authentication using SASL. SASL authentication can be enabled concurrently with TLS/SSL encryption.

Apache Kafka supports the following SASL mechanisms are:

* GSSAPI (Kerberos authentication)
* OAUTHBEARER
* SCRAM
* PLAIN
* Delegation Tokens
* LDAP

::: info NOTE
Zilla currently supports SASL PLAIN authentication to Kafka.

Please add your feedback to the [SASL enhancement request](https://github.com/aklivity/zilla/issues/12).&#x20;
:::

Let's configure zilla.json.

#### zilla.json

```json
{
    "bindings":
    {
        ...
        "kafka_client0":
        {
            "type" : "kafka",
            "kind": "client",
            "exit": "tls_client0",
            "options":
            {
                "sasl": 
                {
                    "mechanism": "plain",
                    "username": "SASL_USERNAME",
                    "password": "SASL_PASSWORD"
                }
            }
        },
        "tls_client0":
        {
            "type" : "tls",
            "kind": "client",
            "options":
            {
                "trustcacerts": true
                "sni": ["BOOTSTRAP_SERVER_HOSTNAME"]
            },
            "exit": "tcp_client0"
        },
        "tcp_client0":
        {
            "type" : "tcp",
            "kind": "client",
            "options":
            {
                "host": "BOOTSTRAP_SERVER_HOSTNAME",
                "port": BOOTSTRAP_SERVER_PORT
            },
            "routes":
            [
                {
                    "when":
                    [
                        {
                            "cidr": "0.0.0.0/0"
                        }
                    ]
                }
            ]
        }
    }
}
```


To test the above config you can follow instructions in the README from the [example](https://github.com/aklivity/zilla-examples/blob/main/http.kafka.cache/).
