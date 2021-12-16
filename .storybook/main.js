module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.devServer = { stats: "errors-only" };
    return config;
  },
  devServer: { stats: "errors-only" },
  stories: ["../@navikt/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
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
        controls: { hideNoControlsWarning: true },
      },
    },
  ],
};
