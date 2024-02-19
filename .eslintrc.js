// TODO: Convert to new format: https://eslint.org/docs/latest/use/configure/migration-guide
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
    "plugin:storybook/recommended",
    // TODO: Look into opinionated stylistic plugin
    // TODO: Replace @typescript-eslint/recommended with @typescript-eslint/recommended-type-checked
  ],
  settings: { react: { version: "detect" } },
  rules: {
    "import/no-unresolved": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      { propElementValues: "always" },
    ],
    "array-callback-return": "error",
    "object-shorthand": "error",
    // TODO: Consider adding the rule "id-length"
    // Temporary:
    "react/prop-types": "off",
    "react/display-name": "off",
    "import/no-named-as-default": "off",
    // "import/no-cycle": [1],
  },
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-shadow": ["error", { hoist: "all" }], // TODO: Consider { builtinGlobals: true }
        "@typescript-eslint/no-explicit-any": "off", // Temporary
        "@typescript-eslint/array-type": "error",
      },
    },
    {
      files: ["**/*.test.*", "**/__tests__/*"],
      plugins: ["vitest"],
      extends: ["plugin:vitest/recommended", "plugin:testing-library/react"],
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
        "react/no-unknown-property": [2, { ignore: ["jsx", "global"] }],
        "react/react-in-jsx-scope": "off",
        "@next/next/no-html-link-for-pages": [
          "error",
          "aksel.nav.no/website/pages/",
        ],
        "@typescript-eslint/ban-ts-comment": "off", // Temporary
      },
    },
    {
      files: ["aksel.nav.no/website/pages/eksempler/**"],
      rules: {
        "jsx-a11y/anchor-is-valid": "off",
      },
    },
    {
      files: [
        "aksel.nav.no/website/pages/eksempler/**/*.tsx",
        "aksel.nav.no/website/pages/templates/**/*.tsx",
      ],
      plugins: ["aksel-local"],
      rules: {
        "aksel-local/comment-check": ["error"],
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
    "!.storybook",
  ],
};
