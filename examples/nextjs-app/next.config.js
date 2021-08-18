/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/**
 * Leter etter bruk av nav-frontend-* pakker og @navikt/* pakker i nermeste package.json
 * Husk å endre til riktig package.json hvis strukturen av imports er annerledes (eks yarn workspaces)
 */
const packageJson = require("./package.json");
const modules = [];
const withLess = require("next-with-less");

Object.keys(packageJson.dependencies).forEach((key) => {
  /**
   * Nextjs does not as of june 2021 support esm import/export syntax
   * TODO: Remove this when this issue is fixed
   *  */
  if (key.startsWith("@navikt/") || key.startsWith("nav-frontend-")) {
    modules.push(key);
  }
});

const withTM = require("next-transpile-modules")(modules);

module.exports = withTM(
  withLess({
    productionBrowserSourceMaps: true,

    /**
     * Added to support @navikt/ds-icons package, can be changed to other svg-handlers
     */
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
    reactStrictMode: true,
  })
);
