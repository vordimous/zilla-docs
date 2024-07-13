---
description: How to connect to your own Amazon MSK from Zilla.
---

# Redpanda

This is how to connect to Redpanda from Zilla. The examples use the below Environment variables.

| Environment variable     | Description                              |
| ------------------------ | ---------------------------------------- |
| `SASL_USERNAME`          | The SASL username for Redpanda           |
| `SASL_PASSWORD`          | The SASL password for Redpanda           |
| `KAFKA_BOOTSTRAP_SERVER` | Redpanda Kafka Bootstrap server endpoint |

Before we proceed further let's use the below command to verify connectivity to your Kafka.

```bash:no-line-numbers
kcat -b $KAFKA_BOOTSTRAP_SERVER \
-X security.protocol=sasl_ssl -X sasl.mechanisms=PLAIN \
-X sasl.username=$SASL_USERNAME -X sasl.password=$SASL_PASSWORD \
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
        mechanism: scram-sha-256
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

::: info NOTE
SNI adds the domain name to the TLS handshake process so that the Zilla process reaches the right domain name and receives the correct SSL certificate.
:::

To test the above SASL config you can try out the [http.redpanda.sasl.scram example](https://github.com/aklivity/zilla-examples/tree/main/http.redpanda.sasl.scram).
