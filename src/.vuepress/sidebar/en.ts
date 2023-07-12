import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/reference/": [
    {
      text: "VS Code extension",
      link: "vscode/README.md",
      children: [],
    },
    {
      text: "Zilla Configuration",
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
          children: [],
        },
        {
          text: "Bindings",
          prefix: "bindings/",
          children: "structure",
        },
        {
          text: "Guards",
          prefix: "guards/",
          children: "structure"
        },
        {
          text: "Vaults",
          prefix: "vaults/",
          children: "structure"
        },
        {
          text: "Telemetry",
          prefix: "telemetry/",
          children: [
            {
              text: "Metrics",
              prefix: "metrics/",
              children: "structure"
            },
            {
              text: "Exporters",
              prefix: "exporter/",
              children: "structure"
            },
          ],
        },
      ],
    },
    {
      text: "Zilla Manager",
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
          children: [],
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
      children: [],
    },
    {
      text: "Quickstart",
      link: "tutorials/quickstart/kafka-proxies",
      children: [],
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
      ],
    },
    {
      text: "Apache Kafka Proxying",
      link: "concepts/kafka-proxies/rest-proxy.md",
      children: [
        {
          text: "REST-Kafka Proxy",
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
          ]
        },
        {
          text: "SSE-Kafka Proxy",
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
          ]
        },

        {
          text: "Build a CQRS Todo App",
          collapsible: true,
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
          ]
        },
        {
          text: "gRPC-Kafka Proxy",
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
          ]
        },

        {
          text: "Amazon MSK Pubic Proxy",
          icon: "plus",
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
          icon: "plus",
          link: "how-tos/amazon-msk/private-proxy.md",
          children: [],
        },
      ],
    },
    {
      text: "Reference",
      prefix: "reference/",
      link: "reference/config/overview.md",
      children: ["config/bindings/", "config/guards/", "config/vaults/", "config/telemetry/", "amazon-msk/", "vscode/", "troubleshooting/"],
    },
  ],
});
