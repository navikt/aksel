module.exports = {
  staticDirs: ["./public"],

  stories: () => [
    "../@navikt/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "./*.stories.mdx",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@whitespace/storybook-addon-html",
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
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
  },
};
