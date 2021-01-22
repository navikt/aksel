const path = require("path");

module.exports = (baseConfig) => {
  baseConfig.config.module.rules.push({
    test: /\.less$/,
    loaders: ["style-loader", "css-loader", "less-loader"],
    include: path.resolve(__dirname, "../packages/"),
  });

  return baseConfig.config;
};
