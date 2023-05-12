import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/reference/": [
    "",
    {
      text: "Zilla Manager CLI (zpm)",
      collapsible: true,
      prefix: "zpm/",
      link: "zpm/",
      children: "structure",
    },
    { text: "Zilla Manager Configuration", link: "/reference/zpm.json.md" },
    { text: "Zilla Manager Settings", link: "/reference/settings.json.md" },
    { text: "Zilla Manager Security", link: "/reference/security.json.md" },
    {
      text: "Zilla Runtime CLI (zilla)",
      collapsible: true,
      prefix: "zilla/",
      link: "zilla/",
      children: "structure",
    },
    {
      text: "Zilla Runtime Configuration",
      collapsible: true,
      prefix: "zilla.yaml/",
      link: "zilla.yaml/",
      children: [
        {
          text: "Bindings",
          collapsible: false,
          prefix: "binding/",
          link: "binding/",
          children: [
            "binding-amqp.md",
            "binding-echo.md",
            "binding-fan.md",
            "binding-filesystem.md",
            "binding-grpc-kafka.md",
            "binding-grpc.md",
            "binding-http-filesystem.md",
            "binding-http-kafka.md",
            "binding-http.md",
            "binding-kafka-grpc.md",
            "binding-kafka.md",
            "binding-mqtt.md",
            "binding-proxy.md",
            "binding-sse-kafka.md",
            "binding-sse.md",
            "binding-tcp.md",
            "binding-tls.md",
            "binding-ws.md",
          ],
        },
        {
          text: "Guards",
          collapsible: false,
          prefix: "guard/",
          link: "guard/",
          children: [
            "guard-jwt.md",
          ],
        },
        {
          text: "Vaults",
          collapsible: false,
          prefix: "vault/",
          link: "vault/",
          children: [
            "vault-filesystem.md",
          ]
        },
        {
          text: "Telemetry",
          collapsible: false,
          prefix: "telemetry/",
          link: "telemetry/",
          children: [
            "telemetry-metric.md",
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
  "/": [
    "",
    {
      text: "Get Started",
      icon: "play",
      collapsible: true,
      prefix: "get-started/",
      children: [
        {
          text: "Install",
          icon: "download",
          collapsible: false,
          prefix: "install/",
          link: "install/",
        },
        {
          text: "Quickstarts",
          icon: "stopwatch",
          collapsible: false,
          prefix: "quickstart/",
          children: [
            "simple.md",
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
    // {
    //   text: "Concepts",
    //   icon: "diagram-project",
    //   prefix: "concepts/",
    //   collapsible: true,
    //   children: "structure"
    // },
    {
      text: "Reference",
      icon: "book",
      prefix: "reference/",
      link: "reference/",
      children: ["zilla.yaml/", "zilla/", "zpm/"],
    },
  ],
});
