---
description: >-
  Discover the wildcard DNS pattern matching all bootstrap server names in an
  MSK cluster.
---

# Lookup MSK Server Names

Navigate to the [MSK Management Console](https://console.aws.amazon.com/msk) and make sure you have selected the desired region in the upper right corner, such as `US East (N. Virginia) us-east-1`. Then click on your MSK cluster name to see the details.

::: info
If you followed the [Create MSK Cluster](./create-msk-cluster.md) guide or the [Create MSK Cluster (Mutual Trust)](./create-msk-cluster-mutual-trust.md) guide then click on the MSK cluster named `aklivity` to see the details.
:::

Click `View client information` in the `Cluster summary` section to show the `Client integration information`.

The `Bootstrap servers` `TLS` section shows multiple DNS names with ports, such as:

- b-1.`[name].[id].[instance].kafka.[region].amazonaws.com:9094`
- b-2.`[name].[id].[instance].kafka.[region].amazonaws.com:9094`
- b-3.`[name].[id].[instance].kafka.[region].amazonaws.com:9094`

Each of these bootstrap server names are in the format:

- b-#.`[name].[id].[instance].kafka.[region].amazonaws.com:9094`

The remainder of the DNS name after `b-#` is the same for the DNS name of each Kafka server in your MSK cluster, so the wildcard DNS pattern is:

- \*.`[name].[id].[instance].kafka.[region].amazonaws.com`

::: info
Note that the colon and port number are _not_ included in the wildcard DNS pattern.
:::
