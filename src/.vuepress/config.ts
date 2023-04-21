import { defineUserConfig } from "vuepress";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import theme from "./theme.js";
import { base, dest } from "./env.js";

export default defineUserConfig({
  base: `/${base}/`,
  dest,

  locales: {
    "/": {
      lang: "en-US",
      title: "Zilla Docs",
      description: "The official documentation for the aklivity/zilla open-source project",
    },
  },

  theme,
  
  plugins: [
    googleAnalyticsPlugin({
      id: 'G-Q2XWKQS14L',
    }),
  ],
});
