/**
 * TODO:
 * - Convert to new format (v9): https://eslint.org/docs/latest/use/configure/migration-guide
 * - Look into opinionated stylistic plugin
 * - Replace @typescript-eslint/recommended with @typescript-eslint/recommended-type-checked
 * - We should add "plugin:react/jsx-runtime", but not sure if this will cause problems for projects not using the new JSX transform
 * - Consider adding the rule "id-length"
 */

/**
 * V9 migration WIP
 * - eslint-plugin-storybook does not support v9 yet: https://github.com/storybookjs/eslint-plugin-storybook/issues/157
 * - eslint-plugin-testing-library does not support v9 yet: https://github.com/testing-library/eslint-plugin-testing-library/issues?q=is%3Aissue+is%3Aopen+v9
 * - @vitest/eslint-plugin supports v9, just need to replace @vitest/legacy-recommended: https://github.com/vitest-dev/eslint-plugin-vitest?tab=readme-ov-file#usage
 * - Looks like @typescript-eslint/eslint-plugin and @typescript-eslint/parser can both be replaced by just typescript-eslint in v9: https://typescript-eslint.io/getting-started#step-2-configuration
 */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:storybook/recommended",
  ],
  /* Allows eslint-plugin-react to detect installed react-version */
  settings: { react: { version: "detect" } },
  rules: {
    "import/no-unresolved": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      { propElementValues: "always" },
    ],
    "array-callback-return": "error",
    "object-shorthand": "error",
    "no-else-return": "error",
    "no-console": [
      "warn",
      {
        allow: [
          "info",
          "warn",
          "error",
          "group",
          "groupEnd",
          "table",
          "assert",
          "countReset",
          "count",
          "dir",
          "time",
          "timeEnd",
          "timeStamp",
        ],
      },
    ],
    /* Temporarily turned off until code is updated */
    "react/prop-types": "off",
    "react/display-name": "off",
    "import/no-named-as-default": "off",
  },
  /* https://eslint.org/docs/latest/use/configure/rules#report-unused-eslint-disable-comments */
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: ["**/*.stories.ts?(x)"],
      rules: {
        "no-console": "off",
      },
    },
    {
      files: ["**/*.ts?(x)"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        /*
         * TODO:
         * - Consider { builtinGlobals: true }
         */
        "@typescript-eslint/no-shadow": ["error", { hoist: "all" }],
        "@typescript-eslint/no-explicit-any": "off", // Temporary
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/no-unused-expressions": [
          "error",
          /* https://eslint.org/docs/latest/rules/no-unused-expressions#allowshortcircuit-and-allowternary */
          { allowShortCircuit: true, allowTernary: true },
        ],
      },
    },
    {
      files: ["**/app/**/query-types.ts"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/array-type": "off",
      },
    },
    {
      files: ["**/*.test.*", "**/__tests__/*"],
      plugins: ["@vitest"],
      extends: [
        "plugin:testing-library/react",
        /* Needed to support v8 eslint config-syntax */
        "plugin:@vitest/legacy-recommended",
      ],
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
    {
      files: [
        "**/examples/__parts*/*.tsx",
        "**/pages/templates/**/*.tsx",
        "**/pages/eksempler/**/*.tsx",
      ],
      plugins: ["aksel-local"],
      rules: {
        "aksel-local/import-check": ["error"], // Only allow imports from @navikt and react
      },
    },
    {
      files: ["**/examples/__parts-inline/*.tsx"],
      rules: {
        "arrow-body-style": ["error", "never"],
        "func-style": ["error", "expression"],
        "import/no-named-export": "error",
      },
    },
    {
      files: ["examples/**"],
      rules: {
        "react/react-in-jsx-scope": "off",
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
    "esm",
    "cjs",
    "dist",
    "@navikt/aksel/**/*.input.*",
    "@navikt/aksel/**/*.output.*",
    "**/codemod/**/*.js",
    "!.storybook",
    "**/playwright-report/**",
    "**/tokens/**/plugin.js",
  ],
};
