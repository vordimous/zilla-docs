---
description: Create a new VPC security group.
---

# Create Security Group

## Resource Parameters

The following parameters are needed when following these steps to create a new security group with inbound rules.

* VPC
* Name
* Description
* Inbound Rules
  * Type
  * Source

Throughout this guide we use the following example Security Group parameters.

* VPC
  * ID `vpc-xxx` with name `my-vpc` in region `us-east-1`
* Name `my-security-group`
* Description `Allow Kafka clients and SSH access`
* Inbound Rules
  * Type `TCP 9094` from source `0.0.0.0/0`
  * Type `SSH` from source `<My IP>`

## Create the Security Group

Navigate to the [VPC Management Console](https://console.aws.amazon.com/vpc) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Under the `Resources by Region` section, select the `Security Groups` resource box to show your `Security Groups`.

Click `Create security group` and fill out the `Create security group` form with the following details:

VPC: `my-vpc`\
Name: `my-security-group`\
Description: `Allow Kafka clients and SSH access`

In the `Inbound rules` section, click `Add rule` and fill in the new inbound rule with the following details.

Type: `Custom TCP`\
Port: `9094`\
Source: `0.0.0.0/0`

In the `Inbound rules` section, click `Add rule` and fill in the new inbound rule with the following details.

Type: `SSH`\
Source: `<My IP>`

Click `Create security group`

::: danger
Make sure to limit your security group inbound rules to least privilege, opening only the ports and source addresses necessary.
:::
