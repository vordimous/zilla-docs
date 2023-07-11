import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/reference/": [
    "vscode/README.md",
    {
      text: "Zilla Configuration",
      collapsible: false,
      prefix: "config/",
      link: "config/overview.md",
      children: [
        {
          text: "zilla.yaml Overview",
          link: "overview.md",
        },
        {
          text: "CLI (zilla)",
          link: "zilla-cli.md",
        },
        {
          text: "Bindings",
          collapsible: false,
          prefix: "bindings/",
          children: "structure",
        },
        {
          text: "Guards",
          collapsible: false,
          prefix: "guards/",
          children: "structure"
        },
        {
          text: "Vaults",
          collapsible: false,
          prefix: "vaults/",
          children: "structure"
        },
        {
          text: "Telemetry",
          collapsible: false,
          prefix: "telemetry/",
          children: [
            {
              text: "Metrics",
              collapsible: false,
              prefix: "metrics/",
              children: "structure"
            },
            {
              text: "Exporters",
              collapsible: false,
              prefix: "exporter/",
              children: "structure"
            },
          ],
        },
      ],
    },
    {
      text: "Zilla Manager",
      collapsible: false,
      prefix: "manager/",
      link: "manager/overview.md",
      children: [
        {
          text: "zpm Overview",
          link: "overview.md",
        },
        {
          text: "CLI (zpm)",
          link: "zpm-cli.md",
        },
      ],
    },
    {
      text: "Amazon MSK",
      collapsible: true,
      prefix: "amazon-msk/",
      link: "amazon-msk/",
      children: "structure",
    },
    {
      text: "Troubleshooting",
      collapsible: true,
      prefix: "troubleshooting/",
      link: "troubleshooting/",
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
      link: "tutorials/quickstart/",
    },
    {
      text: "Configuration",
      collapsible: false,
      link: "concepts/config-intro.md",
      children: [
        {
          text: "Intro to zilla.yaml",
          link: "concepts/config-intro.md",
        },
        {
          text: "Connecting to Kafka",
          collapsible: false,
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
      text: "Apache Kafka Proxying",
      collapsible: false,
      link: "concepts/kafka-proxies/grpc-proxy.md",
      children: [
        {
          text: "Kafka Proxying with Zilla",
          link: "concepts/kafka-proxies/grpc-proxy.md",
        },
        {
          text: "gRPC-Kafka Proxy walkthrough",
          link: "how-tos/kafka-proxies/grpc-proxy.md",
        },
        {
          text: "REST-Kafka Proxy",
          link: "concepts/kafka-proxies/rest-proxy.md",
        },
        {
          text: "SSE-Kafka Proxy",
          link: "concepts/kafka-proxies/sse-proxy.md",
        },
        {
          text: "Amazon MSK Pubic Proxy",
          collapsible: true,
          prefix: "how-tos/amazon-msk/",
          link: "how-tos/amazon-msk/public-proxy.md",
          children: [
            "public-proxy.md",
            "development.md",
            "production.md",
            "production-mutual-trust.md",
          ],
        },
        {
          text: "Amazon MSK Private Proxy",
          link: "how-tos/amazon-msk/private-proxy.md",
        },
      ],
    },
    {
      text: "SSE Proxying",
      collapsible: false,
      children: [
        {
          text: "JWT Continuous Authorization",
          link: "https://github.com/aklivity/zilla-examples/tree/main/sse.proxy.jwt",
        },        {
          text: "SSE-Kafka Proxy",
          link: "concepts/kafka-proxies/sse-proxy.md",
        },
      ],
    },
    {
      text: "Reference",
      prefix: "reference/",
      link: "reference/config/overview.md",
      children: ["config/binding/", "config/guard/", "config/vault/", "config/telemetry/", "amazon-msk/", "vscode/", "troubleshooting/"], // todo add aws stuff
    },
  ],
});
