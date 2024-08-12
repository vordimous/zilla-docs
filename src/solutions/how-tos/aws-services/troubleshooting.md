---
description: Common errors and how to handle them
---

# Troubleshooting

::: note Table of contents

- [Why does CloudFormation stack creation timeout and rollback?](#why-does-cloudformation-stack-creation-timeout-and-rollback)
- [Why does my SSH client reject access to the Zilla proxy instances?](#why-does-my-ssh-client-reject-access-to-the-zilla-proxy-instances)
- [Why does my SSH client timeout when attempting to access the Zilla proxy instances?](#why-does-my-ssh-client-timeout-when-attempting-to-access-the-zilla-proxy-instances)
- [Why does the `zilla-plus` service keep restarting on the Zilla proxy instances?](#why-does-the-zilla-plus-service-keep-restarting-on-the-zilla-proxy-instances)
- [Why does my Kafka Client fail to connect via Zilla proxy?](#why-does-my-kafka-client-fail-to-connect-via-zilla-proxy)

:::

## Why does CloudFormation stack creation timeout and rollback?

The CloudFormation stack will timeout if the launched instances are unable to call back to CloudFormation via the internet during deployment.

This can occur if the target VPC has no attached Internet Gateway, or if the main Route Table for the VPC has not been updated to add a default route to the Internet Gateway.

Make sure to [attach the Internet Gateway](./create-vpc.md#attach-the-internet-gateway) and [route to the Internet Gateway](./create-vpc.md#route-to-the-internet-gateway), then try again.

## Why does my SSH client reject access to the Zilla proxy instances?

The SSH client will actively reject unauthorized connection attempts to the Zilla proxies.

This can occur if you are not using the same Launch Key as specified during CloudFormation stack creation.

This can occur if you are not using the `ec2-user` username to login via SSH.

Try again, making sure to use the same Launch Key as specified during CloudFormation stack creation, and the username `ec2-user`.

## Why does my SSH client timeout when attempting to access the Zilla proxy instances?

The SSH client will timeout if some or all of the network traffic is being dropped between the launched Zilla proxies and the SSH client.

This can occur if the target VPC has no attached Internet Gateway, or if the main Route Table for the VPC has not been updated to add a default route to the Internet Gateway.

Make sure to [attach the Internet Gateway](./create-vpc.md#attach-the-internet-gateway) and [route to the Internet Gateway](./create-vpc.md#route-to-the-internet-gateway), then try again.

## Why does the `zilla-plus` service keep restarting on the Zilla proxy instances?

This can occur if the IAM Role associated with your Zilla proxies has insufficient privileges to use the AWS Services needed by Zilla proxy.

Check the policies attached to your Zilla proxy instance IAM Role based on the deployment type, then try again.

- Zilla proxy
  - [via SASL/SCRAM](../amazon-msk/secure-public-access/development.md#create-the-zilla-proxy-iam-security-role)
  - [via mTLS](../amazon-msk/secure-public-access/production.md#create-the-zilla-proxy-iam-security-role)
  - [via Unauthorized access)](../amazon-msk/secure-public-access/production-mutual-tls.md#create-the-zilla-proxy-iam-security-role)

## Why does my Kafka Client fail to connect via Zilla proxy?

This can occur if the DNS names are not setup correctly to point to the NLB Load Balancer deployed via a provided CloudFormation template, or if the `client.properties` file is not configured to use the correct `keystore` or `truststore`.

Make sure your DNS and `client.properties` are configured correctly, then try again.

You can verify TCP connectivity using the following command:

```bash:no-line-numbers
nc -v <b-1-broker-dns-name> 9094
```

The `nc` output should be as shown below:

```output:no-line-numbers
Connection to <b-1-broker-dns-name> port 9094 [tcp/*] succeeded!
```

Also, `nc` should stay connected.

You can verify TLS connectivity with client key and signed client certificate using the following command:

```bash:no-line-numbers
openssl s_client \
-connect <b-1-broker-dns-name>:9094 \
-servername <b-1-broker-dns-name> \
-cert client.cert \
-key client.key.pem
```

Note: if you followed [Create Server Certificate](./create-server-certificate-acm.md) to create the server certificate instead of [Create Server Certificate (LetsEncrypt)](./create-server-certificate-letsencrypt.md), then you will need to [Export the CA Certificate](./create-certificate-authority-acm.md#export-the-ca-certificate) and have `openssl` trust the exported CA certificate.

```bash:no-line-numbers
openssl s_client \
-connect <b-1-broker-dns-name>:9094 \
-servername <b-1-broker-dns-name> \
-cert client.cert \
-key client.key.pem
-CAfile Certificate.pem
```

The `openssl` output should be as shown below:

```output:no-line-numbers
...
    Verify return code: 0 (ok)
---
```

Note: if the client-to-proxy TLS handshake is configured correctly, then `openssl` will not show an error, instead the TLS handshake will complete successfully and stay connected.

Note: If the backend TLS handshake from proxy-to-msk fails for any reason, then the `openssl` command will disconnect after handshake without an `openssl` error code.

You can verify Kafka connectivity with client key and signed client certificate using the following command:

```bash:no-line-numbers
kcat \
-L \
-b <b-1-broker-dns-name>:9094 \
-X security.protocol=ssl \
-X ssl.certificate.location=client.cert \
-X ssl.key.location=client.key.pem
```

Note: if you followed [Create Server Certificate](./create-server-certificate-acm.md) to create the server certificate instead of [Create Server Certificate (LetsEncrypt)](./create-server-certificate-letsencrypt.md), then you will need to [Export the CA Certificate](./create-certificate-authority-acm.md#export-the-ca-certificate) and have `kcat` trust the exported CA certificate.

```bash:no-line-numbers
kcat \
-L \
-b <b-1-broker-dns-name>:9094 \
-X security.protocol=ssl \
-X ssl.certificate.location=client.cert \
-X ssl.key.location=client.key.pem \
-X ssl.ca.location=Certificate.pem
```

The `kcat` output should show the list of brokers and topics accessible to the client.
