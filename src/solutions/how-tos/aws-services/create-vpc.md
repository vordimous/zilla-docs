---
description: Create a new VPC with subnets in different multiple availability zones and internet connectivity.
---

# Create VPC

If you need help creating a VPC follow the [Create a VPC plus other VPC resources](https://docs.aws.amazon.com/vpc/latest/userguide/create-vpc.html#create-vpc-and-other-resources) guide in the aws docs.

## Attach the Internet Gateway

> This attaches Internet Gateway `my-vpc-igw` to VPC `my-vpc`.

An Internet Gateway must be attached to a VPC before any resources can become reachable from the internet.

When showing the details for your newly created `my-vpc-igw` Internet Gateway, select the `Attach to VPC` action from the `Actions` menu and fill out the `Attach to VPC` form with the following details:

Available VPCs: `my-vpc`

::: info
You can replace the VPC Name example value with your desired value.
:::

Click `Attach internet gateway`.

## Route to the Internet Gateway

> This allows network traffic to be routed between the internet and resources with public IP addresses on Subnets in the VPC.

Although traffic can be routed from the internet to resources in your VPC via an attached Internet Gateway, traffic cannot leave the VPC by default, so the Route Table must be updated.

Navigate to the [VPC Management console.](https://console.aws.amazon.com/vpc)

::: note Check your selected region
Make sure you have selected the desired region, ex: `US East (N. Virginia) us-east-1`.
:::

Under the `Resources by Region` section, select the `Route Tables` resource box to show your `Route tables`. Click on the Route table associated with the VPC named `my-vpc` to show the `Details` page.

Click the `Edit Routes` button in the `Routes` tab of the lower section and add a new route after all other routes, with the following details:

Destination: `0.0.0.0/0`\
Target: `Internet Gateway (my-vpc-igw)`

::: info
You can replace the target Internet Gateway Name example value with your desired value.
:::

Click `Save changes`.
