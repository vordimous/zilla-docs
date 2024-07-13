---
description: How to connect to your own Confluent Cloud cluster from Zilla.
---

# Confluent Cloud

This is how to connect to Confluent Cloud from Zilla.

## Prerequisites

- Cluster Bootstrap server - see [Confluent Cloud Cluster Settings](https://docs.confluent.io/cloud/current/clusters/broker-config.html)
- API Keys(Key, Secret) - see [API Keys to Control Access](https://docs.confluent.io/cloud/current/access-management/authenticate/api-keys/api-keys.html)

Confluent Cloud is exposed over `SASL_SSL` authentication protocols and the `Confluent Cloud` cluster is secured by a TLS server certificate that is provided by a public certificate authority. The examples use the below Environment variables.

| Value                    | Description                               |
| ------------------------ | ----------------------------------------- |
| `KAFKA_API_KEY`          | The API key from Confluent Console        |
| `KAFKA_API_SECRET`       | The API key Secret from Confluent Console |
| `KAFKA_BOOTSTRAP_SERVER` | Confluent Cloud Bootstrap server endpoint |

Before we proceed further let's use the below command to verify connectivity to your Kafka.

```bash:no-line-numbers
kcat -b $KAFKA_BOOTSTRAP_SERVER \
-X security.protocol=sasl_ssl -X sasl.mechanisms=PLAIN \
-X sasl.username=$KAFKA_API_KEY -X sasl.password=$KAFKA_API_SECRET \
-L
```

## Configure Zilla

With working credentials you can connect with Zilla by adding these bindings.

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
        username: ${{env.KAFKA_API_KEY}}
        password: ${{env.KAFKA_API_SECRET}}
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

::: info NOTE
SNI adds the domain name to the TLS handshake process so that the Zilla process reaches the right domain name and receives the correct SSL certificate.
:::

To test the above config you can use it to add or replace the necessary bindings in the [http.kafka.sasl.scram example](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.sasl.scram).
