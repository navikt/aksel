const glob = require("glob");
const withLess = require("@zeit/next-less");
const withCss = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const withTranspileModules = require("next-transpile-modules");
const packageJson = require("./package.json");

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

module.exports = withPlugins(
  [
    /* withTranspileModules(
      Object.keys(packageJson.dependencies).filter((key) =>
        key.startsWith("nav-frontend-")
      )
    ), */

    [withLess],
    [
      withCss,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: "[local]",
        },
      },
    ],
  ],
  {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      /* config.module.rules.push({
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      }); */
      /* config.module.rules.push({
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      }); */
      return config;
    },
    publicRuntimeConfig: {
      packages: loadPackage(),
    },
  }
);
