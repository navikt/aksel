module.exports = {
  stories: [
    "../.storybook/**/*.stories.@(mdx)",
    "../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../@navikt/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
  ],
};
