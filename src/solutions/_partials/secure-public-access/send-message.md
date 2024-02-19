#### Publish messages

Publish two messages to the newly created topic via the following producer command:

```bash:no-line-numbers
bin/kafka-console-producer.sh --topic zilla-proxy-test --producer.config client.properties --broker-list <tls-bootstrap-server-names>
```

A prompt will appear for you to type in the messages:

```output:no-line-numbers
>This is my first event
>This is my second event
```

#### Receive messages

Read these messages back via the following consumer command:

```bash:no-line-numbers
bin/kafka-console-consumer.sh --topic zilla-proxy-test --from-beginning --consumer.config client.properties --bootstrap-server <tls-bootstrap-server-names>
```

You should see the `This is my first event` and `This is my second event` messages.

```output:no-line-numbers
This is my first event
This is my second event
```
