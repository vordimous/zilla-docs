---
description: A variable syntax for inserting values into the zilla.yaml
---

# Resolvers

Resolvers are a variable syntax for executing zilla runtime functions that insert dynamic values into the zilla.yaml. Validation occurs before and after resolvers have been converted.

:::: note Functions

- [Environment Variables](#environment-variables)
- [AWS Secrets Manager](#aws-secrets-manager)

::::

## Functions

### Environment Variables

The `env` resolver will read the specified environment variable from the host.

```text:no-line-numbers
${{ env.<Env_Var_Name> }}
```

### AWS Secrets Manager

The `aws.secrets` resolver can fetch an AWS Secrets Manager secret by its name (also called secretId) or its ARN.

```text:no-line-numbers
${{ aws.secrets.<Secret_Name> }}
${{ aws.secrets.<Secret_ARN> }}
```

If the secret is a key/value or JSON object this resolver can fetch individual properties by appending a `#` with the property name.

```text:no-line-numbers
${{ aws.secrets.<Secret_Name>#<JSON_Property_Name> }}
${{ aws.secrets.<Secret_ARN>#<JSON_Property_Name> }}
```
