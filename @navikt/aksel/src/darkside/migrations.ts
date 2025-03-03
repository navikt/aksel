import chalk from "chalk";

export const migrations: {
  [key: string]: {
    description: string;
    value: string;
    path: string;
    warning?: string;
  }[];
} = {
  darkside: [
    {
      description:
        "Updates all Primitives to use new `space`-tokens. (Works with old and new system)",
      value: "primitive-spacing",
      path: "darkside/primitives-spacing/spacing",
    },
    {
      description:
        "Updates css, scss and less-variables to use new `space`-tokens. (Works with old and new system)",
      value: "token-spacing",
      path: "darkside/token-spacing/spacing",
    },
    {
      description:
        "Updates js-tokens to use new `space`-tokens. (Works with old and new system)",
      value: "token-spacing-js",
      path: "darkside/token-spacing-js/spacing",
    },
    {
      description:
        "Updates css, scss and less-variables to use new token-prefix",
      value: "token-update",
      path: "darkside/token-update/token-update",
    },
    {
      description: "Updates js tokens to use new token-prefix and names",
      value: "token-update-js",
      path: "darkside/token-update-js/token-update-js",
    },
  ],
};

export function getMigrationPath(str: string) {
  return Object.values(migrations)
    .flat()
    .find((x) => x.value === str)?.path;
}

export function getWarning(str: string) {
  return Object.values(migrations)
    .flat()
    .find((x) => x.value === str)?.warning;
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
