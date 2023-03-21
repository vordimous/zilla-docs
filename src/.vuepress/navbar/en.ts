import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  { text: "Getting Started", icon: "clock", link: "/get-started/", },
  { text: "Connect Kafka", icon: "bars-staggered", link: "/connect-your-kafka/", },
  { text: "Configure Proxies", icon: "diagram-project", link: "/configure-kafka-proxies/", },
  {
    text: "Reference",
    icon: "book",
    prefix: "/reference/",
    children: [
      "zilla.yaml/",
      "zilla/",
      "zpm/",
    ],
  },
]);
