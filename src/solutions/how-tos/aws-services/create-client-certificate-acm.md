---
description: Create a AWS Certificate Manager client certificate to authenticate Kafka client identity.
---

# Create Client Certificate

You can use the following script to create a client certificate signed by an AWS Private Certificate Authority and upload the client private key to AWS SecretsManager.

::: details create_client_certificate.sh

```bash
#!/bin/bash

while [ $# -gt 0 ]; do
    if [[ $1 == "--"* ]]; then
        v="${1/--/}"
        v="${v//-/$'_'}"
        declare "$v"="$2"
        shift
    fi
    shift
done

programname=$0

function usage {
    echo ""
    echo "Creates signed client certificate and uploads client private key to SecretsManager"
    echo ""
    echo "usage: $programname --client-name string  --acm-pca-certificate-authority string"
    echo ""
    echo "  --client-name string                         name of the client"
    echo "                                               (example: client-1)"
    echo "  --acm-pca-certificate-authority string       AWS private certificate authority arn"
    echo "                                               (example: arn:aws:acm-pca:us-east-1..:certificate-authority)"
    echo ""
}

function die {
    printf "Script failed: %s\n\n" "$1"
    exit 1
}

if [[ -z $client_name ]]; then
    usage
    die "Missing parameter --client-name"
elif [[ -z $acm_pca_certificate_authority ]]; then
    usage
    die "Missing parameter --acm-pca-certificate-authority"
fi

set -ex

openssl genrsa -out "$client_name".key.pem 4096
openssl pkcs8 -topk8 -nocrypt -in "$client_name".key.pem -out "$client_name".pkcs8.pem

openssl req -new -key "$client_name".key.pem -out "$client_name".csr

aws acm-pca issue-certificate \
  --region us-east-1 \
  --certificate-authority-arn "$acm_pca_certificate_authority" \
  --csr fileb://"$client_name".csr \
  --signing-algorithm "SHA256WITHRSA" \
  --validity Value=365,Type="DAYS" \
  --idempotency-token 1234 > "$client_name".json

clientCertArn=$(jq -r '.CertificateArn' "$client_name".json)

aws secretsmanager create-secret \
  --region us-east-1 \
  --name "$client_name" \
  --secret-string file://"$client_name".pkcs8.pem \
  --tags "[{\"Key\":\"certificate-authority-arn\", \"Value\":\"$acm_pca_certificate_authority\"}, {\"Key\":\"certificate-arn\", \"Value\": \"$clientCertArn\"}]"

aws acm-pca get-certificate \
  --region us-east-1 \
  --certificate-arn "$clientCertArn" \
  --certificate-authority-arn "$acm_pca_certificate_authority" \
  --output text | sed "s/\t/\n/g" > "$client_name".cert
```

:::

## Resource Parameters

The following parameters are needed when following these steps to create a new client certificate using AWS Certificate Manager.

- Common Name
- Private Certificate Authority

Throughout this guide we use the following example client certificate parameters.

- Client Identity
  - Common Name `client-1`
- Private Certificate Authority
  - Name `Mutual Authentication CA`

## Create the Certificate Authority

If you do not already have one, follow the [Create Certificate Authority](./create-certificate-authority-acm.md) guide to create a new private certificate authority in AWS Certificate Manager.

::: info
Note the ARN of the private certificate authority.
:::

## Generate the RSA key

We need to create a new key that will be used with the certificate, and store the key in `pkcs8` format. In this example we will be creating the key for a client certificate with `client-1` as the common name.

```bash:no-line-numbers
openssl genrsa -out client-1.key.pem 4096
openssl pkcs8 -topk8 -nocrypt -in client-1.key.pem -out client-1.pkcs8.pem
```

## Create the signing request

Next we need to create a certificate corresponding to the key, with metadata about the owner of the certificate and the common name. This is done by first creating a certificate signing request.

```bash:no-line-numbers
openssl req -new -key client-1.key.pem -out client-1.csr
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
Common Name (eg, fully qualified host name) []:client-1
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

::: info
This creates the signing request in `client-1.csr`.
:::

## Issue the signed certificate

Now that the certificate signing request has been prepared, it can be used to issue a new certificate signed by your private certificate authority.

In this example, we issue the certificate to be valid for `365 days`. You should choose a validity period that best suits your specific use case.

```bash:no-line-numbers
aws acm-pca issue-certificate \
--region us-east-1 \
--certificate-authority-arn <private-certificate-authority-arn> \
--csr fileb://client-1.csr \
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

Now the signed certificate can be retrieved from AWS Private Certificate Authority using the .

```bash:no-line-numbers
aws acm-pca get-certificate \
--region us-east-1 \
--certificate-arn <client-certificate-arn>
--certificate-authority-arn <private-certificate-authority-arn>
--output text | sed "s/\t/\n/g" > client_1.cert
```

This returns the public signed client certificate chain associated with the client private key.

## Store the encrypted secret

Now we need to create the secret value using the `pkcs8` encoded private key as the secret value and with secret tags `certificate-authority-arn` referencing the private certificate authority, and `certificate-arn` referencing the newly signed certificate.

```bash:no-line-numbers
aws secretsmanager create-secret \
--region us-east-1 \
--name "client-1" \
--secret-string file://client-1.pkcs8.pem \
--tags '[{"Key":"certificate-authority-arn", "Value":"arn:aws:acm-pca:us-east-1:...:certificate-authority/..."}, {"Key":"certificate-arn", "Value":"arn:aws:acm-pca:us-east-1:...:certificate-authority/.../certificate/..."}]'
```

This secret can now be used by the Zilla Plus for Amazon MSK to resolve private keys and their corresponding signed certificates to support TLS client authentication.

::: info
Note the ARN of the newly created secret for the client certificate's private key.
:::

::: warning
In the example above, private certificates are valid for `365 days`, so you will need to renew the certificate and update the `secret-string` value and `certificate-arn` tag accordingly before expiration. The latest secret value and corresponding private certificate are obtained automatically upon restarting the Zilla proxy instance.
:::
