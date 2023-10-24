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
              prefix: "exporter/",
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
      text: "Amazon MSK",
      prefix: "amazon-msk/",
      children: "structure",
    },
    {
      text: "Troubleshooting",
      prefix: "troubleshooting/",
      children: "structure",
    },
  ],
  "/": [
    {
      text: "Installing Zilla",
      link: "how-tos/install.md",
    },
    {
      text: "Quickstart",
      link: "tutorials/quickstart/kafka-proxies",
    },
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
        {
          text: "Add Prometheus Metrics",
          link: "tutorials/metrics/prometheus-intro.md",
        },
      ],
    },
    {
      text: "Kafka Proxying",
      link: "concepts/kafka-proxies/rest-proxy.md",
      children: [
        {
          text: "REST Kafka Proxy",
          collapsible: true,
          link: "concepts/kafka-proxies/rest-proxy.md",
          children: [
            {
              text: "Overview",
              link: "concepts/kafka-proxies/rest-proxy.md",
            },
            {
              text: "Create a Simple REST API",
              link: "tutorials/rest/rest-intro.md",
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
          text: "SSE Kafka Proxy",
          collapsible: true,
          link: "concepts/kafka-proxies/sse-proxy.md",
          children: [
            {
              text: "Overview",
              link: "concepts/kafka-proxies/sse-proxy.md",
            },
            {
              text: "Create a Simple SSE Stream",
              link: "tutorials/sse/sse-intro.md",
            },
            {
              text: "Build a CQRS Todo App",
              link: "tutorials/sse/sse-todo-build.md",
              children: [
                {
                  text: "Application Setup",
                  link: "tutorials/sse/sse-todo-build.md",
                },
                {
                  text: "Adding Auth",
                  link: "tutorials/sse/sse-todo-secure.md",
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
        {
          text: "Amazon MSK Pubic Proxy",
          collapsible: true,
          icon: "plus",
          prefix: "how-tos/amazon-msk/",
          link: "how-tos/amazon-msk/public-proxy.md",
          children: [
            {
              text: "Overview",
              link: "public-proxy.md",
            },
            "development.md",
            "production.md",
            "production-mutual-trust.md",
          ],
        },
        {
          text: "Amazon MSK Private Proxy",
          icon: "plus",
          link: "how-tos/amazon-msk/private-proxy.md",
        },
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
        {
          text: "Amazon MSK",
          link: "amazon-msk/",
        },
        "troubleshooting/",
      ],
    },
  ],
});
