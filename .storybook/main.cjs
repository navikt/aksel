const getStories = () => {
  return process.env.stories
    ? [`../@navikt/**/${process.env.stories}.stories.@(js|jsx|ts|tsx|mdx)`]
    : ["../@navikt/**/*.stories.@(js|jsx|ts|tsx|mdx)"];
};
module.exports = {
  devServer: {
    stats: "errors-only",
  },
  stories: () => [...getStories(), "./*.stories.mdx"],
  addons: [
    "@storybook/addon-a11y",
    "@whitespace/storybook-addon-html",
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
    autodocs: false,
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
  },
};
