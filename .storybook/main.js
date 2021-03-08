module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.devServer = { stats: "errors-only" };
    return config;
  },
  devServer: { stats: "errors-only" },
  stories: [
    "../.storybook/**/*.stories.@(mdx)",
    "../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../@navikt/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
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
    "@whitespace/storybook-addon-html",
  ],
};
