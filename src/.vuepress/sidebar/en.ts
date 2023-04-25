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
      prefix: "get-started/",
      link: "get-started/",
      children: [
        {
          text: "Install",
          collapsible: false,
          prefix: "install/",
          link: "install/",
        },
        {
          text: "Connecting to Kafka",
          collapsible: false,
          prefix: "connecting-to-kafka/",
          link: "connecting-to-kafka/",
          children: [
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
      prefix: "guides/",
      children: [
        {
          text: "Kafka Proxies",
          collapsible: false,
          prefix: "kafka-proxies/",
          children: "structure",
        },
      ],
    },
    {
      text: "Examples",
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
      prefix: "reference/",
      link: "reference/",
      children: ["zilla.yaml/", "zilla/", "zpm/"],
    },
  ],
});
