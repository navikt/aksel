import chalk from "chalk";

export const migrations = {
  "1.0.0": [
    {
      name: "v1-preset: Runs all codemods for beta -> v1 migration",
      value: "v1-preset",
      path: "v1.0.0/preset",
    },
    {
      name: "v1-pagination: Fixes breaking API-changes in <Pagination /> component",
      value: "v1-pagination",
      path: "v1.0.0/pagination",
    },
    {
      name: "v1-tabs: Fixes breaking API-changes in <Tabs /> component",
      value: "v1-tabs",
      path: "v1.0.0/tabs",
    },
    {
      name: "v1-chat: Fixes breaking API-changes in <SpeechBubble /> (now <Chat/>) component",
      value: "v1-chat",
      path: "v1.0.0/chat",
    },
  ],
  "2.0.0": [
    {
      name: "v2-css: Patches changed css-variables",
      value: "v2-css",
      path: "v2.0.0/update-css-tokens/update-css-tokens",
    },
    {
      name: "v2-js: Patches changed js-variables",
      value: "v2-js",
      path: "v2.0.0/update-js-tokens/update-js-tokens",
    },
    {
      name: "v2-sass: Patches changed sass-variables",
      value: "v2-sass",
      path: "v2.0.0/update-sass-tokens/update-sass-tokens",
    },
    {
      name: "v2-less: Patches changed less-variables",
      value: "v2-less",
      path: "v2.0.0/update-less-tokens/update-less-tokens",
    },
  ],
};

export function getMigrationString() {
  let str = "";

  Object.entries(migrations).forEach(([version, migrations]) => {
    str += `\n${chalk.underline(version)}\n`;
    migrations.forEach((migration) => {
      str += `${migration.name}\n`;
    });
  });

  return str;
}
