module.exports = {
  plugins: ["."],
  rules: {
    "aksel-design-token-exists": true,
    "aksel-no-internal-tokens": true,
    "aksel-no-class-override": [true, { severity: "warning" }],
    "aksel-no-deprecated-classes": true,
    "aksel-design-token-no-global-override": true,
    "aksel-design-token-no-component-reference": true,
  },
};
