---
description: Create a new MSK cluster with 3 brokers, each in a different availability zone.
---

# Create an MSK Cluster

The following parameters are needed when following these steps to create a new MSK cluster.

::: note Check your selected region
Make sure you have selected the desired region, ex: `US East (N. Virginia) us-east-1`.
:::

- Name
- VPC
- Subnets

## Create a VPC

If you haven't already created a VPC, go to the [Create VPC](https://console.aws.amazon.com/vpcconsole/home#CreateVpc:createMode=vpcWithResources) page to create a `VPC and more` for your MSK cluster with the following parameters.

- Name tag auto-generation: `my-msk-cluster`
- IPv4 CIDR block: `10.0.0.0/16`
- Number of Availability Zones: `3`

## Create the MSK Cluster

Start the [Create MSK cluster](https://console.aws.amazon.com/msk/home#/cluster/create?isCustomCreate=true&isProvisionedCreate=true) wizard.

### Step 1: Cluster Settings

- Creation method: `Custom create`
- Cluster name: `my-msk-cluster`
- Cluster type: `Provisioned`
- Specify your desired settings

::: info For a small evaluation MSK use these settings
Broker: `kafka.t3.small`\
Storage: `10 GiB`
:::

### Step 2: Networking

- VPC: `my-msk-cluster-vpc`
- For each of the 3 Zones
  - Subnet: `my-msk-cluster-subnet-public*`

### Step 3: Security Settings

- Access control methods:
  - `SASL/SCRAM authentication`
  > -- or --
  - For mTLS
    - `TLS client authentication`
    - ACM Private CAs: `Mutual Authentication CA`
  > -- or --
  - `Unauthenticated access`

- Encryption
  - Between clients and brokers: `TLS Encryption`

### Step 4: Monitoring and tags

- Specify your desired settings

### Step 5: Review and create

Check to make sure all of the settings are correct and click `Create Cluster`.
