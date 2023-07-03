import { navbar } from "vuepress-theme-hope";
import { hostnameSEO, siteBase } from "../env.js";
import versions from "../versions.json" assert { type: "json" };

const versionLinks = <{ text: string; link: string }[]>(
  versions.map((o) => ({
    text: o.text,
    link: o.key ? `${hostnameSEO}/${siteBase}/${o.key}` : o.link,
  }))
);

export const enNavbar = navbar([
  { text: "Get Started", icon: "play", link: "/get-started/install.md" },
  { text: "Guides", icon: "bars-staggered", link: "/guides/kafka-proxies/grpc-proxy.md" },
  // { text: "Concepts", icon: "diagram-project", link: "/concepts/" },
  { text: "Reference", icon: "book", link: "/reference/config/overview.md" },
  { text: "version", icon: "list-ol", children: versionLinks },
  { text: "aklivity", icon: "globe", link: "https://www.aklivity.io/" },
]);
