import { hopeTheme } from "vuepress-theme-hope";
import { navbar } from "vuepress-theme-hope";
import versions from './versions.json' assert { type: "json" };
import { enSidebar } from "./sidebar/index.js";
import { hostname, siteBase } from "./env.js";

const versionLinks = <{ text: string; link: string; }[]>versions.map(o => ({ text: o.text, link: o.key?`${hostname}/${siteBase}/${o.key}`:o.link }));

export default hopeTheme({
  hostname,
  author: {
    name: "Aklivity",
    url: "https://www.aklivity.io/",
  },
  logo: "/logo-dark.png",
  logoDark: "/logo.png",
  repo: "aklivity/zilla-docs",
  pure: true,
  iconAssets: "fontawesome-with-brands",

  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Search", "Links", "Repo", "Outlook"],
  },
  locales: {
    "/": {
      // navbar
      navbar: navbar([
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
        { text: "Blog", icon: "blog", link: `${hostname.replace(/\/$/, '')}/blog/`, },
        { text: "version", icon: "list-ol", children: versionLinks }
      ]),

      // sidebar
      sidebar: enSidebar,

      footer: "Default footer",

      displayFooter: false,

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },
  },

  plugins: {

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: false,
      codetabs: true,
      container: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      tabs: true,
    },
  },
});
