import { hopeTheme } from "vuepress-theme-hope";
import { enSidebar } from "./sidebar/index.js";
import { enNavbar } from "./navbar/index.js";
import { hostnameSEO, docsRepo, docsBranch } from "./env.js";

export default hopeTheme({
  hostname: hostnameSEO,
  logo: "/logo-dark.png",
  logoDark: "/logo.png",
  iconAssets: "fontawesome-with-brands",
  favicon: "favicon.ico",

  repo: "aklivity/zilla",
  editLink: true,
  contributors: false,
  lastUpdated: false,
  docsRepo,
  docsDir: "src",
  docsBranch,
  pure: true,

  navbarLayout: {
    start: ["Brand"],
    center: ["Search"],
    end: ["Links", "Repo", "Outlook"],
  },

  pageInfo: ["Category", "Tag"],

  locales: {
    "/": {
      navbar: enNavbar,
      sidebar: enSidebar,
      headerDepth: 3,

      displayFooter: true,
      footer: `<span style="display:flex;align-items:center"><a href="https://www.aklivity.io"><img class="logo" alt="aklivity"></a> <a href="https://github.com/aklivity/zilla"><i class="fa-brands fa-github" style="font-size:22px;padding-right:6px"></i></a> <a href="https://www.linkedin.com/company/aklivity/"><i class="fa-brands fa-linkedin" style="font-size:22px;padding-right:6px"></i></a> <a href="https://www.aklivity.io/slack"><i class="fa-brands fa-slack" style="font-size:25px;padding-right:6px"></i></a> <a href="https://www.twitter.com/aklivityinc"><i class="fa-brands fa-twitter" style="font-size:22px"></i></a></span>`,
      copyright: "© aklivity, inc. 2022-2023",

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },
  },

  plugins: {
    autoCatalog: {
      level: 1
    },
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
      gfm: true,
      linkify: false,
    },
  },
});
