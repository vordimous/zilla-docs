When the MSK cluster is created you will need to follow the [Sign-in credentials authentication with AWS Secrets Manager](https://docs.aws.amazon.com/msk/latest/developerguide/msk-password.html) to associate your `AmazonMSK_*` secret to your cluster. There will be a prompt on the cluster summary page to create a new secret or associate an existing one. For the remainder of this doc we will assume the following values for this secret:

- Secret Type: `Other type of secret`
- Value:

  - Plaintext JSON object:

  ```json:no-line-numbers
  {
    "username": "alice",
    "password": "alice-secret"
  }
  ```

- Encryption key: `<Customer managed key>`
- Secret Name: `AmazonMSK_access`
- Review and store the secret

::: danger Important
A secret created with the default AWS KMS key cannot be used with an Amazon MSK cluster.
:::
