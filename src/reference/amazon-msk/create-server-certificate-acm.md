---
description: Create a server certificate signed by a private certificate authority using AWS Certificate Manager.
---

# Create Server Certificate (ACM)

## Create the Certificate Authority

Follow the [Create Certificate Authority (ACM)](./create-certificate-authority-acm.md) guide with these parameters to create a new private certificate authority in AWS Certificate Manager.

### Distinguished Name

Common Name (CN): `Test CA`

::: info
Note the ARN of the private certificate authority.
:::

## Generate the RSA key

We need to create a new key that will be used with the certificate, and store the key in `pkcs8` format. In this example we will be creating the key for a wildcard certificate with `*.aklivity.example.com` as the common name.

```bash:no-line-numbers
openssl genrsa -out wildcard.aklivity.example.com.key.pem 4096
openssl pkcs8 -topk8 -nocrypt -in wildcard.aklivity.example.com.key.pem -out wildcard.aklivity.example.com.pkcs8.pem
```

## Create the signing request

Next we need to create a certificate corresponding to the key, with metadata about the owner of the certificate and the common name. This is done by first creating a certificate signing request.

```bash:no-line-numbers
openssl req -new -key wildcard.aklivity.example.com.key.pem -out wildcard.aklivity.example.com.csr
```

```output:no-line-numbers
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:US
State or Province Name (full name) []:California
Locality Name (eg, city) []:Palo Alto
Organization Name (eg, company) []:Aklivity
Organizational Unit Name (eg, section) []:Development
Common Name (eg, fully qualified host name) []:*.aklivity.example.com
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

::: info
This creates the signing request in `wildcard.aklivity.example.com.csr`.
:::

## Issue the signed certificate

Now that the certificate signing request has been prepared, it can be used to issue a new certificate signed by your private certificate authority.

In this example, we issue the certificate to be valid for `365 days`. You should choose a validity period that best suits your specific use case.

```bash:no-line-numbers
aws acm-pca issue-certificate \
  --region us-east-1 \
  --certificate-authority-arn <private-certificate-authority-arn> \
  --csr fileb://wildcard.aklivity.example.com.csr \
  --signing-algorithm "SHA256WITHRSA" \
  --validity Value=365,Type="DAYS" \
  --idempotency-token 1234
```

This command returns the ARN of the newly signed certificate.

```json:no-line-numbers
{
    "CertificateArn": "arn:aws:acm-pca:us-east-1:...:certificate-authority/.../certificate/..."
}
```

::: info
Note the certificate ARN as we need to reference it later.
:::

::: warning
If you see the following error when attempting to run the command

`An error occurred (UnrecognizedClientException) when calling the IssueCertificate operation: The security token included in the request is invalid`

make sure that you have retrieved and set [your AWS credentials](https://aws.amazon.com/blogs/security/aws-single-sign-on-now-enables-command-line-interface-access-for-aws-accounts-using-corporate-credentials/) for CLI use.
:::

## Store the encrypted secret

Now we need to create the secret value using the `pkcs8` encoded private key as the secret value and with secret tags `certificate-authority-arn` referencing the private certificate authority, and `certificate-arn` referencing the newly signed certificate.

```bash:no-line-numbers
aws secretsmanager create-secret \
  --region us-east-1 \
  --name "wildcard.aklivity.example.com" \
  --secret-string file://wildcard.aklivity.example.com.pkcs8.pem \
  --tags '[{"Key":"certificate-authority-arn", "Value":"arn:aws:acm-pca:us-east-1:...:certificate-authority/..."}, {"Key":"certificate-arn", "Value":"arn:aws:acm-pca:us-east-1:...:certificate-authority/.../certificate/..."}]'
```

This secret can now be used by the Zilla Plus (Public MSK Proxy) to resolve private keys and their corresponding signed certificates to support custom TLS bootstrap server names.

::: info
Note the ARN of the newly created secret for the signed certificate's private key.
:::

::: warning
In the example above, private certificates are valid for `365 days`, so you will need to renew the certificate and update the secret value accordingly before expiration. The latest secret value and corresponding private certificate are obtained automatically upon restarting the MSK Proxy instance.
:::
