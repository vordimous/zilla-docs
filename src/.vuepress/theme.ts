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

  editLink: true,
  contributors: false,
  lastUpdated: true,
  docsRepo,
  docsDir: "src",
  docsBranch,
  pure: true,

  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Search", "Links", "Repo", "Outlook"],
  },

  pageInfo: ["ReadingTime", "Date", "Category", "Tag"],

  locales: {
    "/": {
      navbar: enNavbar,
      sidebar: enSidebar,

      displayFooter: true,
      footer: `<span style="display:flex;align-items:center"><a href="https://www.aklivity.io"><img src="/aklivity-logo.png" class="logo light" height="30" alt="aklivity" style="padding-right:25px"><img src="/aklivity-logo-white.png" class="logo dark" height="30" alt="aklivity" style="padding-right:25px"></a> <a href="https://github.com/aklivity/zilla"><i class="fa-brands fa-github" style="font-size:22px;padding-right:6px"></i></a> <a href="https://www.linkedin.com/company/aklivity/"><i class="fa-brands fa-linkedin" style="font-size:22px;padding-right:6px"></i></a> <a href="https://www.aklivity.io/slack"><i class="fa-brands fa-slack" style="font-size:25px;padding-right:6px"></i></a> <a href="https://www.twitter.com/aklivityinc"><i class="fa-brands fa-twitter" style="font-size:22px"></i></a></span>`,
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
