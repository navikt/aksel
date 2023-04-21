#!/usr/bin/env node
import { StyleMappings } from "@navikt/ds-css/config/mappings.js";
import { generateImportOutput } from "./generate-output.js";
import { AnswersT, ComponentPrefix } from "./config.js";

import { inquiry } from "./inquiry.js";
/* import { scanCode } from "./scan-code.js"; */
import { exec } from "child_process";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { getAllVersions } from "./get-version.js";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

main();

async function main() {
  let answers: AnswersT = {
    "config-type": "regular",
    cdn: "static",
    version: "0.0.0",
    autoscan: false,
    scandir: "",
    tailwind: false,
    layers: false,
    imports: null,
    output: "print-clipboard",
  };

  await inquiry(answers, [
    {
      type: "select",
      name: "config-type",
      message: "Import variants:",
      initial: 0,
      choices: [
        { message: "Regular (recommended)", name: "regular" },
        { message: "Optional defaults + bundled components", name: "easy" },
        { message: "Fine-grained (advanced)", name: "advanced" },
      ],
    },
    {
      type: "select",
      name: "cdn",
      message: "Import format",
      initial: 0,
      choices: [
        { message: "Static import (default)", name: "static" },
        { message: "CDN import (not recommended)", name: "cdn" },
      ],
    },
  ]);

  if (answers?.cdn !== "cdn") {
    await inquiry(answers, [
      {
        type: "confirm",
        name: "tailwind",
        message: "Add tailwind support?",
        initial: false,
      },
      {
        type: "confirm",
        name: "layers",
        message: "Add styling to custom @layer rule?",
        initial: false,
      },
    ]);
  } else {
    let versions = (await getAllVersions()).filter((x) => !x.includes("-"));

    // TODO: Change when released to actual first release (probably 2.9.0)
    const index = versions.findIndex((x) => x.startsWith("2.8."));
    versions = versions.slice(index).reverse();

    await inquiry(answers, [
      {
        type: "autocomplete",
        name: "version",
        message: `@navikt/ds-css version from CDN:`,
        limit: 6,
        initial: 0,
        choices: versions,
        footer() {
          return chalk.grey(
            'Remember to match version with @navikt/ds-react!\nNote: CDN was introduced in v2.9.0, older versions not available.\nUse "static" import instead.'
          );
        },
      },
    ]);
  }

  if (answers["config-type"] === "regular") {
    await generateImportOutput(answers);
    return;
  }

  answers["config-type"] === "advanced" &&
    (await inquiry(answers, [
      {
        type: "confirm",
        name: "autoscan",
        message: "Scan current directory for '@navikt/ds-react' components?",
        initial: false,
      },
    ]));

  answers.autoscan &&
    (await inquiry(answers, [
      {
        type: "input",
        name: "scandir",
        message: `Directory to scan (leave empty for current dir):\n ${process.cwd()}/`,
        initial: "",
      },
    ]));

  let foundComponents: string[] = [];

  if (answers["autoscan"]) {
    foundComponents = await new Promise((resolve) => {
      exec(`node ${__dirname}/scan-code.js ${answers.scandir}`, (_, stdout) => {
        resolve(
          stdout ? JSON.parse(stdout.trim().split("\n").slice(1).join("")) : []
        );
      });
    });
  }

  await inquiry(answers, [
    {
      type: "multiselect",
      name: "imports",
      message: "Imports",
      initial: [
        ...StyleMappings.baseline.map((x) => x.main.replace(".css", "")),
        ...StyleMappings.components
          .filter((x) => foundComponents.includes(x.component))
          .map((x) => `${ComponentPrefix}${x.component}`),
      ],
      choices: [
        {
          message: "Default-imports",
          name: "default",
          choices: [
            ...StyleMappings.baseline.map((x) => ({
              message: `${x.main.replace(".css", "")}${
                x.optional ? "" : " (required)"
              }`,
              name: x.main.replace(".css", ""),
            })),
          ],
        },
        ...(answers["config-type"] === "advanced"
          ? [
              {
                message: "Components",
                name: "components",
                choices: [
                  ...StyleMappings.components.map((x) => ({
                    message: x.component,
                    name: `${ComponentPrefix}${x.component}`,
                  })),
                ],
              },
            ]
          : []),
      ],
    },
  ]);

  await generateImportOutput(answers);
}
