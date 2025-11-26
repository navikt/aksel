import chalk from "chalk";
import { SupportedCodemodExtensions } from "./codeshift.utils";

const JS_EXTENSIONS = [
  "js",
  "jsx",
  "ts",
  "tsx",
] satisfies SupportedCodemodExtensions[];

const CSS_EXTENSIONS = [
  "css",
  "scss",
  "less",
] satisfies SupportedCodemodExtensions[];

export const migrations: {
  [key: string]: {
    description: string;
    value: string;
    path: string;
    warning?: string;
    /**
     * Some transforms are only meant to run on specific file extensions.
     * This is used to filter out files that should not be transformed.
     */
    ignoredExtensions: SupportedCodemodExtensions[];
  }[];
} = {
  "1.0.0": [
    {
      description: "Runs all codemods for beta -> v1 migration",
      value: "v1-preset",
      path: "v1.0.0/preset/preset",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description: "Fixes breaking API-changes for <Pagination /> component",
      value: "v1-pagination",
      path: "v1.0.0/pagination/pagination",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description: "Fixes breaking API-changes for <Tabs /> component",
      value: "v1-tabs",
      path: "v1.0.0/tabs/tabs",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description:
        "Fixes breaking API-changes for <SpeechBubble /> (now <Chat/>) component",
      value: "v1-chat",
      path: "v1.0.0/chat/chat",
      ignoredExtensions: CSS_EXTENSIONS,
    },
  ],
  "2.0.0": [
    {
      description: "Patches changed css-variables",
      value: "v2-css",
      path: "v2.0.0/update-css-tokens/update-css-tokens",
      ignoredExtensions: [],
    },
    {
      description: "Patches changed js-variables",
      value: "v2-js",
      path: "v2.0.0/update-js-tokens/update-js-tokens",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description: "Patches changed sass-variables",
      value: "v2-sass",
      path: "v2.0.0/update-sass-tokens/update-sass-tokens",
      ignoredExtensions: JS_EXTENSIONS,
    },
    {
      description: "Patches changed less-variables",
      value: "v2-less",
      path: "v2.0.0/update-less-tokens/update-less-tokens",
      ignoredExtensions: JS_EXTENSIONS,
    },
  ],
  "v3.0.0": [
    {
      description:
        "Replaces deprecated <CopyToClipboard /> with <CopyButton />",
      value: "v3-copybutton",
      path: "v3.0.0/copybutton/copybutton",
      warning:
        "Remember to clean css-import from '@navikt/ds-css-internal' if no longer needed\nIf non-text was used as children, or different locales were handled, you need to manually fix this",
      ignoredExtensions: CSS_EXTENSIONS,
    },
  ],
  "v4.0.0": [
    {
      description:
        "Replaced deprecated 'internal'-component import to 'core'-imports",
      value: "v4-internal-react",
      path: "v4.0.0/internal-react/internal-react",
      warning:
        "Remember to also run 'v4-internal-css' if you have overwritten any css-classes!",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description:
        "Replaced 'navdsi'-prefixes used to overwrite internal-css to 'navds'-prefixes",
      value: "v4-internal-css",
      path: "v4.0.0/internal-css/internal-css",
      warning:
        "Remember to remove '@navikt/ds-css-internal' imports if no longer needed! Also run 'v4-internal-react' to convert internal-react imports to core-imports",
      ignoredExtensions: [],
    },
    {
      description:
        "Removes all instances of UNSAFE_ for datepicker/monthpicker.",
      value: "v4-date",
      path: "v4.0.0/date/date",
      ignoredExtensions: CSS_EXTENSIONS,
    },
  ],
  "v6.0.0": [
    {
      description:
        "Removes `backgroundColor` and `avatarBgColor` properties from `Chat` and `Chat.Bubble`",
      value: "v6-chat",
      path: "v6.0.0/chat/chat",
      warning:
        "Remember to update use of `variant`-prop to match previous use of colors. If needed the component exposes css-variables for custom overrides",
      ignoredExtensions: CSS_EXTENSIONS,
    },
  ],
  spacing: [
    {
      description:
        "Updates all Primitives to use new `space`-tokens. (Works with old and new system)",
      value: "primitive-spacing",
      path: "spacing/primitives-spacing/spacing",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description:
        "Updates css, scss and less-variables to use new `space`-tokens. (Works with old and new system)",
      value: "token-spacing",
      path: "spacing/token-spacing/spacing",
      ignoredExtensions: [],
    },
    {
      description:
        "Updates js-tokens to use new `space`-tokens. (Works with old and new system)",
      value: "token-spacing-js",
      path: "spacing/token-spacing-js/spacing",
      ignoredExtensions: CSS_EXTENSIONS,
    },
  ],
  "v8.0.0": [
    {
      description:
        "Updates Box with legacy-tokens to Box using the new token system, and renames already migrated BoxNew/Box.New instances to Box.",
      value: "v8-box",
      path: "v8.0.0/box/box",
      warning:
        "Remember to check if 'TODO: Aksel Box migration'-comment was added to any files after migration. This comment will help you find and update Box-instances we couldn't update for you.",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description: "Renames already migrated BoxNew/Box.New instances to Box.",
      value: "v8-box-new",
      path: "v8.0.0/box-new/box-new",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description: "Removes deprecated props from components.",
      value: "v8-prop-deprecate",
      path: "v8.0.0/prop-deprecate/prop-deprecate",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description:
        "Updates variant + data-color props on Tag based on current variant prop.",
      value: "v8-tag-variant",
      path: "v8.0.0/tag-variant/tag-variant",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description:
        "Updates variant + data-color props on ToggleGroup based on current variant prop.",
      value: "v8-toggle-group-variant",
      path: "v8.0.0/toggle-group-variant/toggle-group-variant",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description:
        "Updates variant + data-color props on Accordion based on current variant prop.",
      value: "v8-accordion-variant",
      path: "v8.0.0/accordion-variant/accordion-variant",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description:
        "Updates variant + data-color props on Chips based on current variant prop.",
      value: "v8-chips-variant",
      path: "v8.0.0/chips-variant/chips-variant",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description:
        "Updates variant + data-color props on Link based on current variant prop.",
      value: "v8-link-variant",
      path: "v8.0.0/link/link-variant",
      ignoredExtensions: CSS_EXTENSIONS,
    },
    {
      description:
        "Tries to migrate List component moving 'title' and 'description' props to 'Heading' and 'BodyShort'.",
      value: "v8-list",
      path: "v8.0.0/list/list",
      ignoredExtensions: CSS_EXTENSIONS,
    },
  ],
};

/**
 * Extracts `path` field for a given migration.
 */
export function getMigrationPath(migrationName: string) {
  return Object.values(migrations)
    .flat()
    .find((x) => x.value === migrationName)?.path;
}

/**
 * Extracts `warning` field for a given migration.
 */
export function getWarning(migrationName: string) {
  return Object.values(migrations)
    .flat()
    .find((x) => x.value === migrationName)?.warning;
}

/**
 * Extracts `ignoredExtensions` field for a given migration.
 */
export function getIgnoredFileExtensions(migrationName: string) {
  return (
    Object.values(migrations)
      .flat()
      .find((x) => x.value === migrationName)?.ignoredExtensions ?? []
  );
}

export function getMigrationNames() {
  return Object.values(migrations)
    .flat()
    .map((x) => x.value);
}

export function getMigrationString() {
  let str = "";

  Object.entries(migrations).forEach(([version, vMigrations]) => {
    str += `\n${chalk.underline(version)}\n`;
    vMigrations.forEach((migration) => {
      str += `${chalk.blue(migration.value)}: ${migration.description}\n`;
    });
  });

  return str;
}
