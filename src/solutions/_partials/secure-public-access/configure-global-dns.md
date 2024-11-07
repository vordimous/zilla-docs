> This ensures that any new Kafka brokers added to the cluster can still be reached via the <ZillaPlus/> proxy.

When using a wildcard DNS name for your own domain, such as `*.example.aklivity.io` then the DNS entries are setup in your DNS provider.

Navigate to the [CloudFormation console](https://console.aws.amazon.com/cloudformation). Then select the `my-zilla-proxy` stack to show the details.

In the stack `Outputs` tab, find the public DNS name of the `NetworkLoadBalancer`. You need to create a `CNAME` record mapping your public DNS wildcard pattern to the public DNS name of the Network Load Balancer.

::: info
You might prefer to use an Elastic IP address for each NLB public subnet, providing DNS targets for your `CNAME` record that can remain stable even after restarting the stack.

For testing purposes you can edit your local `/etc/hosts` file instead of updating your DNS provider.
:::
