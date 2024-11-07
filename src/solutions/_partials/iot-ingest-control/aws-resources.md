We need to create the AWS resources necessary to allow access to the IoT Ingest and Control MQTT Broker from the internet, the <ZillaPlus/> proxy instances access to Secrets Manager secrets, and SSH access to the instances for troubleshooting.

### Create the VPC

> This creates your <ZillaPlus/> proxy VPC in preparation for access from an MQTT client.

[Create a VPC plus other VPC resources](https://docs.aws.amazon.com/vpc/latest/userguide/create-vpc.html#create-vpc-and-other-resources) with the below resource names.

- Name tag auto-generation: `my-zilla-iot-proxy`
- VPC endpoints: `none`
- Create the VPC

### Create the security group

> This creates your <ZillaPlus/> proxy security group to allow MQTT clients and SSH access.

A VPC security group is needed for the <ZillaPlus/> proxies when they are launched.

Follow the [Create Security Group](https://console.aws.amazon.com/vpcconsole/home#CreateSecurityGroup:) wizard with the following parameters and defaults. This creates your <ZillaPlus/> proxy security group to allow MQTT clients and SSH access.

::: note Check your selected region
Make sure you have selected the desired region, ex: `US East (N. Virginia) us-east-1`.
:::

- Name: `my-zilla-iot-proxy-sg`
- VPC: `my-zilla-iot-proxy-vpc`
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

### Create the IAM security role

> This creates an IAM security role to enable the required AWS services for the <ZillaPlus/> proxies.

Navigate to the [Create role](https://console.aws.amazon.com/iamv2/home#/roles/create) form and fill out the form with the following details:

- Region: `Global`
- Trusted Entity Type: `AWS Service`
- Choose a use case: `EC2`
- Add Permissions policies

  ```text:no-line-numbers
  AWSCertificateManagerReadOnly
  AmazonSSMManagedInstanceCore
  ```

- Role Name:

  ```text:no-line-numbers
  my-zilla-iot-role
  ```

Click `Create role`

Open the newly created role

- Use the `Add permissions` > `Create Inline Policy` action from the dropdown
- JSON Summary

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
          "arn:aws:secretsmanager:*:*:secret:<TLS certificate private key secret name>*",
          "arn:aws:secretsmanager:*:*:secret:<SASL/SCRAM auth secret name>*"
        ]
      }
    ]
  }
  ```

::: info If you used a different secret name.

The IAM role Inline policy uses the Secrets Manager ARN regex pattern `arn:aws:secretsmanager:*:*:secret:<Secret Name>*`. Make sure you replace the resources listed with the appropriate patterns.

:::

- Name

  ```text:no-line-numbers
  MyZillaIotProxySecretsManagerRead
  ```
