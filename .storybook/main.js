const getStories = () => {
  return process.env.stories
    ? [`../@navikt/**/${process.env.stories}.stories.@(js|jsx|ts|tsx|mdx)`]
    : ["../@navikt/**/*.stories.@(js|jsx|ts|tsx|mdx)"];
};

module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.devServer = {
      stats: "errors-only",
    };
    return config;
  },
  staticDirs: ["./public"],
  devServer: {
    stats: "errors-only",
  },
  stories: () => [...getStories(), "./*.stories.mdx"],
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
        controls: {
          hideNoControlsWarning: true,
        },
      },
    },
  ],
  features: {
    storyStoreV7: true,
  },
  core: {
    builder: {
      name: "webpack5",
      options: {
        lazyCompilation: false,
        fsCache: true,
      },
    },
  },
  framework: "@storybook/react",
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
  },
};
