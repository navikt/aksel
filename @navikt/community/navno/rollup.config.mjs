import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import glob from "glob";
import * as path from "path";
import postcssDuplicate from "postcss-combine-duplicated-selectors";
import postcssImport from "postcss-import";
import { externals } from "rollup-plugin-node-externals";
import postcss from "rollup-plugin-postcss";

import { readFileSync } from "fs";

const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url).pathname)
);
const extensions = [".js", ".jsx", ".ts", ".tsx"];
const targets = [
  "last 3 chrome versions",
  "last 3 firefox versions",
  "last 3 opera versions",
  "last 3 edge versions",
  "last 3 safari versions",
  "last 3 chromeandroid versions",
  "last 1 firefoxandroid versions",
  "ios >= 13.4",
  "node 12.20",
];

export default {
  input: glob.sync("src/**/index.ts"),

  plugins: [
    externals({ deps: true, devDeps: true, packagePath: "./package.json" }),
    nodeResolve({ extensions }),
    postcss({
      extract: "index.css",
      plugins: [postcssImport(), postcssDuplicate()],
    }),
    commonjs(),
    babel({
      rootMode: "upward",
      extensions,
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      envName: "production",
      targets,
    }),
  ],
  output: [
    {
      format: "cjs",
      dir: path.dirname(pkg.main),
      preserveModules: true,
      entryFileNames: "[name].js",
      exports: "named",
    },
    {
      format: "esm",
      dir: path.dirname(pkg.module),
      preserveModules: true,
      sourcemap: true,
      entryFileNames: "[name].js",
    },
  ],
};
