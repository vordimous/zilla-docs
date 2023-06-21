import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/reference/": [
    {
      text: "Zilla Configuration",
      collapsible: true,
      prefix: "config/",
      children: [
        {
          text: "CLI (zilla)",
          link: "zilla-cli.md",
        },
        {
          text: "zilla.yaml Overview",
          link: "overview.md",
        },
        {
          text: "Bindings",
          collapsible: false,
          prefix: "binding/",
          children: "structure",
        },
        {
          text: "Guards",
          collapsible: false,
          prefix: "guard/",
          children: "structure"
        },
        {
          text: "Vaults",
          collapsible: false,
          prefix: "vault/",
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
      collapsible: true,
      prefix: "manager/",
      link: "manager/",
      children: [
        {
          text: "CLI (zpm)",
          link: "zpm-cli.md",
        },
        {
          text: "zpm Configuration",
          link: "configuration.md",
        },
      ],
    },
  ],
  "/": [

    "how-tos/install.md",
    "tutorials/quickstart",
    {
      text: "Configuration",
      collapsible: true,
      children: [
        {
          text: "Connecting to Kafka",
          collapsible: false,
          prefix: "how-tos/connecting-to-kafka/",
          children: [
            "generic.md",
            "aiven.md",
            "amazon-msk.md",
            "confluent-cloud.md",
            "redpanda.md",
          ],
        },
        {
          text: "Enable Metrics",
          link: "reference/config/telemetry/",
        },
        {
          text: "Manage CORS",
          link: "reference/config/bindings/binding-http.md#options-access-control",
        },
      ],
    },
    {
      text: "Configuring Kafka Proxies",
      collapsible: false,
      children: [
        {
          text: "gRPC Proxy",
          link: "kafka-proxies/grpc-proxy.md",
        },
        {
          text: "REST Proxy",
          link: "kafka-proxies/rest-proxy.md",
        },
        {
          text: "SSE Proxy",
          link: "kafka-proxies/sse-proxy.md",
        },
        {
          text: "Amazon MSK Private Proxy",
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
      prefix: "reference/",
      link: "reference/config/overview.md",
      children: ["config/binding/", "config/guard/", "config/vault/", "config/telemetry/"],
    },
  ],
});
