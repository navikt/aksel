module.exports = {
  plugins: [
    require("postcss-import")(),
    require("postcss-combine-duplicated-selectors")(),
    require("postcss-modules")({
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    }),
  ],
};
