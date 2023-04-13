import { hopeTheme } from "vuepress-theme-hope";
import { enSidebar } from "./sidebar/index.js";
import { enNavbar } from "./navbar/index.js";
import { hostnameSEO, docsRepo, docsBranch } from "./env.js";


export default hopeTheme({
  hostname: hostnameSEO,
  author: {
    name: "Aklivity",
    url: "https://www.aklivity.io/",
  },
  logo: "/logo-dark.png",
  logoDark: "/logo.png",
  docsRepo,
  docsDir: "src",
  docsBranch,
  pure: true,
  iconAssets: "fontawesome-with-brands",

  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Search", "Links", "Repo", "Outlook"],
  },
  locales: {
    "/": {
      navbar: enNavbar,
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
