import { getDirname, path } from "vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import { enSidebar } from "./sidebar/index.js";
import { enNavbar } from "./navbar/index.js";
import {
  base,
  siteBase,
  versionKey,
  hostnameSEO,
  docsRepo,
  docsBranch,
} from "./env.js";

const __dirname = getDirname(import.meta.url);

export default hopeTheme({
  hostname: hostnameSEO,
  logo: "/logo.webp",
  logoDark: "/logo-dark.webp",
  iconAssets: ["fontawesome-with-brands"],
  favicon: "/favicon.ico",

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
      copyright: "© aklivity, inc. 2023-2024",

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },
  },

  plugins: {
    catalog: {
      level: 1,
      locales: {
        "/": {
          title: "Appendix",
        },
      },
    },
    docsearch: {
      disableUserPersonalization: true,
      appId: "H6RNUBSB6E",
      indexName: "aklivity",
      apiKey: "bae72797404a23ba5466230146919cae",
      indexBase: `/${base}/`,
      searchParameters: {
        facetFilters: [`version:${versionKey}`, `product:${siteBase}`],
      },
    },
    shiki: {
      themes: {
        light: "light-plus",
        dark: "dark-plus",
      },
      lineNumbers: 3
    },
    redirect: true,
    mdEnhance: {
      align: true,
      attrs: true,
      chart: false,
      codetabs: true,
      component: false,
      hint: true,
      figure: true,
      imgLazyload: true,
      include: {
        resolvePath: (file) => {
          path.resolve(file);
          if (file.startsWith("@partials"))
            return file.replace(
              "@partials",
              path.resolve(__dirname, "../solutions/_partials")
            );
          return file;
        },
      },
      mark: true,
      mermaid: true,
      tabs: true,
      gfm: true,
      linkify: false,
    },
  },
});
