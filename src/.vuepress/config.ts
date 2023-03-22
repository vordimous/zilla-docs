import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

let siteBase;
if (process.env.SITE_BASE) {
  siteBase = `/${process.env.SITE_BASE}/`
}

export default defineUserConfig({
  base: siteBase || "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Zilla Docs",
      description: "The official documentation for the aklivity/zilla open-source project",
    },
  },

  theme,
});
