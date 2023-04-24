import { navbar } from "vuepress-theme-hope";
import { hostnameSEO, siteBase } from "../env.js";
import versions from '../versions.json' assert { type: "json" };
const versionLinks = <{ text: string; link: string; }[]>versions.map(o => ({ text: o.text, link: o.key?`${hostnameSEO}/${siteBase}/${o.key}`:o.link }));

export const enNavbar = navbar([
  { text: "Get Started", icon: "clock", link: "/get-started/", },
  { text: "Guides", icon: "bars-staggered", link: "/guides/", },
  { text: "Examples", icon: "diagram-project", link: "/examples/", },
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
  // todo: remove and uncomment the below once there is multiple versions of the blogs to host
  // and add necessary items ({ "text": "v0.1", "key": "v0.1", "tag": "v0.1" }) to deploy-versions.json
  { "text": "Changelog", icon: "tag", "link": "https://github.com/orgs/aklivity/projects/4", },
  // { text: "version", icon: "list-ol", children: versionLinks },
  { text: "Aklivity", icon: "home", link: "https://www.aklivity.io/", },
]);
