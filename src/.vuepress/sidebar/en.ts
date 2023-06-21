import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/reference/": [
    {
      text: "Zilla Configuration",
      collapsible: true,
      prefix: "config/",
      children: [
        {
          text: "CLI (zilla)",
          link: "zilla-cli.md",
        },
        {
          text: "zilla.yaml Overview",
          link: "overview.md",
        },
        {
          text: "Bindings",
          collapsible: false,
          prefix: "binding/",
          children: "structure",
        },
        {
          text: "Guards",
          collapsible: false,
          prefix: "guard/",
          children: "structure"
        },
        {
          text: "Vaults",
          collapsible: false,
          prefix: "vault/",
          children: "structure"
        },
        {
          text: "Telemetry",
          collapsible: false,
          prefix: "telemetry/",
          children: [
            {
              text: "Metrics",
              collapsible: false,
              prefix: "metrics/",
              children: "structure"
            },
            {
              text: "Exporters",
              collapsible: false,
              prefix: "exporter/",
              children: "structure"
            },
          ],
        },
      ],
    },
    {
      text: "Zilla Manager",
      collapsible: true,
      prefix: "manager/",
      link: "manager/",
      children: [
        {
          text: "CLI (zpm)",
          link: "zpm-cli.md",
        },
        {
          text: "zpm Configuration",
          link: "configuration.md",
        },
      ],
    },
  ],
  "/": [
    {
      text: "Reference",
      prefix: "reference/",
      link: "reference/config/overview.md",
      children: ["config/binding/", "config/guard/", "config/vault/", "config/telemetry/"],
    },
  ],
});
