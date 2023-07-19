---
description: >-
  Create a new VPC with subnets in different multiple availability zones and
  internet connectivity.
---

# Create VPC

## Resource Parameters

The following parameters are needed when following these steps to create a new VPC.

* Name
* CIDR
* Region

Throughout this guide we use the following example VPC parameters.

* VPC
  * Name `my-vpc` and CIDR `10.0.0.0/16` in region `us-east-1`

The remaining resources derive their attributes from the VPC parameters.

* Subnets
  * Name `my-vpc-1a` and CIDR `10.0.1.0/24` in zone `us-east-1a`
  * Name `my-vpc-1b` and CIDR `10.0.2.0/24` in zone `us-east-1b`
  * Name `my-vpc-1c` and CIDR `10.0.3.0/24` in zone `us-east-1c`
* Internet Gateway
  * Name `my-vpc-igw`

When following this guide to create a specific VPC, replace the VPC name, CIDR and region as needed then derive the remaining resource attributes following the same pattern.

## Create the VPC

Navigate to the [VPC Management Console](https://console.aws.amazon.com/vpc) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Under the `Resources by Region` section, select the `VPCs` resource box to show `Your VPCs`. Click the `Create a VPC` button in the top right and fill out the `Create VPC` form with the following details:

Name tag: `my-vpc`\
IPv4 CIDR block: `10.0.0.0/16`

::: info
You can replace these VPC Name and CIDR example values with your desired values.
:::

Click `Create VPC.`

::: tip
This creates VPC `my-vpc` with CIDR `10.0.0.0/16` in region `us-east-1`.
:::

## Create the Subnets

VPC Subnets in different availability zones support High Availability for services running in a VPC and best practices recommend at least 3 availability zones.

Navigate to the [VPC Management Console](https://console.aws.amazon.com/vpc) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Under the `Resources by Region` section, select the `Subnets` resource box to show your `Subnets`. Click the `Create subnet` button in the top right and fill out the `Create subnet` form with the following details:

VPC ID: `vpc-xxx (my-vpc)`

### Subnet 1 of 3

Subnet name: `my-vpc-1a`\
Availability Zone: `us-east-1a`\
IPv4 CIDR block: `10.0.1.0/24`

### Subnet 2 of 3

Subnet name: `my-vpc-1b`\
Availability Zone: `us-east-1b`\
IPv4 CIDR block: `10.0.2.0/24`

### Subnet 3 of 3

Subnet name: `my-vpc-1c`\
Availability Zone: `us-east-1c`\
IPv4 CIDR block: `10.0.3.0/24`

::: info
You can replace the VPC ID, Subnet Name, CIDR and Availability Zone example values with your desired values.
:::

Click `Create subnet`.

::: tip
This creates 3 subnets in VPC `my-vpc` each in a different availability zone of region `us-east-1`.
:::

## Create the Internet Gateway

An Internet Gateway allows communication between your VPC and the internet.

Navigate to the [VPC Management Console](https://console.aws.amazon.com/vpc) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Under the `Resources by Region` section, select the `Internet Gateways` resource box to show your `Internet Gateways`. Click the `Create internet gateway` button in the top right and fill out the `Create internet gateway` form with the following details:

Name tag: `my-vpc-igw`

::: info
You can replace the Internet Gateway Name example value with your desired value.
:::

Click `Create internet gateway`.

::: tip
This creates Internet Gateway `my-vpc-igw`, not yet attached to any VPC.
:::

## Attach the Internet Gateway

An Internet Gateway must be attached to a VPC before any resources can become reachable from the internet.

When showing the details for your newly created `my-vpc-igw` Internet Gateway, select the `Attach to VPC` action from the `Actions` menu and fill out the `Attach to VPC` form with the following details:

Available VPCs: `my-vpc`

::: info
You can replace the VPC Name example value with your desired value.
:::

Click `Attach internet gateway`.

::: tip
This attaches Internet Gateway `my-vpc-igw` to VPC `my-vpc`.
:::

## Route to the Internet Gateway

Although traffic can be routed from the internet to resources in your VPC via an attached Internet Gateway, traffic cannot leave the VPC by default, so the Route Table must be updated.

Navigate to the [VPC Management Console](https://console.aws.amazon.com/vpc) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Under the `Resources by Region` section, select the `Route Tables` resource box to show your `Route tables`. Click on the Route table associated with the VPC named `my-vpc` to show the `Details` page.

Click the `Edit Routes` button in the `Routes` tab of the lower section and add a new route after all other routes, with the following details:

Destination: `0.0.0.0/0`\
Target: `Internet Gateway (my-vpc-igw)`

::: info
You can replace the target Internet Gateway Name example value with your desired value.
:::

Click `Save changes`.

::: tip
This allows network traffic to be routed between the internet and resources with public IP addresses on Subnets in the VPC.
:::
