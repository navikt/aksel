/* const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
}); */
const fs = require("fs");
var markdown = require("remark-parse");
const unified = require("unified");
const glob = require("glob");
const { v4 } = require("uuid");

const loadPackage = () => {
  const navFrontend = glob.sync("../packages/**/package.json");
  const vnext = glob.sync("../@navikt/*/package.json");
  return [...navFrontend, ...vnext]
    .filter((file) => !file.includes("node_modules"))
    .map((file) => {
      const pack = require(file);
      return { name: pack.name, data: pack };
    });
};

const loadToc = () => {
  const parser = unified().use(markdown);
  const files = glob.sync("./pages/**/*.@(md|mdx)");
  return files.map((file) => {
    const data = fs.readFileSync(file, "utf8");
    const parsed = parser.parse(data);
    return {
      file: file
        .replace("./pages", "")
        .replace("/index", "")
        .replace(".mdx", "")
        .replace(".md", ""),
      tree: parsed.children
        .filter((x) => x.type === "heading")
        .filter((x) => x.depth === 2)
        .map((x) => {
          return {
            depth: x.depth,
            heading: x.children[0].value,
            key: v4(),
          };
        }),
    };
  });
};

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  publicRuntimeConfig: {
    packages: loadPackage(),
    toc: loadToc(),
  },
};
