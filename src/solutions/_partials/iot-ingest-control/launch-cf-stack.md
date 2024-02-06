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
  - VPC: `my-zilla-iot-proxy-vpc`
  - Subnets: `my-zilla-iot-proxy-subnet-public-1a` `my-zilla-iot-proxy-subnet-public-1b`
- Confluent Cloud Configuration
  - Access Credentials and Bootstrap Server Secret ARN: `<my-zilla-iot-access-secret secret ARN>` \*1
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
  - Public Wildcard DNS: `*.example.aklivity.io` \*3
  - Public TLS Certificate Key: `<TLS certificate private key secret ARN>` \*4
  - Key pair for SSH access: `my-key-pair` \*5
- \*Configuration Reference
  1. This is the ARN for the secret created in the the [Create a Secret with SASL/SCRAM authentication params](#create-a-secret-with-sasl-scram-authentication-params) step of this guide.
  2. Consider the network throughput characteristics of the AWS instance type as that will impact the upper bound on network performance.
  3. Replace with your own custom wildcard DNS pattern mentioned in the [Prerequisites](#prerequisites) of this guide.
  4. This is the ARN of the created secret for the signed certificate's private key mentioned in the [Prerequisites](#prerequisites) of this guide.
  5. Follow the [Create Key Pair](../../how-tos/aws-services/create-key-pair.md) guide to create a new key pair to access EC2 instances via SSH.

### Step 3. Configure stack options: `(use defaults)`

### Step 4. Review

Confirm the stack details are correct and `Submit` to start the CloudFormation deploy.

::: info
When your <ZillaPlus/> proxy is ready, the [CloudFormation console](https://console.aws.amazon.com/cloudformation) will show `CREATE_COMPLETE` for the newly created stack.
:::

### Configure Global DNS

> This enables MQTT clients to connect to the <ZillaPlus/> proxy via your custom DNS wildcard domain.

When using a wildcard DNS name for your own domain, such as `*.example.aklivity.io` then the DNS entries are setup in your DNS provider.

Navigate to the [CloudFormation console](https://console.aws.amazon.com/cloudformation). Then select the `my-zilla-iot-proxy` stack to show the details.

In the stack `Outputs` tab, find the public DNS name of the `NetworkLoadBalancer`. You need to create a `CNAME` record mapping your public DNS wildcard pattern to the public DNS name of the Network Load Balancer.

::: info
You might prefer to use an Elastic IP address for each NLB public subnet, providing DNS targets for your `CNAME` record that can remain stable even after restarting the stack.

For testing purposes you can edit your local `/etc/hosts` file instead of updating your DNS provider.
:::
