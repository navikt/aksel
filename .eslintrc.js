module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    //"plugin:react/jsx-runtime", // Not sure if this will cause problems for projects not using the new JSX transform
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    // TODO: Add storybook
    // TODO: Look into opinionated stylistic plugin
    // TODO: Replace @typescript-eslint/recommended with @typescript-eslint/recommended-type-checked
  ],
  settings: { react: { version: "detect" } },
  rules: {
    "import/no-unresolved": "off",
    // Look into if these are really needed:
    "react/no-unknown-property": [2, { ignore: ["jsx", "global"] }],
    "react/jsx-pascal-case": 0,
    "import/no-anonymous-default-export": ["error", { allowObject: true }],
    "react/jsx-curly-brace-presence": ["error", { props: "never" }],
    // Temporary:  (Eventuelt gjøre om til warn?)
    "react/prop-types": "off",
    "react/display-name": "off",
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        // Temporary:
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      files: ["**/*.test.*", "**/__tests__/*"],
      extends: ["plugin:jest/recommended", "plugin:testing-library/react"],
    },
    {
      files: ["aksel.nav.no/website/**"],
      env: {
        browser: true,
        es2021: true,
      },
      extends: ["plugin:@next/next/recommended"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
      },
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "import/no-anonymous-default-export": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "react/display-name": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@next/next/no-html-link-for-pages": [
          "error",
          "aksel.nav.no/website/pages/",
        ],
      },
    },
  ],
  globals: {
    Locale: "readonly",
    JSX: "readonly",
  },
  ignorePatterns: [
    "node_modules",
    "lib",
    "public",
    "examples",
    "esm",
    "cjs",
    "dist",
    "**/codemod/**/*.js",
  ],
};
