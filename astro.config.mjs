// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  site: "https://kilm.aristovnik.me",
  integrations: [
    starlight({
      title: "KiLM",
      customCss: [
        // Path to your custom CSS file (relative to src)
        "./src/styles/custom.css",
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/barisgit/kilm",
        },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            { label: "Getting Started", link: "/guides/getting-started/" },
            { label: "Installation", link: "/guides/installation/" },
            { label: "Configuration", link: "/guides/configuration/" },
            {
              label: "Custom Descriptions",
              link: "/guides/custom-descriptions/",
            },
            { label: "Automatic Updates", link: "/guides/automatic-updates/" },
            { label: "Troubleshooting", link: "/guides/troubleshooting/" },
          ],
        },
        {
          label: "Command Reference",
          items: [
            { label: "Overview", link: "/reference/cli/" }, // Optional: Add an overview page
            { label: "init", link: "/reference/cli/init/" },
            { label: "add-3d", link: "/reference/cli/add-3d/" },
            { label: "config", link: "/reference/cli/config/" },
            { label: "setup", link: "/reference/cli/setup/" },
            { label: "pin", link: "/reference/cli/pin/" },
            { label: "unpin", link: "/reference/cli/unpin/" },
            { label: "template", link: "/reference/cli/template/" },
            { label: "list", link: "/reference/cli/list/" },
            { label: "status", link: "/reference/cli/status/" },
            { label: "update", link: "/reference/cli/update/" },
            { label: "add-hook", link: "/reference/cli/add-hook/" },
          ],
        },
        {
          label: "Community",
          items: [
            { label: "Development Setup", link: "/community/development/" },
            { label: "Contributing", link: "/community/contributing/" },
            { label: "License", link: "/community/license/" },
          ],
        },
      ],
    }),
  ],
});
