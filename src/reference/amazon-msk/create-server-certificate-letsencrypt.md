---
description: >-
  Create a server certificate signed by a public certificate authority using
  LetsEncrypt.
---

# Create Server Certificate (LetsEncrypt)

Follow the [Launch EC2 Instance](./launch-ec2-instance.md) guide to launch an Amazon 2 Linux instance in a VPC with attached Internet Gateway.

After logging into the launched EC2 instance via SSH, install `certbot` to interact with [LetsEncrypt](https://letsencrypt.org/).

```shell:no-line-numbers
sudo amazon-linux-extras install -y epel
sudo yum install -y certbot
```

Then issue the wildcard certificate such as `*.example.aklivity.io`.

```shell:no-line-numbers
sudo certbot -d *.example.aklivity.io --manual --preferred-challenges dns certonly
```

This will require you to respond to the challenge by adding a custom DNS record proving ownership of the wildcard domain, such as `*.example.aklivity.io`.

When `certbot` completes, the relevant files for the certificate chain and private key have been generated, called `fullchain.pem and` `privkey.pem`.

```shell:no-line-numbers
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/example.aklivity.io/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/example.aklivity.io/privkey.pem
```

Now we need to prepare the secret value by combining these together:

```shell:no-line-numbers
touch wildcard.example.aklivity.io.pem
sudo cat /etc/letsencrypt/live/example.aklivity.io/privkey.pem >> wildcard.example.aklivity.io.pem
sudo cat /etc/letsencrypt/live/example.aklivity.io/fullchain.pem >> wildcard.example.aklivity.io.pem
```

Then we can create the secret, for example:

```shell:no-line-numbers
aws secretsmanager create-secret \
  --region us-east-1 \
  --name wildcard.example.aklivity.io \
  --secret-string file://wildcard.example.aklivity.io.pem
```

::: info
Note the returned secret ARN as it will be needed later.
:::

::: warning
LetsEncrypt certificates are [valid for 90 days](https://letsencrypt.org/docs/faq/#what-is-the-lifetime-for-let-s-encrypt-certificates-for-how-long-are-they-valid), so you will need to renew the certificate and update the secret value accordingly before expiration. The latest secret value is obtained automatically upon restarting the MSK Proxy instance.
:::
