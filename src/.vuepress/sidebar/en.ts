import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/reference/": "structure",
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
          children: "structure",
        },
        {
          text: "Connecting to Kafka",
          collapsible: false,
          prefix: "connecting-to-kafka/",
          children: "structure",
        },
      ],
    },
    {
      text: "Guides",
      prefix: "guides/",
      link: "guides/",
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
      link: "examples/",
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
      children: [
        "zilla.yaml/",
        "zilla/",
        "zpm/",
      ],
    },
  ],
});
