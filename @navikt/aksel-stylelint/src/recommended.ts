module.exports = {
  plugins: ["."],
  rules: {
    "@navikt/aksel-design-token-exists": true,
    "@navikt/aksel-no-internal-tokens": true,
    "@navikt/aksel-no-class-override": [true, { severity: "warning" }],
    "@navikt/aksel-no-deprecated-classes": true,
    "@navikt/aksel-design-token-no-global-override": true,
    "@navikt/aksel-design-token-no-component-reference": true,
  },
};
