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
      children: "structure",
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
          text: "Connecting to Kafka",
          icon: "plug",
          collapsible: true,
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
      text: "Guides",
      icon: "bars-staggered",
      prefix: "guides/",
      collapsible: true,
      children: [
        {
          text: "Configuring Kafka Proxies",
          collapsible: false,
          prefix: "kafka-proxies/",
          children: [
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
      ],
    },
    {
      text: "Examples",
      icon: "diagram-project",
      collapsible: true,
      prefix: "examples/",
      children: [
        {
          text: "Todo App",
          collapsible: false,
          prefix: "todo-app/",
          children: "structure",
        },
      ],
    },
    {
      text: "Reference",
      icon: "book",
      prefix: "reference/",
      link: "reference/",
      children: ["zilla.yaml/", "zilla/", "zpm/"],
    },
  ],
});
