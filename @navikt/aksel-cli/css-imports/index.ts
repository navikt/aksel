import inquirer from "inquirer";
import { StyleMappings } from "@navikt/ds-css/config/mappings.mjs";
import path from "path";
import scanner from "react-scanner";
import { generateImportOutput } from "./generate-output.js";
import { AnswersT } from "./config.js";
import { componentPrefix } from "./config.js";
import { inquiry } from "./inquiry.js";

async function main() {
  let answers: AnswersT = null;

  inquiry(answers, [
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
  ]);

  if (!answers["cdn"]) {
    inquiry(answers, [
      {
        type: "confirm",
        name: "tailwind",
        message: "Add tailwind support?",
        default: false,
      },
      {
        type: "confirm",
        name: "layers",
        message: "Add styling to custom @layer rule?",
        default: false,
      },
    ]);
  }

  if (answers["config-type"] === "simple") {
    await generateImportOutput(answers);
    return;
  }

  inquiry(answers, [
    {
      type: "confirm",
      name: "autoscan",
      message: "Scan current directory for used @navikt/ds-react components?",
      default: false,
    },
  ]);

  let foundComponents: string[] = [];

  if (answers["autoscan"]) {
    foundComponents = await scanCode();
    foundComponents.length > 0
      ? console.log(`\nFound components!\n${foundComponents.join(", ")}\n`)
      : console.log(`\nNo components found!\n`);
  }

  inquiry(answers, [
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
  ]);

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
