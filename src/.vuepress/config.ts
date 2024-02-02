import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from "vuepress";
import { getDirname, path } from "@vuepress/utils";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import theme from "./theme.js";
import { base, siteBase, dest, versionKey } from "./env.js";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules', '!**/_partials'],
  base: `/${base}/`,
  dest,

  locales: {
    "/": {
      lang: "en-US",
      title: "Documentation",
      description:
        "The official documentation for the aklivity/zilla open-source project",
    },
  },
  head: [
    ["meta", { name: "docsearch:product", content: siteBase }],
    ["meta", { name: "docsearch:version", content: versionKey }],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://H6RNUBSB6E-dsn.algolia.net",
        crossorigin: "",
      },
    ],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Questrial&display=swap",
        rel: "stylesheet",
      },
    ],
  ],

  theme,
  plugins: [
    googleAnalyticsPlugin({
      id: "G-Q2XWKQS14L",
    }),
    registerComponentsPlugin({
      components: {
        ZillaPlus: path.resolve(__dirname, "./components/ZillaPlus.vue"),
      },
    }),
  ],
  markdown: {
    headers: {
      level: [2, 3, 4],
    },
  },
});
