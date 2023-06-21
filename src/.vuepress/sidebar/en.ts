import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/reference/": [
    {
      text: "Zilla Configuration",
      collapsible: true,
      prefix: "config/",
      link: "config/",
      children: [
        {
          text: "CLI (zilla)",
          link: "zilla-cli.md",
        },
        {
          text: "zilla.yaml",
          collapsible: true,
          children: [
            {
              text: "Bindings",
              collapsible: false,
              prefix: "binding/",
              link: "binding/",
              children: "structure",
            },
            {
              text: "Guards",
              collapsible: false,
              prefix: "guard/",
              link: "guard/",
              children: "structure"
            },
            {
              text: "Vaults",
              collapsible: false,
              prefix: "vault/",
              link: "vault/",
              children: "structure"
            },
            {
              text: "Telemetry",
              collapsible: false,
              prefix: "telemetry/",
              link: "telemetry/",
              children: [
                "metrics/README.md",
                {
                  text: "Exporters",
                  collapsible: false,
                  prefix: "exporter/",
                  link: "exporter/",
                  children: [
                    "exporter-prometheus.md",
                  ]
                },
              ],
            },
          ],
        },
      ],
    },
    {
      text: "Zilla Manager",
      collapsible: true,
      prefix: "manager/",
      link: "manager/",
      children: [
        {
          text: "CLI (zpm)",
          link: "zpm-cli.md",
        },
      ],
    },
  ],
  "/": [
    {
      text: "Get Started",
      icon: "play",
      collapsible: true,
      prefix: "get-started/",
      children: [
        "install.md",
        "vscode/README.md",
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
        {
          text: "Using MSK Proxies",
          icon: "fa-brands fa-aws",
          collapsible: false,
          prefix: "msk-proxies/",
          children: [
            "private-proxy.md",
            {
              text: "Public Proxy",
              collapsible: true,
              prefix: "public-proxy/",
              link: "public-proxy/",
              children: [
                "development.md",
                "production.md",
                "production-mutual-trust.md",
              ],
            },
          ],
        },
      ],
    },
    {
      text: "Reference",
      icon: "book",
      prefix: "reference/",
      link: "reference/",
      children: ["config/binding/", "config/telemetry/", "config/guard/", "config/vault/"],
    },
  ],
});
