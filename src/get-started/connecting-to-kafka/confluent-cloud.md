# Confluent Cloud

## Introduction

In this guide, you will learn how to connect to Confluent Cloud from Zilla. You can get started with a fully working config [example](https://github.com/aklivity/zilla-examples/blob/main/http.kafka.cache/).

### Prerequisites

* Cluster Bootstrap server - see [Confluent Cloud Cluster Settings](https://docs.confluent.io/cloud/current/clusters/broker-config.html).
* API Keys(Key, Secret) - see [API Keys to Control Access](https://docs.confluent.io/cloud/current/access-management/authenticate/api-keys/api-keys.html).

## Confluent Cloud Parameters&#x20;

Confluent Cloud is exposed over `SASL_SSL` authentication protocols and the `Confluent Cloud` cluster is secured by a `TLS` server certificate that is provided by a public certificate authority.

For a better understanding of the `Zilla` config, please use a brief explanation of replaceable values :

| Value                       | Description                           |
| --------------------------- | ------------------------------------- |
| `API_KEY_KEY`               | The API key from Confluent Console    |
| `API_KEY_SECRET`            | The Secret key from Confluent Console |
| `BOOTSTRAP_SERVER_HOSTNAME` | Confluent Kafka hostname              |
| `BOOTSTRAP_SERVER_PORT`     | Confluent Kafka port number           |

Before we proceed further let's use the below command to verify connectivity to your Kafka.

```
kcat -b BOOTSTRAP_SERVER_HOSTNAME:BOOTSTRAP_SERVER_PORT \
-X security.protocol=sasl_ssl -X sasl.mechanisms=PLAIN \
-X sasl.username=API_KEY_KEY  -X sasl.password=API_KEY_SECRET  \
-L
```

## Configure Zilla

Let's configure `zilla.json`.

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
                    "username": "API_KEY_KEY",
                    "password": "API_KEY_SECRET"
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


::: info NOTE
SNI adds the domain name to the TLS handshake process so that the Zilla process reaches the right domain name and receives the correct SSL certificate.
:::

To test the above config you can follow instructions in the README from the [example](https://github.com/aklivity/zilla-examples/blob/main/http.kafka.cache/).
