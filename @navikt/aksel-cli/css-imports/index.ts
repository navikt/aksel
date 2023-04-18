import { StyleMappings } from "@navikt/ds-css/config/mappings.mjs";
import { generateImportOutput } from "./generate-output.js";
import { AnswersT } from "./config.js";

import { inquiry } from "./inquiry.js";
import { scanCode } from "./scan-code.js";

main();

async function main() {
  let answers: AnswersT = {
    "config-type": "simple",
    cdn: false,
    autoscan: false,
    tailwind: false,
    imports: null,
    output: "print-clipboard",
  };

  await inquiry(answers, [
    {
      type: "select",
      name: "config-type",
      message: "Config:",
      choices: [
        { name: "Simple import (recommended)", value: "simple" },
        { name: "Fine-graind CSS-imports (advanced)", value: "advanced" },
      ],
    },
    {
      type: "select",
      name: "cdn",
      message: "Import variant:",
      choices: [
        { name: "Static import (default)", value: false },
        { name: "CDN import (not recommended)", value: true },
      ],
    },
  ]);

  if (!answers?.cdn) {
    await inquiry(answers, [
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

  await inquiry(answers, [
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

  await inquiry(answers, [
    {
      type: "multiselect",
      name: "imports",
      message: "Imports",
      choices: [
        {
          name: "Default-imports",
          value: "default",
          choices: [
            { name: "fonts", value: "fonts", enabled: true },
            { name: "tokens (required)", value: "tokens", enabled: true },
            { name: "baseline (required)", value: "baseline", enabled: true },
            { name: "reset", value: "reset", enabled: true },
            { name: "print", value: "print", enabled: true },
          ],
        },
        {
          name: "Components",
          value: "components",
          choices: [
            ...StyleMappings.map((x) => ({
              name: x.component,
              value: x.component,
              checked: foundComponents.includes(x.component),
            })),
          ],
        },
      ],
    },
  ]);

  await generateImportOutput(answers);
}
