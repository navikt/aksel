import inquirer from "inquirer";
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { StyleMappings } from "@navikt/ds-css/config/mappings.mjs";
import path from "path";
import scanner from "react-scanner";

async function main() {
  let answers = {};

  await inquirer
    .prompt([
      {
        type: "list",
        name: "config-type",
        message: "Config:",
        choices: [
          { name: "Simple import (recommended)", value: "simple" },
          { name: "Fine-graind CSS-imports (advanced)", value: "advanced" },
        ],
      },
      {
        type: "list",
        name: "cdn",
        message: "Import variant:",
        choices: [
          { name: "Static import (default)", value: false },
          { name: "CDN import (not recommended)", value: true },
        ],
      },
      {
        type: "confirm",
        name: "tailwind",
        message: "Add tailwind support?",
        default: false,
      },
      {
        type: "confirm",
        name: "tailwind",
        message: "Add tailwind support?",
        default: false,
      },
      {
        type: "confirm",
        name: "autoscan",
        message: "Scan current directory for used @navikt/ds-react components?",
        default: false,
      },
      /* {
        type: "checkbox",
        name: "imports",
        message: "Imports",
        choices: [
          new inquirer.Separator("Defaults"),
          { name: "baseline (required)", value: "baseline", checked: true },
          { name: "tokens (required)", value: "baseline", checked: true },
          { name: "fonts", value: "baseline", checked: true },
          { name: "reset", value: "baseline", checked: true },
          { name: "print", value: "baseline", checked: true },
          new inquirer.Separator("Components"),
          ...StyleMappings.map((x) => ({
            name: x.component,
            value: x.component,
            checked: false,
          })),
        ],
      }, */
    ])
    .then((a) => {
      console.log("Answers: ", a);
      answers = { ...answers, ...a };
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(
          "Oops, something went wrong! Looks like aksel-cli can't run in this terminal. Contact Aksel"
        );
      }
    });

  scanReactCode();

  /* generateImports(); */
}

async function scanReactCode() {
  const config = {
    rootDir: ".",
    crawlFrom: "../",
    globs: ["**/!(*.test|*.spec|*.stories|*.story).@(jsx|tsx)"],
    exclude: (dirname: string) => dirname === "node_modules",
    getComponentName: ({
      imported,
      moduleName,
    }: {
      imported: string;
      moduleName: string;
    }) => imported || path.basename(moduleName),
  };

  let result: any | null = null;

  await scanner.run({
    ...config,
    importedFrom: /@navikt\/ds-react/,
    processors: [
      "count-components",
      ({ report }) => {
        result = report;
      },
    ],
  });

  console.log(result);
  return null;
}
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function generateImports() {
  console.log(
    `\nAdd these imports to your project:\n
@import "@navikt/ds-css/module/Fonts.css";
@import "@navikt/ds-css/module/Reset.css";
@import "@navikt/ds-css/module/Baseline.css";
@import "@navikt/ds-css/module/Tokens.css";
@import "@navikt/ds-css/module/Typography.css";
@import "@navikt/ds-css/module/Alert.css";
@import "@navikt/ds-css/module/Button.css";
`
  );
}

main();
