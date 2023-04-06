
export const siteBase = <string>process.env.SITE_BASE || "zilla-docs";
export const dist = <string>process.env.DIST_DIR || "src/.vuepress/dist";
export const hostname = <string>process.env.SITE_URL || "https://aklivity.gitub.io";
export const versionKey = <string>process.env.SITE_VERSION_KEY || "next";
export const base = `${siteBase}/${versionKey}`;
export const dest = `${dist}/${versionKey}`;

console.log("Configured env variables:", {
    siteBase,
    dist,
    hostname,
    base,
    versionKey,
    dest,
  });

export default {
    siteBase,
    dist,
    hostname,
    base,
    versionKey,
    dest,
};