---
description: >-
  Create a new MSK cluster with 3 brokers, each in a different availability
  zone, with mutual authentication.
---

# Create MSK Cluster (Mutual Trust)

## Resource Parameters

The following parameters are needed when following these steps to create a new MSK cluster.

* Name
* VPC
* Subnets
* Private Certificate Authority (ACM)

Throughout this guide we use the following example MSK cluster parameters.

* MSK Cluster
  * Name `aklivity`
* VPC
  * Name `my-msk-cluster` in region `us-east-1`
* Subnets
  * Name `my-msk-cluster-1a` in zone `us-east-1a`
  * Name `my-msk-cluster-1b` in zone `us-east-1b`
  * Name `my-msk-cluster-1c` in zone `us-east-1c`
* Private Certificate Authority
  * Name `Mutual Authentication CA`

## Create the MSK Cluster

Navigate to the [MSK Management Console](https://console.aws.amazon.com/msk) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Click the `Create cluster` button in the top right and fill out the `Create cluster` form with the following details:

Creation method: `Custom`\
Cluster name: `aklivity`

### Networking

VPC: `my-msk-cluster`\
Zones: `3`

#### First Zone

Zone: `us-east-1a`\
Subnet: `my-msk-cluster-1a`

#### Second Zone

Zone: `us-east-1b`\
Subnet: `my-msk-cluster-1b`

#### Third Zone

Zone: `us-east-1c`\
Subnet: `my-msk-cluster-1c`

### Brokers

Broker type: `kafka.t3.small`

### Storage

EBS storage volume per broker: `10 GiB`

### Security Settings

Access control methods: `TLS client authentication (ACM)`\
ACM Private CAs: `Mutual Authentication CA`

### Encryption

Between clients and brokers: `TLS Encryption`

### Monitoring

Amazon CloudWatch metrics: `Basic Monitoring`

::: info
You can replace these Cluster Name, VPC Name and Subnet example values with your desired values.
:::

Click `Create cluster`.

::: tip
This creates MSK cluster `my-msk-cluster` with 3 brokers, each in a different availability zone of region `us-east-1,` configured for TLS client authentication.
:::

::: warning
Note that it can take up to **15 minutes** for the MSK cluster to be created.
:::
