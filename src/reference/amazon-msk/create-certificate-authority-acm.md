---
description: Create a new private certificate authority using AWS Certificate Manager.
---

# Create Certificate Authority (ACM)

## Resource Parameters

The following parameters are needed when following these steps to create a new VPC.

* Distinguished Name

Throughout this guide we use the following example certificate authority parameters.

* Distinguished Name
  * Common Name (CN) `Test CA`

## Create the CA

Navigate to the [ACM PCA Management Console](https://console.aws.amazon.com/acm-pca) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Click `Create CA` to complete the `Create certificate authority` wizard with the following details:

### Step1: Select CA type: `Root CA`

### Step 2: Configure CA subject name

Common Name (CN): `Test CA`

### Step3: Configure CA key algorithm: `RSA 2048`

### Step4: Configure revocation: `(defaults)`

### Step5: Add Tags: `(defaults)`

### Step6: Configure CA permissions: `(defaults)`

### Step 7: Review and create

Pricing: `Click to confirm`\
Click `Confirm and create`.

::: tip
This creates a new private certificate authority in ACM.
:::

::: info
Note the ARN of the newly created certificate authority.
:::

## Export the CA Certificate

Navigate to the [ACM PCA Management Console](https://console.aws.amazon.com/acm-pca) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`.

Select the `Test CA` certificate authority and choose `Get Certificate` from the `Actions` menu, then click `Export to a file` to download the certificate authority certificate.

::: info
Note the `Certificate.cer` filename location where you download the CA certificate.
:::
