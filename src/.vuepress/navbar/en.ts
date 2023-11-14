import { navbar } from "vuepress-theme-hope";
import { hostnameSEO, siteBase } from "../env.js";
import versions from "../versions.json" assert { type: "json" };

const versionLinks = <{ text: string; link: string }[]>(
  versions.map((o) => ({
    text: o.text,
    icon: o.icon,
    link: o.key ? `${hostnameSEO}/${siteBase}/${o.key}` : o.link,
  }))
);

export const enNavbar = navbar([
  { text: "Get Started", icon: "fas fa-play", link: "/tutorials/quickstart/kafka-proxies.md" },
  { text: "Reference", icon: "fas fa-book", link: "/reference/config/overview.md" },
  { text: "version", icon: "fas fa-list-ol", children: versionLinks },
  { text: "aklivity", icon: "fas fa-globe", link: "https://www.aklivity.io/" },
]);
