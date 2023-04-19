import fs from "fs";
import { AnswersT, ComponentPrefix } from "./config.js";
import {
  formCss,
  typoCss,
  componentsCss,
  StyleMappings,
} from "@navikt/ds-css/config/mappings.mjs";
import { inquiry } from "./inquiry.js";
import clipboard from "clipboardy";
import lodash from "lodash";

const version = JSON.parse(fs.readFileSync("./package.json", "utf8")).version;

export async function generateImportOutput(answers: AnswersT) {
  const useCdn = answers.cdn === "cdn";

  const imports = [];
  let importStr = "";

  await inquiry(answers, [
    {
      type: "select",
      name: "output",
      message: "Output format",
      initial: "print-clipboard",
      choices: [
        { message: "Clipboard & Print", name: "clipboard-print" },
        { message: "Clipboard", name: "clipboard" },
        { message: "Print", name: "print" },
      ],
    },
  ]);

  answers["config-type"] === "regular"
    ? imports.push(simpleOutput(useCdn))
    : imports.push(...advancedOutput(answers, useCdn));

  if (answers.tailwind) {
    importStr = `@import "tailwindcss/base";
${imports.join("\n")}

@import "tailwindcss/components";
@import "tailwindcss/utilities";
    `;
  } else {
    importStr = imports.join("\n");
  }

  let notes = "";
  useCdn &&
    (notes +=
      "We recommend using Static imports, then uploading the files + application-CSS to your own CDN.\nRemember to add 'https://cdn.nav.no' to your applications CSP!\n\n");

  answers.tailwind &&
    (notes +=
      "When using tailwind with Aksel, you will need to add the postcss plugin 'postcss-import'. Read more here: https://aksel.nav.no/grunnleggende/kode/tailwind .\n\n");

  answers.output.includes("print") && console.log(`\nImport:\n${importStr}\n`);
  console.log(notes.trim());

  answers.output.includes("clipboard") && clipboard.writeSync(importStr);
}

function simpleOutput(cdn: boolean) {
  const options = {
    static: `@import "@navikt/ds-css"`,
    cdn: toCdn("index.css"),
  };

  return cdn ? options.cdn : options.static;
}

function advancedOutput(answers: AnswersT, cdn: boolean) {
  const imports = ["/* Defaults */"];
  const baselineImports = answers.imports.filter(
    (x) => !x.startsWith(ComponentPrefix) && x !== "default"
  );

  const componentImports = answers.imports
    .filter((x) => x.startsWith(ComponentPrefix) && x !== "components")
    .map((x) => x.replace(ComponentPrefix, ""));

  baselineImports.forEach((x) => {
    cdn
      ? imports.push(toCdn(`${x}.css`))
      : imports.push(toCssImport(`module/${x}.css`));
  });

  if (answers["config-type"] === "easy") {
    cdn
      ? imports.push(toCdn(componentsCss))
      : imports.push(toCssImport(`module/${componentsCss}`));
    return imports;
  }

  const components = new Set();

  componentImports.forEach((x) => {
    const styleRef = StyleMappings.components.find((y) => y.component === x);
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
  if (componentImportsList.length === 0) {
    return imports;
  }

  imports.push(``);
  imports.push(`/* Components */`);

  componentImportsList.forEach((x) => {
    const pascalCase = lodash
      .startCase(lodash.camelCase(x.replace("css", "")))
      .replace(/ /g, "");
    cdn
      ? imports.push(toCdn(pascalCase))
      : imports.push(toCssImport(`module/${pascalCase}`));
  });

  return imports;
}

function toCdn(str: string): string {
  return `<link rel="preload" href="https://cdn.nav.no/aksel/@navikt/ds-css/${version}/${str}" as="style"></link>`;
}

function toCssImport(str: string): string {
  return `@import "@navikt/ds-css/${str}";`;
}
