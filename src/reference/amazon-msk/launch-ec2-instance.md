---
description: Launch an EC2 instance with remote SSH access.
---

# Launch EC2 Instance

## Resource Parameters

The following parameters are needed when following these steps to launch a new EC2 instance.

* VPC Name and Region
* Instance AMI and Type

Throughout this guide we use the following example EC2 Instance parameters.

* VPC
  * Name `my-vpc` in region `us-east-1`
* Instance
  * Name `Amazon Linux 2 AMI (HVM), SSD Volume Type, 64-bit (x86)`
  * Type `t3.small`

## Launch the EC2 instance

Navigate to the [EC2 Management Console](https://console.aws.amazon.com/ec2) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Under the `Resources by Region` section, select the `Instances` resource box to show your `Instances`. Click the `Launch instances` button and complete the wizard with the following details:

### Step1: Choose AMI: `Amazon Linux 2 AMI (HVM),` `SSD Volume Type,` `64-bit (x86)`

### Step2: Choose an Instance Type: `t3.micro`

### Step 3:Configure Instance Details

Network: `vpc-xxx (my-vpc)`\
Auto-assign Public IP: `enable`

### Step4: Add Storage: `(defaults)`

### Step5: Add Tags: `(defaults)`

### Step 6: Configure Security Group

Select an existing security group: `default VPC security group`

### Step7: Review Instance Launch: `(review)`

::: info
You can replace these AMI, Instance Type and Network VPC Name example values with your desired values.
:::

Click `Launch` and create a new key pair called `msk-proxy`, or select the existing one if you have already created a key pair called `msk-proxy`.

Click `Launch Instances`.

::: tip
This launches an EC2 instance in VPC `my-vpc`, not yet accessible via `SSH`.
:::

Follow the [Update Security Group](./update-security-group.md) guide with these parameters to enable SSH access to your EC2 instance.

VPC: `vpc-xxx (my-vpc)`\
Security Group: `default`

### Inbound Rule

Type: `SSH`\
Source: `0.0.0.0/0`

::: tip
This makes the launched EC2 instance accessible via `SSH`.
:::

## Access the EC2 Instance via SSH

Navigate to the [EC2 Management Console](https://console.aws.amazon.com/ec2) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Under the `Resources by Region` section, select the `Instances` resource box to show your `Instances`. Select your recently launched EC2 instance to see the instance details. Copy the `Public IPv4 address` to the clipboard and note the `Key pair name`.

Execute the following `ssh` command to access your EC2 instance.

```bash:no-line-numbers
ssh -i ~/.ssh/<instance-key-pair-name>.pem ec2-user@<instance-public-ipv4-address>
```

::: tip
This accesses your EC2 instance via `SSH`.
:::
