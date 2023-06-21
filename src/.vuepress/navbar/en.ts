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
  { text: "Get Started", icon: "play", link: "/tutorials/install.md" },
  { text: "Reference", icon: "book", link: "/reference/config/" },
  { text: "version", icon: "list-ol", children: versionLinks },
  { text: "aklivity", icon: "globe", link: "https://www.aklivity.io/" },
]);
