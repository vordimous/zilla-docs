import { hopeTheme } from "vuepress-theme-hope";
import { enSidebar } from "./sidebar/index.js";
import { enNavbar } from "./navbar/index.js";
import { hostnameSEO, docsRepo, docsBranch } from "./env.js";


export default hopeTheme({
  hostname: hostnameSEO,
  logo: "/logo-dark.png",
  logoDark: "/logo.png",
  iconAssets: "fontawesome-with-brands",

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
