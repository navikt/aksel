/* const ReactDocgenTypescriptPlugin = require("react-docgen-typescript-plugin")
  .default; */
const withCss = require("@zeit/next-css");
module.exports = withCss(
  {},
  {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      /*
    config.plugins.push(
      new ReactDocgenTypescriptPlugin({
        include: [],
      })
    );
    */
      return config;
    },
  }
);
