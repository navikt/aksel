const glob = require("glob");

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
  },
};
