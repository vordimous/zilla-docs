---
icon: aky-zilla-plus
description: Setup connectivity to your SASL/SCRAM Amazon MSK cluster from anywhere on the internet.
---

# Amazon MSK SASL/SCRAM authentication

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

::: tip Estimated time to complete 20-30 minutes.
:::

## Overview

The [Zilla Plus for Amazon MSK](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) Secure Public Access proxy lets authorized Kafka clients connect, publish messages and subscribe to topics in your Amazon MSK cluster via the internet.

In this guide we will deploy the Zilla Plus for Amazon MSK Secure Public Access proxy and showcase globally trusted public internet connectivity to an MSK cluster from a Kafka client, using the custom wildcard domain `*.example.aklivity.io`.

### AWS services used

| Service                     | Required                                                                       | Usage        | Quota                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------- |
| Resource Groups and Tagging | Yes                                                                            | Startup only | [None](https://docs.aws.amazon.com/general/latest/gr/arg.html#arg-quotas)                    |
| Secrets Manager             | Yes                                                                            | Startup only | [Not reached](https://docs.aws.amazon.com/general/latest/gr/asm.html#limits_secrets-manager) |
| Certificate Manager         | No<br><br>Private key and certificate can be inline in Secrets Manager instead | Startup only | [Not reached](https://docs.aws.amazon.com/general/latest/gr/acm.html#limits_acm)             |
| Private Certificate Manager | No<br><br>Private key and certificate can be inline in Secrets Manager instead | Startup only | [Not reached](https://docs.aws.amazon.com/general/latest/gr/acm-pca.html#limits_acm-pca)     |

Default [AWS Service Quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) are recommended.

## Prerequisites

Before setting up internet access to your MSK Cluster, you will need the following:

- an MSK Cluster configured for SASL/SCRAM authentication
- an VPC security group for the <ZillaPlus/> proxies
- an IAM security role for the <ZillaPlus/> proxies
- subscription to Zilla Plus for Amazon MSK via AWS Marketplace
- permission to modify global DNS records for a custom domain

::: tip
Check out the [Troubleshooting](../../../reference/troubleshooting/aws.md) guide if you run into any issues.
:::

### Create the MSK Cluster

> This creates your MSK cluster in preparation for secure access via the internet.

An MSK cluster is needed for secure remote access via the internet. You can skip this step if you have already created an MSK cluster with equivalent configuration.

Follow the [Create MSK Cluster](../../../reference/aws/create-msk-cluster.md) guide to setup the a new MSK cluster. We will use the below resource names to reference the AWS resources needed in this guide.

- Cluster Name: `my-msk-cluster`
- Access control methods: `SASL/SCRAM authentication`
- VPC: `my-msk-cluster-vpc`
- Subnet: `my-msk-cluster-subnet-*`
- Route tables: `my-msk-cluster-rtb-*`
- Internet gateway: `my-msk-cluster-igw`

When the MSK cluster is created you will need to follow the [Sign-in credentials authentication with AWS Secrets Manager](https://docs.aws.amazon.com/msk/latest/developerguide/msk-password.html) to associate your `AmazonMSK_*` secret to your cluster. There will be a prompt on the cluster summary page to create a new secret or associate an existing one. For the remainder of this doc we will assume the following values for this secret:

- Use `Plaintext` value:

  ```json:no-line-numbers
  {"username":"alice","password":"alice-secret"}
  ```

- Encryption key: `<Customer managed key>`
- Name: `AmazonMSK_alice`

### Create the <ZillaPlus/> proxy security group

> This creates your <ZillaPlus/> proxy security group to allow Kafka clients and SSH access.

A VPC security group is needed for the <ZillaPlus/> proxies when they are launched.

Follow the [Create Security Group](https://console.aws.amazon.com/vpcconsole/home#CreateSecurityGroup:) wizard with the following parameters and defaults. This creates your <ZillaPlus/> proxy security group to allow Kafka clients and SSH access.

- VPC: `my-msk-cluster-vpc`
- Name: `my-zilla-proxy-sg`
- Description: `Kafka clients and SSH access`
- Add Inbound Rule
  - Type: `CUSTOM TCP`
  - Port Range: `9096`
  - Source type: `Anywhere-IPv4`
- Add Inbound Rule
  - Type: `SSH`
  - Source type: `My IP`
- Add Outbound Rule (if not exists)
  - Type: `All traffic`
  - Destination: `Anywhere-IPv4`

### Update the default security group rules

> This allows the <ZillaPlus/> proxies to communicate with your MSK cluster.

Navigate to the VPC Management Console [Security Groups](https://console.aws.amazon.com/vpc/home#securityGroups:) table.

::: note Check your selected region
Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`.
:::

Filter the security groups by selecting a `VPC` and select the `default` security group.

- VPC: `my-msk-cluster-vpc`
- Security Group: `default`

#### Add a Custom TCP Rule

Add this Inbound Rule to allow the <ZillaPlus/> proxies to communicate with the MSK cluster.

- Type: `Custom TCP`
- Port Range: `9096`
- Source type: `Custom`
- Source: `my-zilla-proxy-sg`

### Create the <ZillaPlus/> proxy IAM security role

> This creates an IAM security role to enable the required AWS services for the <ZillaPlus/> proxies.

Follow the [Create IAM Role](../../../reference/aws/create-iam-role.md) guide to create an IAM security role with the following parameters:

::: code-tabs

@tab Name

```text:no-line-numbers
aklivity-zilla-proxy
```

@tab Policies

```text:no-line-numbers
AWSCertificateManagerReadOnly
AWSCertificateManagerPrivateCAReadOnly
ResourceGroupsandTagEditorReadOnlyAccess
```

:::

#### IAM role Inline Policies

This creates an IAM security role to enable the required AWS services for the <ZillaPlus/> proxies.

::: code-tabs

@tab Name

```text:no-line-numbers
MSKProxySecretsManagerRead
```

@tab JSON Summary

```json:no-line-numbers
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue",
        "secretsmanager:DescribeSecret"
      ],
      "Resource": [
        "arn:aws:secretsmanager:*:*:secret:wildcard.example.aklivity.io-*"
      ]
    }
  ]
}
```

:::

::: info If you used a different secret name for your certificate key.

Replace `wildcard.example.aklivity.io` in the resource regular expression for:

```text:no-line-numbers
MSKProxySecretsManagerRead
```

:::

## Subscribe via AWS Marketplace

The [Zilla Plus for Amazon MSK](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) is available through the AWS Marketplace. You can skip this step if you have already subscribed to Zilla Plus for Amazon MSK via AWS Marketplace.

To get started, visit the Proxy's Marketplace [Product Page](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) and `Subscribe` to the offering. You should now see `Zilla Plus for Amazon MSK` listed in your [AWS Marketplace](https://console.aws.amazon.com/marketplace) subscriptions.

## Create the Server Certificate

We need a TLS Server Certificate for your custom DNS wildcard domain that can be trusted by a Kafka Client from anywhere.

Follow the [Create Server Certificate (LetsEncrypt)](../../../reference/aws/create-server-certificate-letsencrypt.md) guide to create a new TLS Server Certificate. Use your own custom wildcard DNS domain in place of the example wildcard domain `*.example.aklivity.io`.

::: info
Note the server certificate secret ARN as we will need to reference it from the Secure Public Access CloudFormation template.
:::

## Deploy the Zilla Plus Secure Public Access Proxy

> This initiates deployment of the Zilla Plus for Amazon MSK stack via CloudFormation.

Navigate to your [AWS Marketplace](https://console.aws.amazon.com/marketplace) subscriptions and select `Zilla Plus for Amazon MSK` to show the manage subscription page.

- From the `Agreement` section > `Actions` menu > select `Launch CloudFormation stack`
- Select the `Secure Public Access (Unauthorized/SASL)` fulfillment option
- Make sure you have selected the desired region selected, such as `us-east-1`
- Click `Continue to Launch`
  - Choose the action `Launch CloudFormation`

Click `Launch` to complete the `Create stack` wizard with the following details:

### Step 1. Create Stack

- Prepare template: `Template is ready`
- Specify template: `Amazon S3 URL`
  - Amazon S3 URL: `(auto-filled)`

### Step 2. Specify stack details

::: code-tabs

@tab Stack name

```text:no-line-numbers
my-zilla-proxy
```

:::

Parameters:

- Network Configuration
  - VPC: `my-msk-cluster-vpc`
  - Subnets: `my-msk-cluster-1a` `my-msk-cluster-1b` `my-msk-cluster-1c`
- MSK Configuration
  - Wildcard DNS pattern: `*.aklivity.[...].amazonaws.com` *1
  - Port number: `9096`
- Secure Public Access Configuration
  - Instance count: `2`
  - Instance type: `t3.small` *2
  - Role: `aklivity-zilla-proxy`
  - Security Groups: `my-zilla-proxy`
  - Secrets Manager Secret ARN: `<TLS certificate private key secret ARN>` *3
  - Public Wildcard DNS: `*.example.aklivity.io` *4
  - Public Port: `9096`
  - Key pair for SSH access: `my-key-pair` *5
- *Configuration Reference
  1. Follow the [Lookup MSK Server Names](../../../reference/aws/lookup-msk-server-names.md) guide to discover the wildcard DNS pattern for your MSK cluster.
  2. Consider the network throughput characteristics of the AWS instance type as that will impact the upper bound on network performance.
  3. This is the ARN of the created secret for the signed certificate's private key that was returned in the last step of the [Create Server Certificate (LetsEncrypt)](../../../reference/aws/create-server-certificate-letsencrypt.md) guide.
  4. Replace with your own custom wildcard DNS pattern.
  5. Follow the [Create Key Pair](../../../reference/aws/create-key-pair.md) guide to create a new key pair to access EC2 instances via SSH.

### Step 3. Configure stack options: `(use defaults)`

### Step 4. Review

Confirm the stack details are correct and `Submit` to start the CloudFormation deploy.

::: info
When your <ZillaPlus/> proxy is ready, the [CloudFormation console](https://console.aws.amazon.com/cloudformation) will show `CREATE_COMPLETE` for the newly created stack.
:::

## Verify <ZillaPlus/> proxy Service

Navigate to the [EC2 running instances dashboard.](https://console.aws.amazon.com/ec2/home#Instances:instanceState=running)

::: note Check your selected region
Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`.
:::

Select either of the <ZillaPlus/> proxies launched by the CloudFormation template to show the details.

::: info
They each have an IAM Role name starting with `aklivity-zilla-proxy`.
:::

Find the `Public IPv4 Address` and then SSH into the instance.

```bash:no-line-numbers
ssh -i ~/.ssh/<key-pair.cer> ec2-user@<instance-public-ip-address>
```


After logging in via SSH, check the status of the `zilla-plus` system service.

::: tabs

@tab Service is running

Verify that the `zilla-plus` service is active and logging output similar to that shown below.

```bash:no-line-numbers
systemctl status zilla-plus.service
```

```output:no-line-numbers
zilla-plus.service - Zilla Plus
   Loaded: loaded (/etc/systemd/system/zilla-plus.service; enabled; vendor preset: disabled)
   Active: active (running) since...
```

@tab Check Ports

Check for the active ports with `netstat`.

```bash:no-line-numbers
netstat -ntlp
```

```output:no-line-numbers
tcp6    0    0 :::9092    :::*    LISTEN    1726/.zpm/image/bin 
```

@tab Check Zilla Logs

You can get an stdout dump of the `zilla-plus.service` using `journalctl`.

```bash:no-line-numbers
journalctl -e -u zilla-plus.service | tee -a /tmp/zilla.log
```

```output:no-line-numbers
systemd[1]: Started zilla-plus.service - Zilla Plus.
...
```

@tab Check Cloud Init Logs

All output from cloud-init is captured by default to `/var/log/cloud-init-output.log`. There shouldn't be any errors in this log.

```bash:no-line-numbers
cat /var/log/cloud-init-output.log 
```

```output:no-line-numbers
Cloud-init v. 22.2.2 running 'init'...
```

:::

Repeat these steps for each of the other <ZillaPlus/> proxies launched by the CloudFormation template.

### Configure Global DNS

> This ensures that any new Kafka brokers added to the MSK cluster can still be reached via the <ZillaPlus/> proxy.

When using a wildcard DNS name for your own domain, such as `*.example.aklivity.io` then the DNS entries are setup in your DNS provider.

Navigate to the [CloudFormation console](https://console.aws.amazon.com/cloudformation). Then select the `my-zilla-proxy` stack to show the details.

::: note Check your selected region
Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`.
:::

In the stack `Outputs` tab, find the public DNS name of the `NetworkLoadBalancer.`

You need to create a `CNAME` record mapping your public DNS wildcard pattern to the public DNS name of the Network Load Balancer.

::: info
You might prefer to use an Elastic IP address for each NLB public subnet, providing DNS targets for your `CNAME` record that can remain stable even after restarting the stack.
:::

## Verify Kafka Client Connectivity

To verify that we have successfully enabled public internet connectivity to our MSK cluster from the local development environment, we will use a generic Kafka client to create a topic, publish messages and then subscribe to receive these messages from our MSK cluster via the public internet.

### Install the Kafka Client

First, we must install a Java runtime that can be used by the Kafka client.

```bash:no-line-numbers
sudo yum install java-1.8.0
```

Now we are ready to install the Kafka client:

```bash:no-line-numbers
wget https://archive.apache.org/dist/kafka/2.8.0/kafka_2.13-2.8.0.tgz
tar -xzf kafka_2.13-2.8.0.tgz
cd kafka_2.13-2.8.0
```

::: tip
We use a generic Kafka client here, however the setup for any Kafka client, including [KaDeck](https://www.xeotek.com/apache-kafka-monitoring-management/), [Conduktor](https://www.conduktor.io/download/), and [akhq.io](https://akhq.io/) will be largely similar. With the <ZillaPlus/> proxy you can use these GUI Kafka clients to configure and monitor your MSK applications, clusters and streams.
:::

### Configure the Kafka Client

With the Kaka client now installed we are ready to configure it and point it at the <ZillaPlus/> proxy.

The <ZillaPlus/> proxy relies on encrypted SASL/SCRAM so we need to create a file called `client.properties` that tells the Kafka client to use SASL_SSL as the security protocol with SCRAM-SHA-512 encryption.

Notice we used the default username and password, but you will need to replace those with your own credentials from the `AmazonMSK_*` secret you created.

::: code-tabs

@tab client.properties

```toml:no-line-numbers
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="alice" password="alice-secret";
security.protocol=SASL_SSL
sasl.mechanism=SCRAM-SHA-512
```

:::

::: tip
As the TLS certificate is signed by a globally trusted certificate authority, there is no need to configure your Kafka client to override the trusted certificate authorities.
:::

### Test the Kafka Client

> This verifies internet connectivity to your MSK cluster via Zilla Plus for Amazon MSK.

We can now verify that the Kafka client can successfully communicate with your MSK cluster via the internet from your local development environment to create a topic, then publish and subscribe to the same topic.

If using the wildcard DNS pattern `*.example.aklivity.io`, then we use the following as TLS bootstrap server names for the Kafka client:

```text:no-line-numbers
b-1.example.aklivity.io:9096,b-2.example.aklivity.io:9096,b-3.example.aklivity.io:9096
```

::: warning
Replace these TLS bootstrap server names accordingly for your own custom wildcard DNS pattern.
:::

#### Create a Topic

Use the Kafka client to create a topic called `zilla-proxy-test`, replacing `<tls-bootstrap-server-names>` in the command below with the TLS proxy names of your <ZillaPlus/> proxy:

```bash:no-line-numbers
bin/kafka-topics.sh --create --topic zilla-proxy-test --partitions 3 --replication-factor 3 --command-config client.properties --bootstrap-server <tls-bootstrap-server-names>
```

::: tip A quick summary of what just happened

1. The Kafka client with access to the public internet issued a request to create a new topic
2. This request was directed to the internet-facing Network Load Balancer
3. The Network Load Balancer forwarded the request to the <ZillaPlus/> proxy
4. The <ZillaPlus/> proxy routed the request to the appropriate MSK broker
5. The topic was created in the MSK broker
6. Public access was verified

:::

#### Publish messages

Publish two messages to the newly created topic via the following producer command:

```bash:no-line-numbers
bin/kafka-console-producer.sh --topic zilla-proxy-test --producer.config client.properties --broker-list <tls-bootstrap-server-names>
```

A prompt will appear for you to type in the messages:

```output:no-line-numbers
>This is my first event
>This is my second event
```

#### Receive messages

Read these messages back via the following consumer command:

```bash:no-line-numbers
bin/kafka-console-consumer.sh --topic zilla-proxy-test --from-beginning --consumer.config client.properties --bootstrap-server <tls-bootstrap-server-names>
```

You should see the `This is my first event` and `This is my second event` messages.

```output:no-line-numbers
This is my first event
This is my second event
```

::: info Monitor the <ZillaPlus/> proxy

Follow the [Monitoring the <ZillaPlus/> proxy](../../../concepts/kafka-proxies/secure-public-access.md#monitoring) instructions

:::

::: info Upgrade the <ZillaPlus/> proxy

Follow the [Upgrading the <ZillaPlus/> proxy](../../../concepts/kafka-proxies/secure-public-access.md#upgrading) instructions

:::
