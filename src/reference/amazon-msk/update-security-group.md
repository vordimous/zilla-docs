---
description: Add a new inbound rule to a VPC security group.
---

# Update Security Group

## Resource Parameters

The following parameters are needed when following these steps to add a new security group inbound rule.

* VPC
* Security Group
* Inbound Rule
  * Type
  * Source

Throughout this guide we use the following example Security Group parameters.

* VPC
  * ID `vpc-xxx` with name `my-vpc` in region `us-east-1`
* Security Group
  * Name `default`
* Inbound Rule
  * Type `SSH` from source `0.0.0.0/0`

## Update the Security Group

Navigate to the [VPC Management Console](https://console.aws.amazon.com/vpc) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Under the `Resources by Region` section, select the `Security Groups` resource box to show your `Security Groups`. Select `Security Group` named `default` for VPC `my-vpc` and select `Edit inbound rules` from the `Actions` menu.

Click `Add rule` and fill in the new inbound rule with the following details.

Type: `SSH`\
Source: `0.0.0.0/0`

Click `Save rules`
