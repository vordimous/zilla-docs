---
description: Create a new IAM security role with managed or inline policies.
---

# Create IAM Role

## Resource Parameters

Throughout this guide we use the following example IAM Role parameters.

- Role Name: `my-role`

- Managed Policies:

::: code-tabs

@tab Name

```text:no-line-numbers
AWSMarketplaceMeteringFullAccess
```

:::

- Inline Policies:

::: code-tabs

@tab Name

```text:no-line-numbers
MySecretsManagerRead
```

@tab JSON Summary

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

:::

## Create the IAM Security Role

Navigate to the [Create role](https://console.aws.amazon.com/iamv2/home#/roles/create) form and fill out the form with the following details:

- Region: `Global`
- Choose a use case: `EC2`
- Add Permissions
  - Policy name: `AWSMarketplaceMeteringFullAccess`
  - Type: `AWS managed`
- Role name: `my-role`

Click `Create role`

### Specify Permissions

Now click the newly created role `my-role` to show the details so we can add inline policies.

In the Permissions policies section in the `Add Permissions` dropdown click on `Create inline policy`.

In the `Policy editor` specify `JSON` and add the below policy.

::: code-tabs

@tab JSON

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

:::

### Review policy

- Policy name: `MySecretsManagerRead`

Click `Create policy` to create the inline policy so it shows in the `Permissions` for `my-role`.

::: danger
Make sure to limit your policies to least privilege, granting only the permissions necessary. This includes narrowing the regular expressions to match only the resources needed.
:::
