---
description: Create a trusted key pair used for SSH access to EC2 instances.
---

# Create Key Pair

Navigate to the [EC2 Management Console](https://console.aws.amazon.com/ec2/v2) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Select `Key Pairs` from the `Networking and Security` section to view your `Key Pairs`.

Click `Create key pair` and fill out the `Create key pair` form with the following details:

Name: `my-key-pair`\
Key pair type: `RSA`\
Private key file format: `.pem`

Click `Create key pair`

::: tip
This creates a key pair that can be used for SSH access to EC2 instances.
:::
