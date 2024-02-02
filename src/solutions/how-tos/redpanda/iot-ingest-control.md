---
icon: aky-zilla-plus
description: Setup an IoT Ingest and Control MQTT Broker that lets clients publish messages and subscribe to topics that are proxied to Kafka topics in your Redpanda cluster.
tags:
  - Zilla Plus
---

# Redpanda IoT Ingest and Control

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

::: info Estimated time to complete 10-15 minutes.
:::

## Overview

The [Zilla Plus for Redpanda](https://aws.amazon.com/marketplace/pp/prodview-sj4kquyndubiu) IoT Ingest and Control MQTT Broker lets clients publish messages and subscribe to topics that are proxied to Kafka topics in your Redpanda cluster.

In this guide we will deploy the Zilla Plus for Redpanda IoT Ingest and Control, using the custom wildcard domain `*.example.aklivity.io`.

### AWS services used

| Service                     | Required                                                                       | Usage        | Quota                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------- |
| Secrets Manager             | Yes                                                                            | Startup only | [Not reached](https://docs.aws.amazon.com/general/latest/gr/asm.html#limits_secrets-manager) |
| Certificate Manager         | No<br><br>Private key and certificate can be inline in Secrets Manager instead | Startup only | [Not reached](https://docs.aws.amazon.com/general/latest/gr/acm.html#limits_acm)             |
| Private Certificate Manager | No<br><br>Private key and certificate can be inline in Secrets Manager instead | Startup only | [Not reached](https://docs.aws.amazon.com/general/latest/gr/acm-pca.html#limits_acm-pca)     |

Default [AWS Service Quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) are recommended.

## Prerequisites

Before setting up internet access to your Redpanda Cluster, you will need the following:

- an Redpanda Cluster configured for SASL/SCRAM authentication

::: tip
Check out the [Troubleshooting](./../aws-services/troubleshooting.md) guide if you run into any issues.
:::

### Create the Redpanda Cluster

> This creates your Redpanda cluster.

An Redpanda cluster is needed for access via the internet. The [Redpanda Quickstart](https://redpanda.com/try-redpanda) will walk you through creating one. You can skip this step if you have already created an Redpanda cluster with equivalent configuration. We will use the below resource names to reference the AWS resources needed in this guide.

- Cluster Name: `my-rp-cluster`
- Cluster Type: any
- Create Topics:
  - With cleanup policy "delete" to store MQTT messages: `mqtt-messages`
  - With cleanup policy "compact" to store MQTT retained messages: `mqtt-retained`
  - With cleanup policy "compact" to store MQTT sessions: `mqtt-sessions`

#### Create an API key

Follow the [Use API Keys to Control Access in Redpanda](https://docs.confluent.io/cloud/current/access-management/authenticate/api-keys/api-keys.html) instructions to create an API key and secret. Save the key and secret for use later.

### Create a Secret with Redpanda access params

> This creates a Secrets Manager secret with the necessary properties to access the Redpanda cluster.

Follow the [Store a new secret](https://console.aws.amazon.com/secretsmanager/newsecret) wizard with the following parameters and defaults.

::: note Locate your Bootstrap server URL
You can find your `<rp-bootstrap-server>` in your Redpanda [cluster settings](https://docs.confluent.io/cloud/current/clusters/broker-config.html#cluster-settings-console).
:::

- Secret Type: `Other type of secret`
- Value:
  - Plaintext JSON object:

    ```json
    {
      "sasl_username":"<rp-username>",
      "sasl_password":"<rp-password>",
      "bootstrap_server":"<rp-bootstrap-server>",
    }
    ```

- Secret Name: `zilla-rp-access`
- Review and store the secret

### Create the <ZillaPlus/> proxy VPC

> This creates your <ZillaPlus/> proxy VPC in preparation for access from an MQTT client.

[Create a VPC plus other VPC resources](https://docs.aws.amazon.com/vpc/latest/userguide/create-vpc.html#create-vpc-and-other-resources) with the below resource names.

- Name tag auto-generation: `my-rp-iot`
- VPC endpoints: `none`
- Create the VPC

### Create the <ZillaPlus/> proxy security group

> This creates your <ZillaPlus/> proxy security group to allow MQTT clients and SSH access.

A VPC security group is needed for the <ZillaPlus/> proxies when they are launched.

Follow the [Create Security Group](https://console.aws.amazon.com/vpcconsole/home#CreateSecurityGroup:) wizard with the following parameters and defaults. This creates your <ZillaPlus/> proxy security group to allow MQTT clients and SSH access.

::: note Check your selected region
Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`.
:::

- Name: `my-zilla-iot-proxy-sg`
- VPC: `my-rp-iot-vpc`
- Description: `MQTT clients and SSH access`
- Add Inbound Rule
  - Type: `CUSTOM TCP`
  - Port Range: `8883`
  - Source type: `Anywhere-IPv4`
- Add Inbound Rule
  - Type: `SSH`
  - Source type: `My IP`
- Add Outbound Rule (if not exists)
  - Type: `All traffic`
  - Destination: `Anywhere-IPv4`
- Create the Security Group

::: warning Check your network settings
Your IP may be different when you SSH into the EC2 instance. VPNs and other networking infrastructure may cause the `My IP` inbound rule to fail. Instead, you can use one of the other ways AWS provides to execute commands in an EC2 instance.
:::

Navigate to the VPC Management Console [Security Groups](https://console.aws.amazon.com/vpc/home#securityGroups:) table. Select the `my-zilla-iot-proxy-sg` security group you just created. You will create an inbound rule to allow all traffic inside itself.

- Add Inbound Rule
  - Type: `All Traffic`
  - Source type: `Custom`
  - Source: `my-zilla-iot-proxy-sg`

Add the `my-zilla-iot-proxy-sg` security group to your VPC Endpoint by finding your `my-rp-iot-vpce` from the [Endpoints table](https://console.aws.amazon.com/vpcconsole/home#Endpoints:).

- Select your VPC endpoint
- `Actions` menu > select `Manage Security Groups`
- Select both security groups:
  - `default`
  - `my-zilla-iot-proxy-sg`
- Save the changes

### Create the <ZillaPlus/> proxy IAM security role

> This creates an IAM security role to enable the required AWS services for the <ZillaPlus/> proxies.

Follow the [Create IAM Role](./../aws-services/create-iam-role.md) guide to create an IAM security role with the following parameters:

::: code-tabs

@tab Name

```text:no-line-numbers
my-zilla-iot-role
```

@tab Policies

```text:no-line-numbers
AWSCertificateManagerReadOnly
```

:::

#### IAM role Inline Policies

This creates an IAM security role to enable the required AWS services for the <ZillaPlus/> proxies.

::: code-tabs

@tab Name

```text:no-line-numbers
CCProxySecretsManagerRead
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
        "arn:aws:secretsmanager:*:*:secret:wildcard.example.aklivity.io-*",
        "arn:aws:secretsmanager:*:*:secret:zilla-cc-access-*"
      ]
    }
  ]
}
```

:::

::: info If you used a different secret name for your certificate key.

Replace `wildcard.example.aklivity.io` in the resource regular expression for:

```text:no-line-numbers
CCProxySecretsManagerRead
```

:::

## Subscribe via AWS Marketplace

The [Zilla Plus for Redpanda](https://aws.amazon.com/marketplace/pp/prodview-sj4kquyndubiu) is available through the AWS Marketplace. You can skip this step if you have already subscribed to Zilla Plus for Redpanda via AWS Marketplace.

To get started, visit the Proxy's Marketplace [Product Page](https://aws.amazon.com/marketplace/pp/prodview-sj4kquyndubiu) and `Subscribe` to the offering. You should now see `Zilla Plus for Redpanda` listed in your [AWS Marketplace](https://console.aws.amazon.com/marketplace) subscriptions.

## Create the Server Certificate

We need a TLS Server Certificate for your custom DNS wildcard domain that can be trusted by a MQTT client from anywhere.

Follow the [Create Server Certificate (LetsEncrypt)](./../aws-services/create-server-certificate-letsencrypt.md) guide to create a new TLS Server Certificate. Use your own custom wildcard DNS domain in place of the example wildcard domain `*.example.aklivity.io`.

::: info
Note the server certificate secret ARN as we will need to reference it from the IoT Ingest and Control CloudFormation template.
Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`.
:::

## Deploy the Zilla Plus IoT Ingest and Control Broker

> This initiates deployment of the Zilla Plus for Redpanda stack via CloudFormation.

Navigate to your [AWS Marketplace](https://console.aws.amazon.com/marketplace) subscriptions and select `Zilla Plus for Redpanda` to show the manage subscription page.

- From the `Agreement` section > `Actions` menu > select `Launch CloudFormation stack`
- Select the `CloudFormation Template` > `IoT Ingest and Control` fulfillment option
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
my-zilla-iot-proxy
```

:::

Parameters:

- Network Configuration
  - VPC: `my-rp-iot-vpc`
  - Subnets: `my-rp-iot-subnet-public-1a` `my-rp-iot-subnet-public-1b`
- Redpanda Configuration
  - Access Credentials and Bootstrap Server Secret ARN: `<zilla-rp-access secret ARN>` \*1
  - Kafka Topics:
    - messages: `mqtt-messages`
    - retained: `mqtt-retained`
    - sessions: `mqtt-sessions`
- Zilla Plus Configuration
  - Instance count: `2`
  - Instance type: `t3.small` \*2
  - Role: `my-zilla-iot-role`
  - Security Groups: `my-zilla-iot-proxy-sg`
  - Public Port: `8883`
  - Public TLS Certificate Key: `<TLS certificate private key secret ARN>` \*3
  - Public Wildcard DNS: `*.example.aklivity.io` \*4
  - Key pair for SSH access: `my-key-pair` \*5
- \*Configuration Reference
  1. This is the ARN of the created secret for the signed certificate's private key that was returned in the last step of the [Create Server Certificate (LetsEncrypt)](./../aws-services/create-server-certificate-letsencrypt.md) guide.
  2. Consider the network throughput characteristics of the AWS instance type as that will impact the upper bound on network performance.
  3. This is the ARN of the created secret for the signed certificate's private key that was returned in the last step of the [Create Server Certificate (LetsEncrypt)](./../aws-services/create-server-certificate-letsencrypt.md) guide.
  4. Replace with your own custom wildcard DNS pattern.
  5. Follow the [Create Key Pair](./../aws-services/create-key-pair.md) guide to create a new key pair to access EC2 instances via SSH.

### Step 3. Configure stack options: `(use defaults)`

### Step 4. Review

Confirm the stack details are correct and `Submit` to start the CloudFormation deploy.

::: info
When your <ZillaPlus/> proxy is ready, the [CloudFormation console](https://console.aws.amazon.com/cloudformation) will show `CREATE_COMPLETE` for the newly created stack.
:::

## Verify <ZillaPlus/> proxy Service

> This checks that the services and networking were properly configured.

Navigate to the [EC2 running instances dashboard.](https://console.aws.amazon.com/ec2/home#Instances:instanceState=running)

::: note Check your selected region
Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`.
:::

Select either of the <ZillaPlus/> proxies launched by the CloudFormation template to show the details.

::: info
They each have an IAM Role name starting with `my-zilla-iot-role`.
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

### Configure Global DNS

> This ensures that any new Kafka brokers added to the Redpanda cluster can still be reached via the <ZillaPlus/> proxy.

When using a wildcard DNS name for your own domain, such as `*.example.aklivity.io` then the DNS entries are setup in your DNS provider.

Navigate to the [CloudFormation console](https://console.aws.amazon.com/cloudformation). Then select the `my-zilla-iot-proxy` stack to show the details.

::: note Check your selected region
Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`.
:::

In the stack `Outputs` tab, find the public DNS name of the `NetworkLoadBalancer.`

You need to create a `CNAME` record mapping your public DNS wildcard pattern to the public DNS name of the Network Load Balancer.

::: info
You might prefer to use an Elastic IP address for each NLB public subnet, providing DNS targets for your `CNAME` record that can remain stable even after restarting the stack.
:::

## Verify MQTT Client Connectivity

To verify that we have successfully enabled public internet connectivity to our Redpanda cluster from the local development environment, we will use a generic MQTT client to create a topic, publish messages and then subscribe to receive these messages from our Redpanda cluster via the public internet.

### Connect with an MQTT Client

> This verifies MQTT client connectivity to your Redpanda cluster via Zilla Plus for Redpanda IoT Ingest and Control.

We can now verify that the MQTT client can successfully communicate with your Redpanda cluster.

::: warning
Replace these TLS server names accordingly for your own custom wildcard DNS pattern.
:::

### Subscribe to a topic

Using [eclipse-mosquitto](https://hub.docker.com/_/eclipse-mosquitto) subscribe to the `zilla` topic.

```bash:no-line-numbers
docker run -it --rm eclipse-mosquitto \
mosquitto_sub -V 'mqttv5' --topic 'zilla' \
--host 'mqtt.example.aklivity.io' --port 8883 --debug
```

### Publish to a topic

In a separate session, publish a message on the `zilla` topic.

```bash:no-line-numbers
docker run -it --rm eclipse-mosquitto \
mosquitto_pub -V 'mqttv5' --topic 'zilla' --message 'Hello, world' \
--host 'mqtt.example.aklivity.io' --port 8883 --debug
```

You should see the `Hello, world` message printed by the subscriber.

::: info Monitor the <ZillaPlus/> proxy

Follow the [Monitoring the <ZillaPlus/> proxy](./../aws-services/manage-cloudformation-stack.md#monitoring) instructions

:::

::: info Upgrade the <ZillaPlus/> proxy

Follow the [Upgrading the <ZillaPlus/> proxy](./../aws-services/manage-cloudformation-stack.md#upgrading) instructions

:::
