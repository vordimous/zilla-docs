
export const siteBase = <string>process.env.SITE_BASE || "zilla-docs";
export const dist = <string>process.env.DIST_DIR || "src/.vuepress/dist";
export const hostnameSEO = <string>process.env.SITE_URL || `https://docs.aklivity.io`;
export const versionKey = <string>process.env.SITE_VERSION_KEY || "next";
export const base = `${siteBase}/${versionKey}`;
export const dest = `${dist}/${base}`;

export const docsRepo = <string>process.env.GITHUB_REPOSITORY || "aklivity/zilla-docs";
var repoTree;
switch (versionKey) {
  case "next":
    repoTree = "develop"
    break;
  default:
    repoTree = "main"
}
export const docsBranch = repoTree;


console.log("Configured env variables:", {
    siteBase,
    dist,
    hostnameSEO,
    base,
    versionKey,
    dest,
    docsRepo,
    docsBranch,
  });

export default {
    siteBase,
    dist,
    hostnameSEO,
    base,
    versionKey,
    dest,
    docsRepo,
    docsBranch,
};