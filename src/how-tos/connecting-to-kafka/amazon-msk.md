---
description: Unlike other hosted Kafka services, Amazon MSK is not readily reachable over the internet
---
# Amazon MSK

## Introduction

Unlike other hosted Kafka services, Amazon MSK is not readily reachable over the internet. As a result, unless Zilla is deployed in the same VPC in which MSK is running, you will first need to make your cluster publicly accessible.

### Enable MSK Public Access

"Public Access" can be turned on for MSK clusters running Apache Kafka 2.6.0 or later. Follow the MSK [Public Access Guide](https://docs.aws.amazon.com/msk/latest/developerguide/public-access.html)to do so.

::: warning
MSK's “Public Access” feature directly exposes your brokers to the internet, which may present additional security concerns. An alternative and more flexible solution is the [Zilla Plus (Public MSK Proxy)](https://docs.aklivity.io/aws/get-started/public-proxy). The Proxy is deployed via a CloudFormation template, and acts as intermediary that securely routes connectivity between external clients and MSK brokers without having to modify the brokers.
:::

## Set up mTLS Authentication between MSK and Zilla

Once your MSK cluster is reachable over the internet, it will rely on Mutual TLS to authenticate external clients. Setting up `mTLS` between MSK and Zilla is done in three steps:

1. Create a trusted Client Certificate in Amazon Certificate Manager (ACM).
2. Export the Client Certificate as well as the Certificate Authority (CA) Certificate.
3. Create a PKCS12 KeyStore containing the exported certificates that will be referenced by Zilla to complete the `mTLS` handshake with your MSK cluster.

::: info NOTE
If you deployed the Zilla Plus (Public MSK Proxy), then you should already have a Client Certificate that Zilla can use and you can go straight to the second step.
:::

### Create a Client Certificate

Follow the [Create Client Certificate (ACM) guide](https://docs.aklivity.io/aws/resources/create-client-certificate-acm#issue-the-signed-certificate). Upon completion you will have created a client certificate inside ACM and should have a local `client-1.key.pem` file containing the client certificate's RSA key as well as the `ARN` of the certificate.

### Export Client and CA Certificates

First, you will export the Client Certificate to a local file called `client.cert`. To do this you will need the `ARN` of the client certificate as well as of the [certificate authority](https://docs.aklivity.io/aws/resources/create-certificate-authority-acm) used to issue the certificate, and run the following command:

```bash:no-line-numbers
aws acm-pca get-certificate --certificate-authority-arn CERTIFICATE_AUTHORITY_ARN \
  --certificate-arn CERTIFICATE_ARN --output text
```

#### output

```output:no-line-numbers
----BEGIN CERTIFICATE-----
MIIEdzCCA1+gAwIBAgIQDLtFK9uDUb6VpObjhusyhTANBgkqhkiG9w0BAQsFADAS
......
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIC8TCCAdmgAwIBAgIRAIxnMlRU8x8CasAlsfpjghQwDQYJKoZIhvcNAQELBQAw
......
-----END CERTIFICATE-----
```

Copy first certificate and save it as `client.cert`

#### client.cert

```output:no-line-numbers
----BEGIN CERTIFICATE-----
MIIEdzCCA1+gAwIBAgIQDLtFK9uDUb6VpObjhusyhTANBgkqhkiG9w0BAQsFADAS
......
-----END CERTIFICATE-----
```

Next, you will export the CA Certificate.

Log into your AWS Certificate Manager Private Certificate Authority and under "Additional Information" export the certificate body to a file called `ca.pem`

![Export the CA Certificate](/assets/pca-ca-cert.png)

### Create a PKCS12 KeyStore

To create the KeyStore you will need a signed client certificate alias. It is best to use one of your MSK cluster's `bootstrap server names`.

![chose one of the bootstrap server names such as b-1.xxx.xxx.kafka-use-east.amazonaws.com:9094](/assets/bootstrap-server-names.png)

With the `bootstrap server name` in hand, run the following command to create the `keystore.p12` file:

#### keystore.p12

```bash:no-line-numbers
openssl pkcs12 -export -in client.cert -inkey client-1.key.pem \
               -out keystore.p12 -name SIGNED_CLIENT_CERT_ALIES \
               -CAfile ca.pem
```

## Configure Zilla

To configure Zilla you will be replacing the following values in the `zilla.yaml` config:

| Value                       | Description                                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `KEYSTORE_PATH`             | The path to the local `keystore.p12` file that was generated above.                                                              |
| `KEYSTORE_PASSWORD`         | Keystore password to `keystore.p12`  file that was generated above.                                                              |
| `STORE_TYPE`                | Keystore types such as `pkcs12`, `jceks`, and etc                                                                                |
| `SIGNED_CLIENT_CERT_ALIAS`  | A unique string that identifies the key cert entry chain in the `keystore.p12`. For example, use the MSK bootstrap server name.  |
| `BOOTSTRAP_SERVER_HOSTNAME` | Target MSK hostname. For example: `b-2-public.myTestCluster.v4ni96.c2.kafka.us-east-1.amazonaws.com`                             |
| `BOOTSTRAP_SERVER_PORT`     | Target MSK port number. For example `9094`                                                                                       |

Inside `zilla.yaml` create a `client_vault` that references your newly created `keystore`. After this, reference the the vault in the `tls_client` binding. Your `zilla.yaml` should appear as follows:

### zilla.yaml

::: code-tabs#yaml

@tab zilla.yaml

```yaml
vaults:
  client_vault:
    type: filesystem
    options:
      keys:
        store: KEYSTORE_PATH
        type: STORE_TYPE
        password: KEYSTORE_PASSWORD
bindings:
  kafka_client:
    type: kafka
    kind: client
    exit: tls_client
  tls_client:
    type: tls
    kind: client
    vault: client_vault
    options:
      trustcacerts: true
      keys:
        - SIGNED_CLIENT_CERT_ALIAS
      sni:
        - BOOTSTRAP_SERVER_HOSTNAME
    exit: tcp_client
  tcp_client:
    type: tcp
    kind: client
    options:
      host: BOOTSTRAP_ SERVER_HOSTNAME
      port: BOOTSTRAP_SERVER_PORT
    routes:
      - when:
          - cidr: 0.0.0.0/0

```

:::

::: info NOTE
SNI adds the domain name to the TLS handshake process so that the Zilla process reaches the right domain name and receives the correct SSL certificate.
:::

Your Zilla can now connect to your MSK cluster! You can test your configuration by placing it into the `zilla.yaml` of the following Zilla [example](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.cache) and running it as per the instructions.
