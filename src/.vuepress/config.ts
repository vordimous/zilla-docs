import { defineUserConfig } from "vuepress";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import theme from "./theme.js";
import { base, siteBase, dest, versionKey } from "./env.js";

export default defineUserConfig({
  base: `/${base}/`,
  dest,

  locales: {
    "/": {
      lang: "en-US",
      title: "Documentation",
      description: "The official documentation for the aklivity/zilla open-source project",
    },
  },
  head: [
    ["meta", { name: "docsearch:product", content: siteBase }],
    ["meta", { name: "docsearch:version", content: versionKey }],
    [
      "link",
      { rel: "preconnect", href: "https://H6RNUBSB6E-dsn.algolia.net", crossorigin: "" },
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
      id: 'G-Q2XWKQS14L',
    }),
    docsearchPlugin({
      appId: 'H6RNUBSB6E',
      indexName: 'aklivity',
      apiKey: 'bae72797404a23ba5466230146919cae',
      indexBase: `/${base}/`,
      searchParameters: {
        facetFilters: [`version:${versionKey}`, `product:${siteBase}`],
      },
    }),
  ],
  markdown: {
    headers: {
      level: [2,3,4]
    }
  }
});
