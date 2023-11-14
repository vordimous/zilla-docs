---
description: Create a new private certificate authority using AWS Certificate Manager.
---

# Create Certificate Authority (ACM)

## Resource Parameters

The following parameters are needed when following these steps to create a new VPC.

- Distinguished Name

Throughout this guide we use the following example certificate authority parameters.

- Distinguished Name
  - Common Name (CN) `Test CA`

## Create the CA

> This creates a new private certificate authority in ACM.

Navigate to the [Create private certificate authority (CA)](https://console.aws.amazon.com/acm-pca/home#/wizard) wizard.

::: note Check your selected region
Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`.
:::

- Mode options: `General-purpose`
- CA type options: `Root`
- Subject distinguished name options
  - Common Name (CN): `Test CA`
- Key algorithm options: `RSA 2048`
- Certificate revocation options: `(defaults)`
- Add Tags: `(defaults)`
- Configure CA permissions: `(defaults)`

Click `Create CA`.

::: info
Note the ARN of the newly created certificate authority.
:::

## Export the CA Certificate

Navigate to the [ACM PCA Management Console](https://console.aws.amazon.com/acm-pca/home#/certificateAuthorities).

::: note Check your selected region
Make sure you have selected the desired region, such as `US East (N. Virginia) us-east-1`.
:::

Select the `Test CA` certificate authority.

From the `Actions` menu > select `Get CA Certificate` then click `Export certificate body to a file` to download the CA certificate.

::: info
Note the `Certificate.pem` filename location where you download the CA certificate.
:::
