import storybook from "eslint-plugin-storybook";
import testingLibrary from "eslint-plugin-testing-library";
import { defineConfig } from "oxlint";

const [, storybookStories, storybookMain] =
  storybook.configs["flat/recommended"];

const restrictedImportPaths = [
  {
    name: "react",
    importNames: [
      "useId",
      "useInsertionEffect",
      "useSyncExternalStore",
      "useDeferredValue",
      "useTransition",
      "startTransition",
    ],
    message:
      "React 18+ API not allowed. We currently only support React-features accessible in React 17. To add new features, we will need to update peerDependencies (breaking change).",
  },
  {
    name: "react",
    importNames: [
      "useOptimistic",
      "useActionState",
      "use",
      "cache",
      "useEffectEvent",
      "ViewTransition",
      "addTransitionType",
      "Activity",
    ],
    message:
      "React 19+ API not allowed. We currently only support React-features accessible in React 17. To add new features, we will need to update peerDependencies (breaking change).",
  },
  {
    name: "react-dom/client",
    importNames: ["createRoot", "hydrateRoot"],
    message: "React 18+ API not allowed (targeting React 17).",
  },
  {
    name: "react-dom",
    importNames: [
      "useFormStatus",
      "useFormState",
      "requestFormReset",
      "preload",
      "preloadModule",
      "preinit",
      "preinitModule",
      "preconnect",
      "prefetchDNS",
    ],
    message: "React 19+ API not allowed (targeting React 17).",
  },
];

const restrictedReactProperties = restrictedImportPaths
  .filter((path) => path.name === "react")
  .flatMap((path) =>
    path.importNames.map((property) => ({
      object: "React",
      property,
      message: path.message,
    })),
  );

const restrictedImportPatterns = [
  {
    group: ["**/esm/**", "**/cjs/**"],
    message:
      "Do not import from build output directories. Import from source instead.",
  },
];

const useLayoutEffectMessage =
  "Use `useClientLayoutEffect` from utils-external instead. `useLayoutEffect` warns during SSR before React 19.";

export default defineConfig({
  plugins: ["oxc", "unicorn", "react", "import", "jsx-a11y", "typescript"],
  options: {
    reportUnusedDisableDirectives: "error",
    respectEslintDisableDirectives: false,
  },

  jsPlugins: [
    "eslint-plugin-storybook",
    "eslint-plugin-testing-library",
    "eslint-plugin-aksel-local",
  ],
  // Generated and build outputs are already covered by .gitignore, which Oxlint respects.
  ignorePatterns: [
    "@navikt/aksel/**/*.input.*",
    "@navikt/aksel/**/*.output.*",
    "**/query-types.ts",
    "**/modal/helpers/dialog-polyfill.ts",
    ".yarn/releases/*",
  ],
  rules: {
    /* Rules to add and fix */
    /* react/jsx-no-constructed-context-values */
    /* unicorn/no-array-for-each */
    /* react/display-name */
    /* react/no-object-type-as-default-prop */
    /* react/no-unstable-nested-components */
    /* react/checked-requires-onchange-or-readonly */
    /* react/exhaustive-effect-dependencies */
    /* self-closing-comp */
    /* jsx-boolean-value */
    /* jsx-no-useless-fragment */
    /* jsx-fragments */
    /* END */
    "typescript/ban-ts-comment": "error",
    "typescript/no-empty-object-type": "error",
    "typescript/no-namespace": "error",
    "typescript/no-unnecessary-type-constraint": "error",
    "typescript/no-unsafe-function-type": "error",
    "typescript/no-non-null-assertion": "error",
    "typescript/no-require-imports": "error",
    eqeqeq: ["error", "always", { null: "ignore" }],
    "no-case-declarations": "error",
    "react/jsx-no-script-url": "error",
    "no-new-func": "error",
    "no-empty": "error",
    "no-fallthrough": "error",
    "no-prototype-builtins": "error",
    "no-regex-spaces": "error",
    "no-unexpected-multiline": "error",
    "no-useless-assignment": "error",
    "unicorn/prefer-node-protocol": "error",
    "preserve-caught-error": "error",
    "react/button-has-type": "error",
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-target-blank": "error",
    "react/no-unescaped-entities": "error",
    "react/no-unknown-property": "error",
    "react/require-render-return": "error",
    "import/no-duplicates": "warn",
    "react/jsx-curly-brace-presence": [
      "error",
      {
        propElementValues: "always",
      },
    ],
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(useClientLayoutEffect)",
      },
    ],
    "jsx-a11y/prefer-tag-over-role": "off",
    "react/no-array-index-key": "error",
    "react/no-danger": "error",
    "oxc/no-accumulating-spread": "error",
    "no-else-return": "error",
    "object-shorthand": "error",
    "no-shadow": "error",
    "no-template-curly-in-string": "error",
    "no-return-assign": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "no-array-constructor": "error",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    "no-console": [
      "warn",
      {
        allow: ["info", "warn", "error", "group", "groupEnd"],
      },
    ],
    // React Compiler rules (native, from eslint-plugin-react-hooks "recommended-latest") are enabled
    // through the `correctness` category. Components that break them cannot be optimized by React Compiler.
    // `react/refs` is disabled because of too many false positives.
    "react/refs": "off",
    "react/unsupported-syntax": "warn",
  },
  overrides: [
    {
      files: ["@navikt/**", "tooling/**"],
      rules: {
        "import/no-cycle": "error",
      },
    },
    {
      files: ["**/*.stories.{ts,tsx}", "**/scripts/*.{ts,mts,cts}"],
      rules: {
        "no-console": "off",
      },
    },
    {
      files: ["**/*.stories.{ts,tsx,js,jsx,mjs,cjs}"],
      rules: {
        ...storybookStories.rules,
      },
    },
    {
      files: ["**/.storybook/main.{js,cjs,mjs,ts}"],
      rules: {
        ...storybookMain.rules,
      },
    },
    {
      files: ["**/*.test.*"],
      rules: {
        ...testingLibrary.configs["flat/react"].rules,
        "vitest/no-commented-out-tests": "error",
        "vitest/no-identical-title": "error",
        "vitest/no-import-node-test": "error",
        "vitest/no-interpolation-in-snapshots": "error",
        "vitest/no-mocks-import": "error",
        "vitest/no-unneeded-async-expect-function": "error",
        "vitest/prefer-called-exactly-once-with": "error",
        "vitest/require-mock-type-parameters": "off",
        "vitest/require-to-throw-message": "off",
      },
      plugins: ["vitest"],
    },
    {
      files: ["aksel.nav.no/website/**"],
      plugins: ["nextjs"],
      rules: {
        "nextjs/no-img-element": "off",
      },
    },
    {
      files: [
        "aksel.nav.no/website/pages/eksempler/**/*.tsx",
        "aksel.nav.no/website/pages/templates/**/*.tsx",
      ],
      rules: {
        "aksel-local/args-check": "error",
        "aksel-local/comment-check": "error",
      },
    },
    {
      files: [
        "**/examples/__parts*/*.tsx",
        "**/pages/templates/**/*.tsx",
        "**/pages/eksempler/**/*.tsx",
      ],
      rules: {
        "aksel-local/import-check": "error",
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
      files: ["@navikt/**"],
      rules: {
        // Published packages use the classic JSX runtime, and tsc does not catch a missing React import
        "react/react-in-jsx-scope": "error",
        "no-restricted-imports": [
          "error",
          { paths: restrictedImportPaths, patterns: restrictedImportPatterns },
        ],
        "no-restricted-properties": ["error", ...restrictedReactProperties],
      },
    },
    {
      files: ["@navikt/core/react/src/**/*.{ts,tsx}"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: [
              ...restrictedImportPaths,
              {
                name: "react",
                importNames: ["useLayoutEffect"],
                message: useLayoutEffectMessage,
              },
              {
                name: "date-fns",
                allowTypeImports: true,
                message:
                  'Import functions from their own path, e.g. `import { format } from "date-fns/format"`. The root barrel makes unbundled Node imports load all of date-fns.',
              },
              {
                name: "date-fns/locale",
                allowTypeImports: true,
                message:
                  'Import locales from their own path, e.g. `import { nb } from "date-fns/locale/nb"`. The barrel makes unbundled Node imports load all locales.',
              },
            ],
            patterns: restrictedImportPatterns,
          },
        ],
        "no-restricted-properties": [
          "error",
          ...restrictedReactProperties,
          {
            object: "React",
            property: "useLayoutEffect",
            message: useLayoutEffectMessage,
          },
        ],
      },
    },
    {
      files: ["@navikt/**/*.stories.tsx"],
      rules: {
        "no-restricted-imports": "off",
        "no-restricted-properties": "off",
      },
    },
  ],
});
