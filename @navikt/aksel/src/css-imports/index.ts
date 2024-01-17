import chalk from "chalk";
import { exec } from "child_process";
import { StyleMappings } from "@navikt/ds-css/config/_mappings";
import { AnswersT, ComponentPrefix } from "./config";
import { generateImportOutput } from "./generate-output";
import { getDirectories } from "./get-directories";
import { getAllVersions } from "./get-version";
import { inquiry } from "./inquiry";

export async function cssImportsCommand() {
  const answers: AnswersT = {
    "config-type": "regular",
    cdn: "no",
    version: "0.0.0",
    autoscan: "no",
    scandir: "",
    tailwind: "no",
    layers: "no",
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
        { message: "Regular import (recommended)", name: "regular" },
        { message: "Partial control (global)", name: "easy" },
        { message: "Full control (global + components)", name: "advanced" },
      ],
      footer() {
        return chalk.grey(
          `${chalk.cyan(
            `\n  Documentation:`,
          )}\n  Regular: https://aksel.nav.no/grunnleggende/kode/css-import
  Partial: https://aksel.nav.no/grunnleggende/kode/css-import#h64650b1a4ad6
  Full: https://aksel.nav.no/grunnleggende/kode/css-import#h4037598416ef\n`,
        );
      },
    },
    {
      type: "select",
      name: "cdn",
      message: "Import format",
      initial: 0,
      choices: [
        { message: "Static import (default)", name: "no" },
        { message: "CDN import (not recommended)", name: "yes" },
      ],
    },
  ]);

  if (answers?.cdn === "no") {
    await inquiry(answers, [
      {
        type: "select",
        name: "tailwind",
        message: "Add tailwind support?",
        initial: 0,
        choices: [
          { message: "No", name: "no" },
          { message: "Yes", name: "yes" },
        ],
      },
      {
        type: "select",
        name: "layers",
        message: "Add styling to custom @layer rule?",
        initial: 0,
        choices: [
          { message: "No", name: "no" },
          { message: "Yes", name: "yes" },
        ],
      },
    ]);
  } else {
    let versions = (await getAllVersions()).filter((x) => !x.includes("-"));

    const index = versions.findIndex((x) => x.startsWith("2.9.0"));
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
            'Remember to match version with @navikt/ds-react!\nNote: CDN was introduced in v2.9.0, older versions not available.\nUse "static" import instead.',
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
        type: "select",
        name: "autoscan",
        message: "Scan current directory for '@navikt/ds-react' components?",
        initial: 0,
        choices: [
          { message: "No", name: "no" },
          { message: "Yes", name: "yes" },
        ],
      },
    ]));

  answers.autoscan === "yes" &&
    (await inquiry(answers, [
      {
        type: "autocomplete",
        name: "scandir",
        message: `Directory to scan`,
        limit: 6,
        initial: 0,
        choices: getDirectories(),
        footer() {
          return chalk.grey(
            "filtered out: node_moduels, dist, build, lib, .* (dotfiles)",
          );
        },
      },
    ]));

  let foundComponents: string[] = [];

  if (answers["autoscan"] === "yes") {
    foundComponents = await new Promise((resolve) => {
      exec(`node ${__dirname}/scan-code.js ${answers.scandir}`, (_, stdout) => {
        resolve(
          stdout ? JSON.parse(stdout.trim().split("\n").slice(1).join("")) : [],
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
