> This checks that the services and networking were properly configured. These checks aren't necessary if the service is running as expected.

Navigate to the [EC2 running instances dashboard.](https://console.aws.amazon.com/ec2/home#Instances:instanceState=running)

::: note Check your selected region
Make sure you have selected the desired region, ex: `US East (N. Virginia) us-east-1`.
:::

Select either of the <ZillaPlus/> proxies launched by the CloudFormation template to show the details.

::: info
They each have an IAM Role name starting with `my-zilla-iot-role`.
:::

Find the `Public IPv4 Address` and then SSH into the instance.

```bash
ssh -i ~/.ssh/<key-pair.cer> ec2-user@<instance-public-ip-address>
```

After logging in via SSH, check the status of the `zilla-plus` system service.

::: tabs

@tab Service is running

Verify that the `zilla-plus` service is active and logging output similar to that shown below.

```bash
systemctl status zilla-plus.service
```

```output:no-line-numbers
zilla-plus.service - Zilla Plus
   Loaded: loaded (/etc/systemd/system/zilla-plus.service; enabled; vendor preset: disabled)
   Active: active (running) since...
```

@tab Check Ports

Check for the active ports with `netstat`.

```bash
netstat -ntlp
```

```output:no-line-numbers
tcp6    0    0 :::9092    :::*    LISTEN    1726/.zpm/image/bin
```

@tab Check Zilla Logs

You can get an stdout dump of the `zilla-plus.service` using `journalctl`.

```bash
journalctl -e -u zilla-plus.service | tee -a /tmp/zilla.log
```

```output:no-line-numbers
systemd[1]: Started zilla-plus.service - Zilla Plus.
...
```

@tab Check Cloud Init Logs

All output from cloud-init is captured by default to `/var/log/cloud-init-output.log`. There shouldn't be any errors in this log.

```bash
cat /var/log/cloud-init-output.log
```

```output:no-line-numbers
Cloud-init v. 22.2.2 running 'init'...
```

:::
