module.exports = {
  plugins: ["."],
  rules: {
    "aksel/design-token-exists": true,
    "aksel/no-internal-tokens": true,
    /* TODO: Update to check .aksel classes */
    "aksel/no-class-override": [true, { severity: "warning" }],
    "aksel/no-deprecated-classes": true,
    "aksel/design-token-no-global-override": true,
    /* TODO: Remove this rule in v8 */
    "aksel/design-token-no-component-reference": true,
  },
};
