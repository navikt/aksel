const vitest = require("@vitest/eslint-plugin");
const importPlugin = require("eslint-plugin-import");
const oxlint = require("eslint-plugin-oxlint");
const reactHooks = require("eslint-plugin-react-hooks");
const storybook = require("eslint-plugin-storybook");
const testingLibrary = require("eslint-plugin-testing-library");
const { globalIgnores, defineConfig } = require("eslint/config");
const globals = require("globals");
const tseslint = require("typescript-eslint");

/**
 * TODO:
 * - Replace tseslint.configs.recommended with tseslint.configs.recommendedTypeChecked
 * - Look into opinionated stylistic plugin (e.g. tseslint.configs.stylisticTypeChecked)
 * - Consider adding the rule "id-length"
 */

module.exports = (async () =>
  defineConfig([
    globalIgnores([
      "**/lib",
      "**/public",
      "**/esm",
      "**/cjs",
      "**/dist",
      "@navikt/aksel/**/*.input.*",
      "@navikt/aksel/**/*.output.*",
      "**/codemod/**/*.js",
      "**/playwright-report/**/*",
      "**/tokens/**/plugin.js",
      "**/.next",
      "**/query-types.ts",
      ".yarn",
      "**/next-env.d.ts",
      // Generated/gitignored output (flat config does not read .gitignore)
      "@navikt/aksel-icons/src/**",
      "@navikt/aksel/src/version.ts",
      "**/component-names.generated.ts",
      "@navikt/core/tailwind/{src/tokens.ts,tailwind.config.js,tailwind.darkside.config.js}",
      "@navikt/core/tokens/token_docs.js",
      "apps/playroom/{playroom.config.js,src/auto-generated-imports.ts}",
      "**/.build",
      "**/coverage",
      "**/storybook-static",
      "**/test-results",
      "tooling/analyzer/temp",
    ]),
    {
      // Rules are split between oxlint and ESLint, so ESLint can't tell if a directive is unused
      // Disable reporting of unused ESLint disable comments, as some rules are now handled by oxlint
      linterOptions: { reportUnusedDisableDirectives: "off" },
      // Rules run by oxlint jsPlugins. Registered so disable-comments resolve.
      plugins: {
        storybook,
        "testing-library": testingLibrary,
      },
    },
    reactHooks.configs.flat["recommended-latest"],
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    {
      languageOptions: {
        // eslint-plugin-import's recommended config sets ecmaVersion 2018
        ecmaVersion: "latest",
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
      rules: {
        "import/no-unresolved": "off",
        "import/namespace": "off", // Biome has equivalent
        "import/no-named-as-default": "off", // Temporary
        // Still in ESLint: react-hooks compiler rules (no oxlint equivalent)
        "react-hooks/refs": "off", // Too many false positives
      },
    },
    {
      files: ["**/*.{ts,tsx}"],
      extends: [tseslint.configs.recommended],
      rules: {
        //
        // Start: Covered by TypeScript, and slow without a TS resolver
        "import/default": "off",
        "import/export": "off",
        "import/named": "off",
        "import/no-named-as-default-member": "off",
        // End
        "@typescript-eslint/no-explicit-any": "off", // Temporary
      },
    },

    {
      // Still in ESLint: vitest/no-conditional-expect (oxlint version has no `expectAssertions` option)
      files: ["**/*.test.*", "**/__tests__/*"],
      extends: [vitest.configs.recommended],
    },

    // Must be last: turns off rules already covered by oxlint (see oxlint.config.mts)
    ...(await oxlint.buildFromConfigFile("./oxlint.config.mts")),
  ]))();
