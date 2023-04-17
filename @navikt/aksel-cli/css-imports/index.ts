import inquirer from "inquirer";
import { StyleMappings } from "@navikt/ds-css/config/mappings.mjs";
import path from "path";
import scanner from "react-scanner";
import { generateImportOutput } from "./generate-output.js";
import { AnswersT } from "./config.js";
import { componentPrefix } from "./config.js";

async function main() {
  let answers: AnswersT = null;

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
    ])
    .then((a) => {
      answers = { ...answers, ...a };
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(
          "Oops, something went wrong! Looks like aksel-cli can't run in this terminal. Contact Aksel"
        );
      } else {
        console.error(error);
      }
    });

  if (!answers["cdn"]) {
    await inquirer
      .prompt([
        {
          type: "confirm",
          name: "tailwind",
          message: "Add tailwind support?",
          default: false,
        },
      ])
      .then((a) => {
        answers = { ...answers, ...a };
      })
      .catch(console.error);
  }

  if ("simple" === answers["config-type"]) {
    await generateImportOutput(answers);
    return;
  }

  await inquirer
    .prompt([
      {
        type: "confirm",
        name: "autoscan",
        message: "Scan current directory for used @navikt/ds-react components?",
        default: false,
      },
    ])
    .then((a) => {
      answers = { ...answers, ...a };
    })
    .catch(console.error);

  let foundComponents: string[] = [];

  if (answers["autoscan"]) {
    foundComponents = await scanCode();
    foundComponents.length > 0
      ? console.log(`\nFound components!\n${foundComponents.join(", ")}\n`)
      : console.log(`\nNo components found!\n`);
  }

  await inquirer
    .prompt([
      {
        type: "checkbox",
        name: "imports",
        message: "Imports",
        choices: [
          new inquirer.Separator("Defaults"),
          { name: "fonts", value: "fonts", checked: true },
          { name: "tokens (required)", value: "tokens", checked: true },
          { name: "baseline (required)", value: "baseline", checked: true },
          { name: "reset", value: "reset", checked: true },
          { name: "print", value: "print", checked: true },
          new inquirer.Separator("Components"),
          ...StyleMappings.map((x) => ({
            name: x.component,
            value: `${componentPrefix}${x.component}`,
            checked: foundComponents.includes(x.component),
          })),
        ],
      },
    ])
    .then((a) => {
      answers = { ...answers, ...a };
    })
    .catch(console.error);

  await generateImportOutput(answers);
}

async function scanCode() {
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

  return Object.keys(result);
}

main();
