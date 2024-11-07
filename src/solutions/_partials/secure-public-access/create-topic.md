Use the Kafka client to create a topic called `zilla-proxy-test`, replacing `<tls-bootstrap-server-names>` in the command below with the TLS proxy names of your <ZillaPlus/> proxy:

```bash
bin/kafka-topics.sh --create --topic zilla-proxy-test --partitions 3 --replication-factor 3 --command-config client.properties --bootstrap-server <tls-bootstrap-server-names>
```
