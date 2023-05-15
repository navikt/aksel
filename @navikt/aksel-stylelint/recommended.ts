module.exports = {
  plugins: ["."],
  rules: {
    "@navikt/aksel-design-tokens": {
      tokenDefinitionsFile: "@navikt/core/css/dist/index.css",
      controlledPrefixes: [/--ac-.+/, /--a-.+/],
    },
  },
};
