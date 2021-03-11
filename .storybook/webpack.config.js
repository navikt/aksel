const path = require("path");

module.exports = (baseConfig) => {
  baseConfig.config.module.rules.push(
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
      include: [
        path.resolve(__dirname, "../node_modules/@navikt/ds-css/index.css"),
      ],
    },
    {
      test: /\.less$/,
      loaders: ["style-loader", "css-loader", "less-loader"],
      include: path.resolve(__dirname, "../packages/"),
    }
  );
  baseConfig.config.resolve.alias = {
    ...baseConfig.config.resolve?.alias,
    "./normalize.css": path.resolve(
      __dirname,
      "../node_modules/normalize.css/normalize.css"
    ),
    "./@navikt/ds-tokens": path.resolve(
      __dirname,
      "../node_modules/@navikt/ds-tokens/dist/tokens.css"
    ),
  };

  return baseConfig.config;
};
