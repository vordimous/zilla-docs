---
icon: plus
description: Securely access an Amazon MSK cluster across VPCs via AWS PrivateLink.
---

# Private MSK Proxy
<!-- TODO enable -->
<!-- markdownlint-disable -->

[Zilla Plus](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

::: tip Estimated time to complete 20-30 minutes.
:::

## Overview

The [Zilla Plus (Private MSK Proxy)](https://aws.amazon.com/marketplace/pp/prodview-asox2tvjdn5ek) enables cross-account connectivity between Kafka clients and Amazon MSK clusters.

Bundled CloudFormation templates provide automated configuration of a VPC Endpoint Service for your Amazon MSK cluster as well as corresponding VPC Endpoints. These VPC endpoints enable secure access to your MSK cluster via [AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/endpoint-services-overview.html) from an outside VPC, even if that VPC is owned by a different AWS account. Authorized Kafka clients in each consuming VPC will be able to connect, publish messages and subscribe to topics in your Amazon MSK cluster.

In this guide we will deploy the Zilla Plus (Private MSK Proxy) and showcase cross VPC connectivity between an MSK cluster and a Kafka client.

The following AWS services are used by [Zilla Plus (Private MSK Proxy)](https://aws.amazon.com/marketplace/pp/prodview-asox2tvjdn5ek) for this deployment.

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

Before setting up cross-VPC access to your MSK Cluster, you will need the following:

* an MSK Cluster configured for TLS encrypted client access
* an VPC security group for MSK Proxy instances
* subscription to Zilla Plus (Private MSK Proxy) via AWS Marketplace

### Create MSK Cluster

We need to create an MSK cluster in preparation for secure remote access outside the VPC. You can skip this step if you have already created an MSK cluster with equivalent configuration.

Follow the [Create VPC](../../reference/amazon-msk/create-vpc.md) guide to create a VPC for your MSK cluster with the following parameters.

Name tag: `my-msk-cluster`\
IPv4 CIDR block: `10.0.0.0/16`\
Region: `us-east-1`

Then follow the [Create MSK Cluster](../../reference/amazon-msk/create-msk-cluster.md) guide to create your MSK cluster with the following parameters.

Name: `aklivity`\
VPC: `my-msk-cluster`\
Subnets: `my-msk-cluster-1a` `my-msk-cluster-1b` `my-msk-cluster-1c`

::: tip
This creates your MSK cluster in preparation for secure access outside the VPC.
:::

### Create the MSK Proxy security group

We need to create a VPC security group that will be used by the Private MSK Proxy instances when they are launched.

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
This creates your Private MSK proxy security group to allow Kafka clients and SSH access.
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

### Subscribe via AWS Marketplace

The Zilla Plus (Private MSK Proxy) is [available](https://aws.amazon.com/marketplace/pp/prodview-asox2tvjdn5ek) through the AWS Marketplace. You can skip this step if you have already subscribed to Zilla Plus (Private MSK Proxy) via AWS Marketplace.

To get started, visit the Proxy's Marketplace [Product Page](https://aws.amazon.com/marketplace/pp/prodview-asox2tvjdn5ek) and `Subscribe` to the offering.

::: info
You should now see `Zilla Plus (Private MSK Proxy)` listed in your [AWS Marketplace Subscriptions](https://console.aws.amazon.com/marketplace).
:::

## Create the VPC Endpoint Service

Navigate to your [AWS Marketplace Subscriptions](https://console.aws.amazon.com/marketplace) and select `Zilla Plus (Private MSK Proxy)` to show the details page. Then select `Launch CloudFormation stack` from the `Actions` menu in the `Agreement` section.

Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`, and then click `Continue to Launch`. Choose the action `Launch CloudFormation`, then click `Launch` to complete the `Create stack` wizard with the following details:

### Step 1. Specify template

Prepare template: `Template is ready`\
Specify template: `(auto-filled)`

### Step 2. Specify stack details

Stack name: `my-msk-endpoint-service`

#### Parameters

#### Network Configuration

VPC: `my-msk-cluster`\
Subnets: `my-msk-cluster-1a` `my-msk-cluster-1b` `my-msk-cluster-1c`

#### MSK Configuration

Wildcard DNS pattern [1]: **`*`**`.aklivity.[...].amazonaws.com`\
Port number: `9094`

#### MSK Proxy Configuration

Instance count: `2`\
Instance type [2]: `t3.small`\
Security Groups: `my-msk-proxy`\
Key pair for SSH access: `<key pair>`

### Step3. Configure stack options: `(defaults)`

### Step4. Review: `(review)`

**[1]** Follow the [Lookup MSK Server Names](../../reference/amazon-msk/lookup-msk-server-names.md) guide to discover the wildcard DNS pattern for your MSK cluster.

**[2]** Consider the network throughput characteristics of the AWS instance type as that will impact the upper bound on network performance.

Click `Create Stack`.

::: tip
This initiates creation of a VPC Endpoint Service using the Zilla Plus (Private MSK Proxy) stack via CloudFormation.
:::

::: info
When your VPC Endpoint Service is ready, the [CloudFormation console](https://console.aws.amazon.com/cloudformation) will show **`CREATE_COMPLETE`** for the newly created stack.
:::

### Verify Private MSK Proxy Service

Navigate to the [EC2 Management Console](https://console.aws.amazon.com/ec2) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Under the `Resources by Region` section, select the `Instances` resource box to show your `Instances`. Select either of the Private MSK Proxy instances launched by the CloudFormation template to show the details.

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
Repeat these steps for each of the other Private MSK Proxy instances launched by the CloudFormation template.
:::

## Create the MSK VPC Endpoint

We can now create a VPC Endpoint to access your MSK cluster from Kafka clients in a different VPC via the newly created VPC Endpoint Service.

### Create the VPC

Follow the [Create VPC](../../reference/amazon-msk/create-vpc.md) guide to create a VPC for your Kafka clients with the following parameters.

Name tag: `my-msk-client`\
IPv4 CIDR block: `10.1.0.0/16`\
Region: `us-east-1`

::: tip
This creates your client VPC in preparation for secure cross-VPC access to your MSK cluster.
:::

#### Enable DNS Hostnames

Navigate to the [VPC Management Console](https://console.aws.amazon.com/vpc) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Under the `Resources by Region` section, select the `VPCs` resource box to show `Your VPCs`. Then select the VPC named `my-msk-client` to show the details.

Choose `Edit DNS hostnames` from the `Actions` menu and fill out the `Edit DNS hostnames` form as follows:

DNS hostnames: `Enable`\
This is required to let the Kafka clients properly resolve your MSK cluster bootstrap server names.

::: danger
Make sure to enable DNS Hostnames for this VPC.
:::

### Create the VPC Endpoint

Navigate to the [CloudFormation Management Console](https://console.aws.amazon.com/cloudformation) and click the `Create Stack` button to complete the `Create stack` wizard with the following details:

### Step 1. Specify template

Prepare template: `Template is ready`

#### Specify template

Template source: `Amazon S3 URL`\
Amazon S3 URL: [https://s3.amazonaws.com/marketplace.aklivity.io/private-msk-proxy/PrivateMskEndpoint.template](https://s3.amazonaws.com/marketplace.aklivity.io/private-msk-proxy/PrivateMskEndpoint.template)

### Step 2. Specify stack details

Stack name: `my-msk-endpoint`

#### Parameters

#### Network Configuration

VPC: `my-msk-client`\
Subnets: `my-msk-client-1a` `my-msk-client-1b` `my-msk-client-1c`

#### Endpoint Configuration

Endpoint Service Name [1]: `com.amazonaws.vpce.[...]`\
Wildcard DNS pattern [2]: **`*`**`.aklivity.[...].amazonaws.com`\

### Step3. Configure stack options: `(defaults)`\

### Step4. Review: `(review)`

**[1]** Locate the `Endpoint Service Name` from the `Outputs` tab of the `my-msk-endpoint-service` stack previously created in the same VPC as your MSK Cluster.

**[2]** Follow the [Lookup MSK Server Names](../../reference/amazon-msk/lookup-msk-server-names.md) guide to discover the wildcard DNS pattern for your MSK cluster.

Click `Create Stack`.

::: tip
This initiates creation of a VPC Endpoint using the CloudFormation stack.
:::

::: info
When your VPC Endpoint is ready, the [CloudFormation console](https://console.aws.amazon.com/cloudformation) will show **`CREATE_COMPLETE`** for the newly created stack.
:::

## Verify Kafka Client Connectivity

Now we must prepare a Kafka client running in the client VPC to verify connectivity to your MSK cluster via the VPC Endpoint.

### Launch the EC2 Instance

Follow the [`Launch EC2 Instance`](../../reference/amazon-msk/launch-ec2-instance.md) guide with the following parameters to launch an EC2 instance with remote SSH access and login to the instance via SSH.

VPC: `my-msk-client`\
Region: `us-east-1`

### Instance

AMI: `Amazon Linux 2 AMI (HVM),` `SSD Volume Type,` `64-bit (x86)`

Type: `t3.small`

::: tip
This launches an EC2 instance that you can access remotely via SSH.
:::

### Install the Kafka Client

First, we must install a Java runtime that can be used by the Kafka client.

After logging into the instance via SSH, run the following command:

```bash:no-line-numbers
sudo yum install java-1.8.0
```

Now we are ready to install the Kafka client:

```bash:no-line-numbers
wget https://archive.apache.org/dist/kafka/2.8.0/kafka_2.13-2.8.0.tgz
tar -xzf kafka_2.13-2.8.0.tgz
cd kafka_2.13-2.8.0
```

After changing the directory to `kafka_2.13-2.8.0` we must copy the Kafka clients trustore:

```bash:no-line-numbers
cp /usr/lib/jvm/<JDKFolder>/lib/security/cacerts /tmp/kafka.client.truststore.jks
```

You can get the value for **** `<JDKFolder>`**** by typing

```bash:no-line-numbers
cp /usr/lib/jvm/j **double tap TAB**
```

and the selecting the longer entry that starts with "**jre-1.8.0-openjdk...."**

A sample full copy command command of a Kafka client's trustore will appear as follows:

```bash:no-line-numbers
cp /usr/lib/jvm/jre-1.8.0-openjdk-1.8.0.302.b08-0.amzn2.0.1.x86_64/lib/security/cacerts /tmp/kafka.client.truststore.jks
```

#### Configure the Kafka Client

With the Kaka client now installed we are ready to configure it and point it at the MSK VPC Endpoint.

The MSK Proxy relies on TLS so we need to create a file called `client.properties` that tells the Kafka client to use SSL and were the truststore is:

::: code-tabs#shell

@tab client.properties

```toml:no-line-numbers
security.protocol=SSL
ssl.truststore.location=/tmp/kafka.client.truststore.jks
```

:::

::: tip
Use the Vim to create `client.properties.`Type `vi client.properties` in the SSH terminal, paste the above contents, then enter the`:wq` command to save the file..
:::

### Test the Kafka Client

We can now verify that the Kafka client can successfully communicate with your MSK cluster via the VPC Endpoint in a different VPC to create a topic, then publish and subscribe to the same topic.

Follow the [Lookup MSK Server Names](../../reference/amazon-msk/lookup-msk-server-names.md) guide to find the TLS bootstrap server names for your MSK cluster.

#### Create a Topic

Use the Kafka client to create a topic called `vpce-test`, replacing`<tls-bootstrap-server-names>` **** in the command below with the TLS bootstrap server names of your MSK cluster:

```bash:no-line-numbers
bin/kafka-topics.sh --create --topic vpce-test --partitions 3 --replication-factor 3 --command-config client.properties --bootstrap-server <tls-bootstrap-server-names>
```

A quick summary of what just happened:

1. The Kafka client in the **my-msk-client** VPC issued a request to create a new topic
2. This request was directed to the MSK VPC Endpoint
3. The request was then relayed across PrivateLink to the MSK VPC Endpoint Service in the **my-msk-cluster** VPC
4. The Endpoint Service forwarded the request to the Network Load Balancer
5. The Network Load Balancer forwarded the request to the Aklivity MSK Private Proxy
6. The Aklivity MSK Private Proxy look at the info in the request and relayed it through to the appropriate MSK broker
7. The topic was created in the MSK broker
8. Cross VPC connectivity was verified

#### Publish messages

Publish two messages to the newly created topic via the following producer command:

```bash:no-line-numbers
bin/kafka-console-producer.sh --topic vpce-test --producer.config client.properties --broker-list <tls-bootstrap-server-names>
```

A prompt will appear for you to type in the messages:

```text:no-line-numbers
>This is my first event
>This is my second event
```

#### Receive messages

Read these messages back via the following consumer command:

```bash:no-line-numbers
bin/kafka-console-consumer.sh --topic vpce-test --from-beginning --consumer.config client.properties --bootstrap-server <tls-bootstrap-server-names>
```

You should see the `This is my first event` and `This is my second event` messages.

```text:no-line-numbers
This is my first event
This is my second event
```

::: tip
This verifies cross-VPC connectivity to your MSK cluster via [Zilla Plus (Private MSK Proxy)](https://aws.amazon.com/marketplace/pp/prodview-asox2tvjdn5ek)!
:::

## Monitor the VPC Endpoint Service

The CloudFormation template used to deploy the VPC Endpoint Service includes a Network Load Balancer that can be monitored via [CloudWatch](https://console.aws.amazon.com/cloudwatch) to verify continuous health.

Network Load Balancers have [many available metrics](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-cloudwatch-metrics.html), including the following.

| Metric                   | Description                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TCP_Target_Reset_Count` | The total number of reset (RST) packets sent from a target to a client. These resets are generated by the target and forwarded by the load balancer. |
| `UnHealthyHostCount`     | The number of targets that are considered unhealthy.                                                                                                 |

You can use [CloudWatch](https://console.aws.amazon.com/cloudwatch) to create a dashboard to monitor these metrics and set alarms to alert you when specific metric thresholds are reached.

## Upgrade the VPC Endpoint Service

Navigate to your [AWS Marketplace Subscriptions](https://console.aws.amazon.com/marketplace) and select `Zilla Plus (Private MSK Proxy)` to show the details page. Then select `Launch CloudFormation stack` from the `Actions` menu in the `Agreement` section.

Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`, and then click `Continue to Launch`. Choose the action `Launch CloudFormation`, then click `Launch` to show the URL of the CloudFormation template.

Copy the CloudFormation template Amazon S3 URL and then select your existing CloudFormation Stack from a previous deployment of `Zilla Plus (Private MSK Proxy)`. Click `Update` and `Replace current template` with the copied Amazon S3 URL. Then complete the wizard to deploy the updated stack.

CloudFormation will incrementally deploy the MSK Proxy instances for the new version behind the same Network Load Balancer, checking for successful deployment before terminating the MSK Proxy instances for the previous version.

Connected clients will see their connections drop, and when they reconnect automatically, the Network Load Balancer will direct them to the new MSK Proxy instances. If the update is unsuccessful, then CloudFormation will rollback to use the previous stack deployment.
