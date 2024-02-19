To verify that we have successfully enabled public internet connectivity to our Kafka cluster from the local development environment, we will use a generic Kafka client to create a topic, publish messages and then subscribe to receive these messages from our Kafka cluster via the public internet.

### Install the Kafka Client

First, we must install a Java runtime that can be used by the Kafka client.

```bash:no-line-numbers
sudo yum install java-1.8.0
```

Now we are ready to install the Kafka client:

```bash:no-line-numbers
wget https://archive.apache.org/dist/kafka/2.8.0/kafka_2.13-2.8.0.tgz
tar -xzf kafka_2.13-2.8.0.tgz
cd kafka_2.13-2.8.0
```

::: tip
We use a generic Kafka client here, however the setup for any Kafka client, including [KaDeck](https://www.xeotek.com/apache-kafka-monitoring-management/), [Conduktor](https://www.conduktor.io/download/), and [akhq.io](https://akhq.io/) will be largely similar. With the <ZillaPlus/> proxy you can use these GUI Kafka clients to configure and monitor your Kafka applications, clusters and streams.
:::
