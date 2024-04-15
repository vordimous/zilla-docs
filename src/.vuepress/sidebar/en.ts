import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/reference/": [
    {
      text: "VS Code extension",
      link: "vscode/README.md",
    },
    {
      text: "Zilla Runtime",
      prefix: "config/",
      link: "config/zilla-cli.md",
      children: [
        {
          text: "CLI (zilla)",
          link: "zilla-cli.md",
        },
        {
          text: "Config Overview",
          link: "overview.md",
        },
        {
          text: "Resolvers",
          link: "resolvers.md",
        },
        {
          text: "Bindings",
          prefix: "bindings/",
          link: "bindings/",
          children: "structure",
        },
        {
          text: "Guards",
          prefix: "guards/",
          link: "guards/",
          children: "structure",
        },
        {
          text: "Vaults",
          prefix: "vaults/",
          link: "vaults/",
          children: "structure",
        },
        {
          text: "Catalogs",
          prefix: "catalogs/",
          link: "catalogs/",
          children: "structure",
        },
        {
          text: "Models",
          prefix: "models/",
          link: "models/",
          children: "structure",
        },
        {
          text: "Telemetry",
          prefix: "telemetry/",
          link: "telemetry/",
          children: [
            {
              text: "Metrics",
              prefix: "metrics/",
              children: "structure",
            },
            {
              text: "Exporters",
              prefix: "exporters/",
              children: "structure",
            },
          ],
        },
      ],
    },
    {
      text: "Zilla Manager",
      prefix: "manager/",
      link: "manager/zpm-cli.md",
      children: [
        {
          text: "CLI (zpm)",
          link: "zpm-cli.md",
        },
        {
          text: "Config Overview",
          link: "overview.md",
        },
      ],
    },
    {
      text: "AWS",
      prefix: "aws/",
      children: "structure",
    },
    {
      text: "Troubleshooting",
      prefix: "troubleshooting/",
      children: "structure",
    },
  ],
  "/solutions/": [
    {
      text: "Secure Public Access",
      icon: "aky-zilla-plus",
      link: "concepts/kafka-proxies/secure-public-access.md",
      children: [
        {
          text: "Overview",
          link: "concepts/kafka-proxies/secure-public-access.md",
        },
        {
          text: "Amazon MSK",
          collapsible: true,
          prefix: "how-tos/amazon-msk/secure-public-access/",
          link: "how-tos/amazon-msk/secure-public-access/overview.md",
          children: [
            {
              text: "Overview",
              link: "overview.md",
            },
            {
              text: "via SASL/SCRAM",
              link: "production.md",
            },
            {
              text: "via mTLS",
              link: "production-mutual-tls.md",
            },
            {
              text: "via Unauthorized access",
              link: "development.md",
            },
          ],
        },
        {
          text: "Confluent Cloud",
          link: "how-tos/confluent-cloud/secure-public-access.md",
        },
      ],
    },
    {
      text: "IoT Ingest and Control",
      icon: "aky-zilla-plus",
      link: "concepts/kafka-proxies/iot-ingest-control.md",
      children: [
        {
          text: "Overview",
          link: "concepts/kafka-proxies/iot-ingest-control.md",
        },
        {
          text: "Amazon MSK",
          link: "how-tos/amazon-msk/iot-ingest-control.md",
        },
        {
          text: "Confluent Cloud",
          link: "how-tos/confluent-cloud/iot-ingest-control.md",
        },
        {
          text: "Redpanda",
          link: "how-tos/redpanda/iot-ingest-control.md",
        },
      ],
    },
    {
      text: "Other Resources",
      children: [
        {
          text: "AWS",
          prefix: "how-tos/aws-services/",
          link: "how-tos/aws-services/",
          children: "structure"
        },
      ]
    },
  ],
  "/": [
    {
      text: "Configuration",
      link: "concepts/config-intro.md",
      children: [
        {
          text: "Intro to zilla.yaml",
          link: "concepts/config-intro.md",
        },
        {
          text: "Connecting to Kafka",
          collapsible: true,
          prefix: "how-tos/connecting-to-kafka/",
          link: "how-tos/connecting-to-kafka/apache-kafka.md",
          children: [
            "apache-kafka.md",
            "aiven.md",
            "amazon-msk.md",
            "confluent-cloud.md",
            "redpanda.md",
          ],
        },
      ],
    },
    {
      text: "Deploy & Operate",
      link: "how-tos/deploy-operate.md",
      children: [
        {
          text: "Installing Zilla",
          link: "how-tos/deploy-operate.md",
        },
        {
          text: "Add Prometheus Metrics",
          link: "tutorials/metrics/prometheus-intro.md",
        },
      ],
    },
    {
      text: "Kafka Proxying",
      link: "concepts/kafka-proxies/http-proxy.md",
      children: [
        {
          text: "HTTP Kafka Proxy",
          collapsible: true,
          link: "concepts/kafka-proxies/http-proxy.md",
          children: [
            {
              text: "Overview",
              link: "concepts/kafka-proxies/http-proxy.md",
            },
            {
              text: "Create a Simple CRUD API",
              link: "tutorials/rest/rest-intro.md",
            },
            {
              text: "Create a Simple SSE Stream",
              link: "tutorials/sse/sse-intro.md",
            },
            {
              text: "Build a CQRS Todo App",
              link: "tutorials/todo-app/build.md",
              children: [
                {
                  text: "Application Setup",
                  link: "tutorials/todo-app/build.md",
                },
                {
                  text: "Adding Auth",
                  link: "tutorials/todo-app/secure.md",
                },
              ],
            },
          ],
        },
        {
          text: "gRPC Kafka Proxy",
          collapsible: true,
          link: "concepts/kafka-proxies/grpc-proxy.md",
          children: [
            {
              text: "Overview",
              link: "concepts/kafka-proxies/grpc-proxy.md",
            },
            {
              text: "Expose a Simple gRPC Server",
              link: "tutorials/grpc/grpc-intro.md",
            },
            {
              text: "Implement the Route Guide example",
              link: "how-tos/grpc/grpc.route-guide.service.md",
            },
          ],
        },
        {
          text: "MQTT Kafka Proxy",
          collapsible: true,
          link: "concepts/kafka-proxies/mqtt-proxy.md",
          children: [
            {
              text: "Overview",
              link: "concepts/kafka-proxies/mqtt-proxy.md",
            },
            {
              text: "Create a Simple MQTT Broker",
              link: "tutorials/mqtt/mqtt-intro.md",
            },
            {
              text: "Running an MQTT Kafka broker",
              link: "how-tos/mqtt/mqtt.kafka.broker.md",
            },
            {
              text: "Run the Taxi Demo",
              link: "https://github.com/aklivity/zilla-demos/tree/main/taxi",
            },
          ],
        },
      ]
    },
    {
      text: "Solutions",
      prefix: "solutions/",
      children: [
        "concepts/kafka-proxies/secure-public-access.md",
        "concepts/kafka-proxies/iot-ingest-control.md",
      ],
    },
    {
      text: "Reference",
      prefix: "reference/",
      link: "reference/config/overview.md",
      children: [
        "vscode/",
        "config/bindings/",
        "config/guards/",
        "config/vaults/",
        "config/telemetry/",
        "config/catalogs/",
        "config/models/",
      ],
    },
  ],
});
