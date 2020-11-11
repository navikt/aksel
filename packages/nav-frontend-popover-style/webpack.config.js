const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/popover-style.less",
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },
};
