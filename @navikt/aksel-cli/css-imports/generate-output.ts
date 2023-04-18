import fs from "fs";
import { AnswersT } from "./config.js";
import { componentPrefix } from "./config.js";
import {
  formCss,
  typoCss,
  StyleMappings,
} from "@navikt/ds-css/config/mappings.mjs";
import { inquiry } from "./inquiry.js";

const version = JSON.parse(fs.readFileSync("./package.json", "utf8")).version;

export async function generateImportOutput(answers: AnswersT) {
  console.log(answers);

  const imports = [];
  let importStr = "";

  inquiry(answers, [
    {
      type: "list",
      name: "output",
      message: "Output-format",
      choices: [
        { name: "Clipboard", value: "clipboard" },
        { name: "Print", value: "print" },
        { name: "Clipboard & Print", value: "print-clipboard" },
      ],
    },
  ]);

  answers["config-type"] === "simple" &&
    imports.push(simpleOutput(answers["cdn"]));

  answers["config-type"] === "advanced" &&
    imports.push(...advancedOutput(answers));

  if (answers.tailwind) {
    importStr = `@import "tailwindcss/base";
${imports.join("\n")}

@import "tailwindcss/components";
@import "tailwindcss/utilities";
    `;
  } else {
    importStr = imports.join("\n");
  }

  console.log(importStr);
}

function simpleOutput(cdn: boolean) {
  const options = {
    static: `@import "@navikt/ds-css";`,
    cdn: `<link rel="preload" href="https://cdn.nav.no/aksel/@navikt/ds-css/${version}/index.css" as="style"></link>`,
  };

  return cdn ? options.cdn : options.static;
}

function advancedOutput(answers: AnswersT) {
  const imports = ["/* Defaults */"];
  const baselineImports = answers.imports.filter(
    (x) => !x.startsWith(componentPrefix)
  );

  const componentImports = answers.imports
    .filter((x) => x.startsWith(componentPrefix))
    .map((x) => x.replace(componentPrefix, ""));

  baselineImports.forEach((x) => {
    answers.cdn
      ? imports.push(
          `<link rel="preload" href="https://cdn.nav.no/aksel/@navikt/ds-css/${version}/${x}.css" as="style"></link>`
        )
      : imports.push(`@import "@navikt/ds-css/module/${x}.css";`);
  });

  const components = new Set();

  componentImports.forEach((x) => {
    const styleRef = StyleMappings.find((y) => y.component === x);
    if (styleRef) {
      components.add(styleRef.main);
      styleRef?.dependencies?.forEach((dep) => components.add(dep));
    }
  });

  let componentImportsList = (Array.from(components) as string[])
    .filter((x) => x.length > 0)
    .sort((a, b) => a.localeCompare(b));

  if (componentImportsList.find((x) => x === formCss)) {
    componentImportsList = componentImportsList.filter((x) => x !== formCss);
    componentImportsList.unshift(formCss);
  }

  if (componentImportsList.find((x) => x === typoCss)) {
    componentImportsList = componentImportsList.filter((x) => x !== typoCss);
    componentImportsList.unshift(typoCss);
  }

  imports.push(``);
  imports.push(`/* Components */`);

  componentImportsList.forEach((x) =>
    answers.cdn
      ? imports.push(
          `<link rel="preload" href="https://cdn.nav.no/aksel/@navikt/ds-css/${version}/${x}" as="style"></link>`
        )
      : imports.push(`@import "@navikt/ds-css/module/${x}";`)
  );

  return imports;
}
