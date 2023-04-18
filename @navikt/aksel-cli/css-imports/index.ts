import { StyleMappings } from "@navikt/ds-css/config/mappings.mjs";
import { generateImportOutput } from "./generate-output.js";
import { AnswersT } from "./config.js";

import { inquiry } from "./inquiry.js";
import { scanCode } from "./scan-code.js";

main();

async function main() {
  let answers: AnswersT = {
    "config-type": "regular",
    cdn: "static",
    autoscan: false,
    tailwind: false,
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
        { message: "Optional defaults + components", name: "easy" },
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

  let foundComponents: string[] = [];

  answers["autoscan"] && (foundComponents = await scanCode());

  await inquiry(answers, [
    {
      type: "multiselect",
      name: "imports",
      message: "Imports",
      choices: [
        {
          message: "Default-imports",
          name: "default",
          choices: [
            { message: "fonts", name: "fonts", enabled: true },
            { message: "tokens (required)", name: "tokens", enabled: true },
            { message: "baseline (required)", name: "baseline", enabled: true },
            { message: "reset", name: "reset", enabled: true },
            { message: "print", name: "print", enabled: true },
          ],
        },
        ...(answers["config-type"] === "advanced"
          ? [
              {
                message: "Components",
                name: "components",
                choices: [
                  ...StyleMappings.map((x) => ({
                    message: x.component,
                    name: x.component,
                    checked: foundComponents.includes(x.component),
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
