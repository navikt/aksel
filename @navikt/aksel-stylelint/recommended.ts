module.exports = {
  plugins: ["."],
  rules: {
    "@navikt/aksel-design-tokens": {
      tokenDefinitionsFile: "@navikt/core/css/dist/index.css",
      overrideableTokenDefinitionsJSONFile: "@navikt/core/css/tokens.json",
      controlledPrefixes: [/--ac-.+/, /--a-.+/],
    },
  },
};
