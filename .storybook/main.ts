import { mergeConfig } from "vite";
import turbosnap from "vite-plugin-turbosnap";

export default {
  staticDirs: ["./public"],

  stories: () => ["../@navikt/**/*.stories.@(js|jsx|ts|tsx|mdx)", "./*.mdx"],
  addons: [
    "@storybook/addon-a11y",
    "@xfinx/storybook-addon-html",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-storysource",
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
        controls: {
          hideNoControlsWarning: true,
        },
      },
    },
    "storybook-addon-pseudo-states",
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
    checkOptions: {},
    reactDocgen: false,
  },

  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins:
        configType === "PRODUCTION"
          ? [
              turbosnap({
                rootDir: config.root ?? process.cwd(),
              }),
            ]
          : [],
    });
  },
};
