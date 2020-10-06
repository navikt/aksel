const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSWebpackPlugin = require("uglifyjs-webpack-plugin");
const WebpackProductionConfig = require("./_webpack.global");

WebpackProductionConfig.plugins = [
  new HtmlWebpackPlugin({
    template: "./guideline-app/index.production.ejs",
    filename: "index.html",
    inject: "body",
  }),
  new UglifyJSWebpackPlugin({
    uglifyOptions: {
      mangle: true,
    },
  }),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
];

const babelRule = WebpackProductionConfig.module.rules.find(
  (rule) => rule.loader === "babel-loader"
);

if (babelRule) {
  if (babelRule.include) {
    babelRule.include.push(/_(-|[a-z]|[A-Z])+\.example\.js/);
    babelRule.include.push(/_(-|[a-z]|[A-Z])+\.sample\.js/);
  } else {
    babelRule.include = [/_(-|[a-z]|[A-Z])+\.sample\.js/];
    babelRule.include.push(/_(-|[a-z]|[A-Z])+\.example\.js/);
  }
}

WebpackProductionConfig.output = {
  path: path.join(__dirname, "../", "dist"),
  publicPath: "/",
  filename: "[name].js",
};

module.exports = WebpackProductionConfig;
