/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "auto",
        useBuiltIns: "entry",
        corejs: 3,
        debug: false,
        bugfixes: true,
      },
    ],
    ["@babel/preset-typescript", {}],
    ["@babel/preset-react", { development: false, useBuiltIns: true }],
  ],
  babelrcRoots: ["."],
};
