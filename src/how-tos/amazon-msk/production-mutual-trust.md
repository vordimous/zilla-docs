---
icon: plus
description: Setup mutual authentication to your MSK cluster from anywhere on the internet.
---

# Production (Mutual Trust)
<!-- TODO enable -->
<!-- markdownlint-disable -->

[Zilla Plus](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

::: tip Estimated time to complete 20-30 minutes.
:::

## Overview

The [Zilla Plus (Public MSK Proxy)](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) lets authorized Kafka clients connect, publish messages and subscribe to topics in your Amazon MSK cluster via the internet.

In this guide we will deploy the Zilla Plus (Public MSK Proxy) and showcase globally trusted public internet connectivity to an MSK cluster from a Kafka client, using the custom wildcard domain `*.example.aklivity.io`. Kafka clients will use TLS client certificates to verify trusted client identity.

The following AWS services are used by [Zilla Plus (Public MSK Proxy)](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) for this deployment.

| Service                     | Required                                                                               | Usage                | Quota                                                                                         |
| --------------------------- | -------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------- |
| Marketplace Metering        | Yes                                                                                    | Startup, then hourly | [None](https://docs.aws.amazon.com/general/latest/gr/aws-marketplace.html)                    |
| Resource Groups and Tagging | Yes                                                                                    | Startup only         | [None](https://docs.aws.amazon.com/general/latest/gr/arg.html#arg-quotas)                     |
| Secrets Manager             | Yes                                                                                    | Startup only         | [Not reached](https://docs.aws.amazon.com/general/latest/gr/asm.html#limits\_secrets-manager) |
| Certificate Manager         | No<br><br>Private key and certificate can be inline in Secrets Manager instead | Startup only         | [Not reached](https://docs.aws.amazon.com/general/latest/gr/acm.html#limits\_acm)             |
| Private Certificate Manager | No<br><br>Private key and certificate can be inline in Secrets Manager instead | Startup only         | [Not reached](https://docs.aws.amazon.com/general/latest/gr/acm-pca.html#limits\_acm-pca)     |

The default AWS Service Quotas are sufficient.

::: info
Check out the [Troubleshooting](../../reference/troubleshooting/amazon-msk.md) guide if you run into any issues.
:::

## Prerequisites

Before setting up internet access to your MSK Cluster, you will need the following:

* an MSK Cluster configured for TLS encrypted client access and TLS client authentication
* an VPC security group for MSK Proxy instances
* an IAM security role for MSK Proxy instances
* subscription to Zilla Plus (Public MSK Proxy) via AWS Marketplace
* permission to modify global DNS records for a custom domain
* permission to generate client certificates signed by a private certificate authority

### Create MSK Cluster

We need to create an MSK cluster in preparation for secure remote access via the internet. You can skip this step if you have already created an MSK cluster with equivalent configuration.

Follow the [Create VPC](../../reference/amazon-msk/create-vpc.md) guide to create a VPC for your MSK cluster with the following parameters.

Name tag: `my-msk-cluster`\
IPv4 CIDR block: `10.0.0.0/16`\
Region: `us-east-1`\
Follow the [Create Certificate Authority (ACM)](../../reference/amazon-msk/create-certificate-authority-acm.md) guide with these parameters to create a private certificate authority to verify TLS client authentication.

### Distinguished Name

Common Name (CN): `Mutual Authentication CA`

Then follow the [Create MSK Cluster (Mutual Trust)](../../reference/amazon-msk/create-msk-cluster-mutual-trust.md) guide to create your MSK cluster with the following parameters.

Name: `aklivity`\
VPC: `my-msk-cluster`\
Subnets: `my-msk-cluster-1a` `my-msk-cluster-1b` `my-msk-cluster-1c`

Private Certificate Authority: `Mutual Authentication CA`

::: tip
This creates your MSK cluster in preparation for secure access via the internet.
:::

Follow the [Create Client Certificate (ACM)](../../reference/amazon-msk/create-client-certificate-acm.md) guide to create a trusted client certificate with the following parameters.

Common Name: `client-1`\
Private Certificate Authority: `Mutual Authentication CA`

::: tip
This allows an authorized Kafka client to connect directly to your MSK cluster with mutual trust.
:::

::: info
Create additional client certificates for each different authorized client identity that will connect via the internet to your MSK Public Proxy deployment.
:::

### Create the MSK Proxy security group

We need to create a VPC security group that will be used by the Public MSK Proxy instances when they are launched.

Follow the [Create Security Group](../../reference/amazon-msk/create-security-group.md) guide with the following parameters to create a security group in the same VPC as your MSK cluster.

VPC: `my-msk-cluster`\
Name: `my-msk-proxy`\
Description: Kafka clients and SSH access

### Inbound Rule

Type: `Custom TCP`\
Port: `9094`\
Source: `<Any IPv4>`

### Inbound Rule

Type: `SSH`\
Source: `<My IP>`

::: tip
This creates your MSK proxy security group to allow Kafka clients and SSH access.
:::

### Update your MSK Cluster security group rules

Follow the [Update Security Group](../../reference/amazon-msk/update-security-group.md) guide with the following parameters to allow the MSK Proxy instances to communicate with the MSK cluster.

VPC: `vpc-xxx (my-msk-cluster)`\
Security Group: `default` `(MSK security group)`

### Inbound Rule

Type: `Custom TCP`\
Port: `9094`\
Source: `Custom Security groups`: `my-msk-proxy`

::: tip
This allows the MSK Proxy instances to access your MSK cluster.
:::

### Create the MSK Proxy IAM security role

Follow the [Create IAM Role](../../reference/amazon-msk/create-iam-role.md) guide to create an IAM security role with the following parameters:

::: tabs

@tab Managed Policies

Name: `aklivity-public-msk-proxy`

```text:no-line-numbers
AWSMarketplaceMeteringFullAccess
AWSCertificateManagerReadOnly
AWSCertificateManagerPrivateCAReadOnly
ResourceGroupsandTagEditorReadOnlyAccess
```

@tab Inline Policies

Name: `MSKProxySecretsManagerRead`

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
        "arn:aws:secretsmanager:*:*:secret:wildcard.example.aklivity.io-*",
        "arn:aws:secretsmanager:*:*:secret:client-*"
      ]
    }
  ]
}
```

:::

::: warning
Replace `wildcard.example.aklivity.io` in the resource regular expression for `MSKProxySecretsManagerRead` inline policy if you used a different secret name for your wildcard certificate key.
:::

::: warning
Replace `client` in the resource regular expression for `MSKProxySecretsManagerRead` inline policy if you used a different secret name pattern for your client certificate keys.
:::

::: tip
This creates an IAM security role to enable the required AWS services for the MSK Proxy  instances.
:::

### Subscribe via AWS Marketplace

The Zilla Plus (Public MSK Proxy) is [available](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) through the AWS Marketplace. You can skip this step if you have already subscribed to Zilla Plus (Private MSK Proxy) via AWS Marketplace.

To get started, visit the Proxy's Marketplace [Product Page](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) and `Subscribe` to the offering.

::: info
You should now see `Zilla Plus (Public MSK Proxy)` listed in your [AWS Marketplace Subscriptions](https://console.aws.amazon.com/marketplace)
:::

## Create the Public TLS Server Certificate

We need a Public TLS Server Certificate for your custom DNS wildcard domain that can be trusted by a Kafka Client from anywhere.

Follow the [Create Server Certificate (LetsEncrypt)](../../reference/amazon-msk/create-server-certificate-letsencrypt.md) guide to create a new TLS Server Certificate for the your own custom wildcard DNS domain.

Here we use the wildcard domain `*.example.aklivty.io`  to illustrate the steps.

::: info
Note the server certificate secret ARN as we will need to reference it from the Public MSK Proxy CloudFormation template.
:::

## Deploy the Public MSK Proxy

Navigate to your [AWS Marketplace Subscriptions](https://console.aws.amazon.com/marketplace) and select `Zilla Plus (Public MSK Proxy)` to show the details page. Then select `Launch CloudFormation stack` from the `Actions` menu in the `Agreement` section.

Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`, then select the `Public MSK Proxy (Mutual Trust)` fulfillment option and click `Continue to Launch`. Choose the action `Launch CloudFormation`, then click `Launch` to complete the `Create stack` wizard with the following details:

### Step 1. Specify template

Prepare template: `Template is ready`\
Specify template: `(auto-filled)`

### Step 2. Specify stack details

Stack name: `my-public-msk-proxy`

#### Parameters

#### Network Configuration

VPC: `my-msk-cluster`\
Subnets: `my-msk-cluster-1a` `my-msk-cluster-1b` `my-msk-cluster-1c`

#### MSK Configuration

Wildcard DNS pattern [1]: `*.aklivity.[...].amazonaws.com`\
Port number: `9094`\
Private Certificate Authority [2a]: `<private certificate authority ARN>`

#### MSK Proxy Configuration

Instance count: `2`\
Instance type [3]: `t3.small`\
Role: `aklivity-public-msk-proxy`\
Security Groups: `my-msk-proxy`\
Secrets Manager Secret ARN: [`<signed TLS certificate's private key secret ARN>`](../../reference/amazon-msk/create-server-certificate-letsencrypt.md)
Public Wildcard DNS [4]: `*.example.aklivity.io`\
Public Port: `9094`\
Public Certificate Authority [2b]: `<private certificate authority ARN>`\
Key pair for SSH access [6]: `<key pair>`

### Step3. Configure stack options: `(defaults)`

### Step4. Review: `(review)`

**[1]** Follow the [Lookup MSK Server Names](../../reference/amazon-msk/lookup-msk-server-names.md) guide to discover the wildcard DNS pattern for your MSK cluster.

**[2][a][b]** These can be the same Private Certificate Authority that authorizes existing clients connecting directly to MSK, allowing existing trusted client certificates to connect via Public MSK Proxy.

**[3]** Consider the network throughput characteristics of the AWS instance type as that will impact the upper bound on network performance.

**[4]** Replace with your own custom wildcard DNS pattern.

**[5]** This example pattern requires all trusted client certificate key secrets to be named `client-*`

**[6]** Follow the [Create Key Pair](../../reference/amazon-msk/create-key-pair.md) guide to create a new key pair used when launching EC2 instances with SSH access.

Click `Create Stack`.

::: tip
This initiates deployment of the Zilla Plus (Public MSK Proxy) (Mutual Trust) stack via CloudFormation.
:::

::: info
When your Public MSK Proxy is ready, the [CloudFormation console](https://console.aws.amazon.com/cloudformation) will show **`CREATE_COMPLETE`** for the newly created stack.
:::

### Verify Public MSK Proxy Service

Navigate to the [EC2 Management Console](https://console.aws.amazon.com/ec2) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Under the `Resources by Region` section, select the `Instances` resource box to show your `Instances`. Select either of the Public MSK Proxy instances launched by the CloudFormation template to show the details.

::: info
They each have an IAM Role name starting with `aklivity-public-msk-proxy`.
:::

Find the `Public IPv4 Address` and then SSH into the instance.

```bash:no-line-numbers
ssh -i ~/.ssh/<key-pair.cer> ec2-user@<instance-public-ip-address>
```

After logging in via SSH, check the status of the `msk-proxy` system service.

```bash:no-line-numbers
systemctl status zilla-plus.service
```

Verify that the `msk-proxy` service is active and logging output similar to that shown below.

```text:no-line-numbers
● zilla-plus.service - Zilla Plus
   Loaded: loaded (/etc/systemd/system/zilla-plus.service; enabled; vendor preset: disabled)
   Active: active (running) since Tue 2021-08-24 20:56:51 UTC; 1 day 19h ago
 Main PID: 1803 (java)
   CGroup: /system.slice/zilla-plus.service
           └─...

Aug 26 06:56:54 ip-10-0-3-104.ec2.internal zilla[1803]: Recorded usage for record id ...
```

::: info
Repeat these steps for each of the other Public MSK Proxy instances launched by the CloudFormation template.
:::

### Configure Global DNS

When using a wildcard DNS name for your own domain, such as `*.example.akivity.io` then the DNS entries are setup in your DNS provider.

Navigate to the [CloudFormation console](https://console.aws.amazon.com/cloudformation) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`. Then select the `my-public-msk-proxy` stack to show the details.

In the stack `Outputs` tab, find the public DNS name of the `NetworkLoadBalancer.`

You need to create a `CNAME` record mapping your public DNS wildcard pattern to the public DNS name of the Network Load Balancer.

::: tip
This ensures that any new Kafka brokers added to the MSK cluster can still be reached via the Public MSK Proxy.
:::

::: info
You might prefer to use an Elastic IP address for each NLB public subnet, providing DNS targets for your `CNAME` record that can remain stable even after restarting the stack.
:::

## Verify Kafka Client Connectivity

To verify that we have successfully enabled public internet connectivity to our MSK cluster from the local development environment, we will use a generic Kafka client to create a topic, publish messages and then subscribe to receive these messages from our MSK cluster via the public internet.

### Install the Kafka Client

First, we must install a Java runtime that can be used by the Kafka client.
::: code-tabs#shell

@tab OSX and Linux

```bash:no-line-numbers
sudo yum install java-1.8.0
```

:::

Now we are ready to install the Kafka client:

::: code-tabs#shell

@tab OSX and Linux

```bash:no-line-numbers
wget https://archive.apache.org/dist/kafka/2.8.0/kafka_2.13-2.8.0.tgz
tar -xzf kafka_2.13-2.8.0.tgz
cd kafka_2.13-2.8.0
```

:::

::: info
We use a generic Kafka client here, however the setup for any Kafka client, including [KaDeck](https://www.xeotek.com/apache-kafka-monitoring-management/), [`Conduktor`](https://www.conduktor.io/download/), and [akhq.io](https://akhq.io/) will be largely similar. With the Public MSK Proxy you can use these GUI Kafka clients to configure and monitor your MSK applications, clusters and streams.
:::

### Configure the Kafka Client

With the Kaka client now installed we are ready to configure it and point it at the Public MSK Proxy.

We need to import the trusted client certificate and corresponding private key into the local key store used by the Kafka client when connecting to the Public MSK Proxy.

```bash:no-line-numbers
openssl pkcs12 -export -in client-1.cert.pem -inkey client-1.pkcs8.key.pem -out client-1.p12 -name client-1
keytool -importkeystore -destkeystore /tmp/kafka.client.keystore.jks -deststorepass generated -srckeystore client-1.p12 -srcstoretype PKCS12 -srcstorepass generated -alias client-1
```

In this example, we are importing a private key and certificate with `Common Name` `client-1` signed by a private certificate authority. First the private key and signed certificate are converted into a `p12` formatted key store.

Then the key store is converted to `/tmp/kafka.client.keystore.jks` in `JKS` format. When prompted, use a consistent password for each command. We use the password `generated` to illustrate these steps.

The MSK Proxy relies on TLS so we need to create a file called `client.properties` that tells the Kafka client to use SSL as the security protocol and to specify the key store containing authorized client certificates.

::: code-tabs#shell

@tab client.properties

```toml:no-line-numbers
security.protocol=SSL
ssl.keystore.location=/tmp/kafka.client.keystore.jks
ssl.keystore.password = generated
```

:::

The password configured in `client.properties` should match the password used in the commands above used to create the key store.

::: tip
As the TLS certificate is signed by a globally trusted certificate authority, there is no need to configure your Kafka client to override the trusted certificate authorities.
:::

### Test the Kafka Client

We can now verify that the Kafka client can successfully communicate with your MSK cluster via the internet from your local development environment to create a topic, then publish and subscribe to the same topic.

If using the wildcard DNS pattern `*.example.aklivity.io`, then we use the following as TLS bootstrap server names for the Kafka client:

```text:no-line-numbers
b-1.example.aklivity.io:9094,b-2.example.aklivity.io:9094,b-3.example.aklivity.io:9094
```

::: warning
Replace these TLS bootstrap server names accordingly for your own custom wildcard DNS pattern.
:::

#### Create a Topic

Use the Kafka client to create a topic called `public-proxy-test`, replacing`<tls-bootstrap-server-names>` **** in the command below with the TLS proxy names of your Public MSK Proxy:

```bash:no-line-numbers
bin/kafka-topics.sh --create --topic public-proxy-test --partitions 3 --replication-factor 3 --command-config client.properties --bootstrap-server <tls-bootstrap-server-names>
```

A quick summary of what just happened:

1. The Kafka client with access to the public internet issued a request to create a new topic
2. This request was directed to the internet-facing Network Load Balancer
3. The Network Load Balancer forwarded the request to the Zilla Plus (Public MSK Proxy)
4. The Zilla Plus (Public MSK Proxy) verified the client identity of the Kafka client
5. The Zilla Plus (Public MSK Proxy) selected a matching client certificate to propagate client identity
6. The Zilla Plus (Public MSK Proxy) routed the request to the appropriate MSK broker
7. The topic was created in the MSK broker
8. Public access was verified, authorized by trusted client certificate

#### Publish messages

Publish two messages to the newly created topic via the following producer command:

```bash:no-line-numbers
bin/kafka-console-producer.sh --topic public-proxy-test --producer.config client.properties --broker-list <tls-bootstrap-server-names>
```

A prompt will appear for you to type in the messages:

```text:no-line-numbers
>This is my first event
>This is my second event
```

#### Receive messages

Read these messages back via the following consumer command:

```bash:no-line-numbers
bin/kafka-console-consumer.sh --topic public-proxy-test --from-beginning --consumer.config client.properties --bootstrap-server <tls-bootstrap-server-names>
```

You should see the `This is my first event` and `This is my second event` messages.

```text:no-line-numbers
This is my first event
This is my second event
```

::: tip
This verifies internet connectivity to your MSK cluster via [Zilla Plus (Public MSK Proxy)](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) with mutual trust!
:::

## Monitor the Public MSK Proxy

The CloudFormation template used to deploy the Public MSK Proxy includes a Network Load Balancer that can be monitored via [CloudWatch](https://console.aws.amazon.com/cloudwatch) to verify continuous health.

Network Load Balancers have [many available metrics](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-cloudwatch-metrics.html), including the following.

| Metric                   | Description                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TCP_Target_Reset_Count` | The total number of reset (RST) packets sent from a target to a client. These resets are generated by the target and forwarded by the load balancer. |
| `UnHealthyHostCount`     | The number of targets that are considered unhealthy.                                                                                                 |

You can use [CloudWatch](https://console.aws.amazon.com/cloudwatch) to create a dashboard to monitor these metrics and set alarms to alert you when specific metric thresholds are reached.

## Upgrade the Public MSK Proxy

Navigate to your [AWS Marketplace Subscriptions](https://console.aws.amazon.com/marketplace) and select `Zilla Plus (Public MSK Proxy)` to show the details page. Then select `Launch CloudFormation stack` from the `Actions` menu in the `Agreement` section.

Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`, then select the `Public MSK Proxy` fulfillment option and click `Continue to Launch`. Choose the action `Launch CloudFormation`, then click `Launch` to show the URL of the CloudFormation template.

Copy the CloudFormation template Amazon S3 URL and then select your existing CloudFormation Stack from a previous deployment of `Zilla Plus (Public MSK Proxy)`. Click `Update` and `Replace current template` with the copied Amazon S3 URL. Then complete the wizard to deploy the updated stack.

CloudFormation will incrementally deploy the MSK Proxy instances for the new version behind the same Network Load Balancer, checking for successful deployment before terminating the MSK Proxy instances for the previous version.

Connected clients will see their connections drop, and when they reconnect automatically, the Network Load Balancer will direct them to the new MSK Proxy instances. If the stack update is unsuccessful, then CloudFormation will rollback to use the previous stack deployment.
