import chalk from "chalk";

export const migrations: {
  [key: string]: {
    description: string;
    value: string;
    path: string;
    warning?: string;
  }[];
} = {
  "1.0.0": [
    {
      description: "Runs all codemods for beta -> v1 migration",
      value: "v1-preset",
      path: "v1.0.0/preset/preset",
    },
    {
      description: "Fixes breaking API-changes for <Pagination /> component",
      value: "v1-pagination",
      path: "v1.0.0/pagination/pagination",
    },
    {
      description: "Fixes breaking API-changes for <Tabs /> component",
      value: "v1-tabs",
      path: "v1.0.0/tabs/tabs",
    },
    {
      description:
        "Fixes breaking API-changes for <SpeechBubble /> (now <Chat/>) component",
      value: "v1-chat",
      path: "v1.0.0/chat/chat",
    },
  ],
  "2.0.0": [
    {
      description: "Patches changed css-variables",
      value: "v2-css",
      path: "v2.0.0/update-css-tokens/update-css-tokens",
    },
    {
      description: "Patches changed js-variables",
      value: "v2-js",
      path: "v2.0.0/update-js-tokens/update-js-tokens",
    },
    {
      description: "Patches changed sass-variables",
      value: "v2-sass",
      path: "v2.0.0/update-sass-tokens/update-sass-tokens",
    },
    {
      description: "Patches changed less-variables",
      value: "v2-less",
      path: "v2.0.0/update-less-tokens/update-less-tokens",
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
    },
    {
      description:
        "Replaced 'navdsi'-prefixes used to overwrite internal-css to 'navds'-prefixes",
      value: "v4-internal-css",
      path: "v4.0.0/internal-css/internal-css",
      warning:
        "Remember to remove '@navikt/ds-css-internal' imports if no longer needed! Also run 'v4-internal-react' to convert internal-react imports to core-imports",
    },
    {
      description:
        "Removes all instances of UNSAFE_ for datepicker/monthpicker.",
      value: "v4-date",
      path: "v4.0.0/date/date",
    },
  ],
};

export function getMigrationPath(str: string) {
  return Object.values(migrations)
    .reduce((acc, val) => [...val, ...acc], [])
    .find((x) => x.value === str)?.path;
}

export function getWarning(str: string) {
  return Object.values(migrations)
    .reduce((acc, val) => [...val, ...acc], [])
    .find((x) => x.value === str)?.warning;
}

export function getMigrationNames() {
  return Object.values(migrations).reduce(
    (acc, val) => [...val.map((x) => x.value), ...acc],
    [] as string[],
  );
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
