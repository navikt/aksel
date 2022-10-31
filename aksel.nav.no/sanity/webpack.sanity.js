const path = require("path");

module.exports = function (config, options) {
  config.module.rules[0].exclude = {
    test: /(node_modules|bower_components)/,
    not: [/@radix-ui/, /@floating-ui/],
  };
  config.resolve.alias = {
    "@/lib": path.resolve(__dirname, "lib/index.ts"),
  };

  return config;
};
