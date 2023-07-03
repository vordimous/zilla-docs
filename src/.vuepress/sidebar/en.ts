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
  ],
  "/": [
    "",
    {
      text: "Get Started",
      icon: "play",
      collapsible: true,
      prefix: "get-started/",
      children: [
        "install.md",
        {
          text: "Quickstarts",
          icon: "stopwatch",
          collapsible: false,
          prefix: "quickstart/",
          children: [
            "basics/README.md",
            "rest.md",
            "grpc.md",
            "sse.md",
          ]
        },
        {
          text: "Todo App",
          icon: "check",
          collapsible: false,
          prefix: "todo-app/",
          children: "structure",
        },
      ],
    },
    {
      text: "Guides",
      icon: "bars-staggered",
      prefix: "guides/",
      collapsible: true,
      children: [
        {
          text: "Configuring Kafka Proxies",
          icon: "gear",
          collapsible: false,
          prefix: "kafka-proxies/",
          children: [
            {
              text: "gRPC Proxy",
              icon: "circle-nodes",
              link: "grpc-proxy.md",
            },
            {
              text: "REST Proxy",
              icon: "arrow-right-arrow-left",
              link: "rest-proxy.md",
            },
            {
              text: "SSE Proxy",
              icon: "fa-brands fa-html5",
              link: "sse-proxy.md",
            },
          ],
        },
        {
          text: "Connecting to Kafka",
          icon: "plug",
          collapsible: false,
          prefix: "connecting-to-kafka/",
          children: [
            "generic.md",
            "aiven.md",
            "amazon-msk.md",
            "confluent-cloud.md",
            "redpanda.md",
          ],
        },
      ],
    },
    {
      text: "Reference",
      icon: "book",
      prefix: "reference/",
      link: "reference/config/overview.md",
      children: ["config/bindings/", "config/guards/", "config/vaults/", "config/telemetry/", "vscode/"],
    },
  ],
});
