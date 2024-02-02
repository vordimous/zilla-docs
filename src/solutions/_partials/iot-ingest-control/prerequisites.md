Before creating an IoT Ingest and Control MQTT Broker to your Kafka cluster, you will need the following:

- a Kafka cluster configured for SASL/SCRAM authentication
- a custom DNS wildcard domain, for this guide we will use `*.example.aklivity.io`
- a TLS Server Certificate stored in Secrets Manager for your custom DNS wildcard domain

::: info
Note the server certificate secret ARN as we will need to reference it from the IoT Ingest and Control CloudFormation template.

Make sure you have selected the desired region, ex: `US East (N. Virginia) us-east-1`.

If you need help creating a TLS Server Certificate you can follow the [Create Server Certificate with LetsEncrypt](../../how-tos/aws-services/create-server-certificate-letsencrypt.md) guide. Use your own custom DNS wildcard domain in place of the example domain `*.example.aklivity.io`.
:::

### AWS services used

| Service                     | Required                                                                       | Usage        | Quota                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------- |
| Secrets Manager             | Yes                                                                            | Startup only | [Not reached](https://docs.aws.amazon.com/general/latest/gr/asm.html#limits_secrets-manager) |
| Certificate Manager         | No<br><br>Private key and certificate can be inline in Secrets Manager instead | Startup only | [Not reached](https://docs.aws.amazon.com/general/latest/gr/acm.html#limits_acm)             |
| Private Certificate Manager | No<br><br>Private key and certificate can be inline in Secrets Manager instead | Startup only | [Not reached](https://docs.aws.amazon.com/general/latest/gr/acm-pca.html#limits_acm-pca)     |

Default [AWS Service Quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) are recommended.

::: tip
Check out the [Troubleshooting](../../how-tos/aws-services/troubleshooting.md) guide if you run into any issues.
:::
