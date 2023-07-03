module.exports = {
  devServer: {
    stats: "errors-only",
  },
  stories: ["../**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
  },
};
