import { loadCsf } from "@storybook/csf-tools";
import { StorybookConfig } from "@storybook/react-vite";
import { readFileSync } from "fs";
import { InlineConfig } from "vite";
import turbosnap from "vite-plugin-turbosnap";
import TsconfigPathsPlugin from "vite-tsconfig-paths";

const indexRegex = /export const args = {\s+index: (\d+),/;

export default {
  experimental_indexers: (indexers) => {
    // Changes here might need to be reflected in aksel.nav.no/website/.storybook/main.ts
    const customIndexer = async (fileName: string, opts) => {
      let code = readFileSync(fileName, "utf-8").toString();

      const matches = indexRegex.exec(code);
      const prefix = matches ? `${matches[1]} | ` : "";

      code = code.split(
        /\/\/ EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE/,
      )[0];

      const [templateName, name] = fileName
        .split(`pages/templates/`)[1]
        .replace(".tsx", "")
        .split("/");
      const storyName = process.env.CHROMATIC
        ? `${templateName} | ${prefix}${name}` // Chromatic does not support folders
        : `${prefix}${name}`;

      code += `
        export default { title: "Templates/${templateName}/${storyName}" };
        export const Demo = { render: Example };
        Demo.storyName = "${storyName}";`;

      return loadCsf(code, { ...opts, fileName }).parse().indexInputs;
    };

    return [
      ...(indexers || []),
      {
        test: /pages\/templates\/.+?.tsx$/,
        createIndex: customIndexer,
      },
    ];
  },
  staticDirs: ["./public"],
  stories: () => [
    "../@navikt/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "./docs/*.mdx",
    "./docs/*.stories.tsx",
    "../aksel.nav.no/website/pages/templates/**/*.tsx",
  ],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
        controls: {
          hideNoControlsWarning: true,
        },
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    {
      name: "@storybook/addon-storysource",
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    /**
     * https://github.com/chromaui/storybook-addon-pseudo-states/issues/101
     * Currently disabled to avoid interference with darkmode update
     */
    /* "storybook-addon-pseudo-states", */
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },

  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import("vite");

    // The TsconfigPathsPlugin is only used to silence errors when importing nextjs components, but the imports does not acutally work.
    const tsConfigPathsPluginOpts = { root: "aksel.nav.no/website/" };

    return mergeConfig(config, {
      build: { cssMinify: "lightningcss" },
      plugins:
        configType === "PRODUCTION"
          ? [
              TsconfigPathsPlugin(tsConfigPathsPluginOpts),
              turbosnap({
                rootDir: config.root ?? process.cwd(),
              }),
            ]
          : [TsconfigPathsPlugin(tsConfigPathsPluginOpts)],
    } satisfies InlineConfig);
  },
} satisfies StorybookConfig;
