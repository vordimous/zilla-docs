---
description: Create a new IAM security role with managed or inline policies.
---

# Create IAM Role

## Resource Parameters

The following parameters are needed when following these steps to create a new security role with policies.

* Name
* Managed Policies
  * Name
* Inline Policies
  * Name
  * Summary

Throughout this guide we use the following example IAM Role parameters.

* Name `my-role`
* Managed Policies
  * Name `AWSMarketplaceMeteringFullAccess`
* Inline Policies
  * Name `MySecretsManagerRead`
  * Summary

      ```json:no-line-numbers
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
              "secretsmanager:GetSecretValue",
              "secretsmanager:DescribeSecret"
            ],
            "Resource": [
              "arn:aws:secretsmanager:*:*:secret*"
            ]
          }
        ]
      }
      ```

## Create the IAM Security Role

Navigate to the [IAM Management Console](https://console.aws.amazon.com/iam) and note the `Global` region.

Under the `Access management` section, select the `Roles` menu item to show your `Roles`.

Click `Create role` and fill out the `Create role` form with the following details:

Choose a use case: `EC2`

### Permissions

#### Managed Policy

Name: `AWSMarketplaceMeteringFullAccess`\
Type: `AWS managed policy`

### Tags

### Review

Role name: `my-role`\
Click `Create role`.

Now click the newly created role `my-role` to show the details so we can add inline policies.

Click on `+ Add inline policy` and fill out the `Create policy` form with the following parameters.

### Create policy

JSON (tab):

```json:no-line-numbers
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue",
        "secretsmanager:DescribeSecret"
      ],
      "Resource": [
        "arn:aws:secretsmanager:*:*:secret:*"
      ]
    }
  ]
}
```

### Review policy

Name: `MySecretsManagerRead`\
Click `Create policy` to create the inline policy so it shows in the `Permissions` for `my-role`.

::: danger
Make sure to limit your policies to least privilege, granting only the permissions necessary. This includes narrowing the regular expressions to match only the resources needed.
:::
