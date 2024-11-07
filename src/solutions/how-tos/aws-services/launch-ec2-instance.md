---
description: Launch an EC2 instance with remote SSH access.
---

# Launch EC2 Instance

> This launches an EC2 instance in VPC `my-vpc`, not yet accessible via `SSH`.

## Resource Parameters

The following parameters are needed when following these steps to launch a new EC2 instance.

- VPC Name and Region
- Instance AMI and Type

Throughout this guide we use the following example EC2 Instance parameters.

- VPC
  - Name `my-vpc` in region `us-east-1`
- Instance
  - Name `Amazon Linux AMI (HVM) 64-bit (x86)`
  - Type `t2.micro`

## Launch the EC2 instance

Navigate to the [EC2 Launch an instance](https://console.aws.amazon.com/ec2/home#LaunchInstances:) form.

::: note Check your selected region
Make sure you have selected the desired region, ex: `US East (N. Virginia) us-east-1`.
:::

Complete the wizard with the following details:

- AMI: `Amazon Linux AMI (HVM) 64-bit (x86)`
- Instance Type: `t2.micro`
- Create a new key pair called `my-key-pair` or select the existing one
- Network settings
  - Network: `vpc-xxx (my-vpc)`
  - Auto-assign Public IP: `enable`
  - Firewall (security groups)
    - Select an existing security group: `default VPC security group`
- Configure storage: `(defaults)`

::: info
You can replace these AMI, Instance Type and Network VPC Name example values with your desired values.
:::

Click `Launch`

Navigate to the VPC Management Console [Security Groups](https://console.aws.amazon.com/vpc/home#securityGroups:) table.

::: note Check your selected region
Make sure you have selected the desired region, ex: `US East (N. Virginia) us-east-1`.
:::

Filter the security groups by selecting a `VPC` and select the `default` security group.

- VPC: `vpc-xxx (my-vpc)`
- Security Group: `default`
- Edit Inbound Rules
- Add Inbound Rule
  - Type: `SSH`
  - Source type: `My IP`
- Add Outbound Rule (if not exists)
  - Type: `All traffic`
  - Destination: `Anywhere-IPv4`

::: info
This makes the launched EC2 instance accessible via `SSH`.
:::

## Access the EC2 Instance via SSH

> This accesses your EC2 instance via `SSH`.

Navigate to the [EC2 running instances dashboard.](https://console.aws.amazon.com/ec2/home#Instances:instanceState=running)

::: note Check your selected region
Make sure you have selected the desired region, ex: `US East (N. Virginia) us-east-1`.
:::

Select your recently launched EC2 instance to see the instance details. Copy the `Public IPv4 address` to the clipboard and note the `Key pair name`.

Execute the following `ssh` command to access your EC2 instance.

```bash
ssh -i ~/.ssh/<instance-key-pair-name>.pem ec2-user@<instance-public-ipv4-address>
```
