import { AnswersT, ComponentPrefix, layerSuffix } from "./config.js";
import {
  formCss,
  typoCss,
  componentsCss,
  StyleMappings,
  componentDir,
  rootDir,
  globalDir,
} from "@navikt/ds-css/config/_mappings";
import { inquiry } from "./inquiry";
import clipboard from "clipboardy";
import lodash from "lodash";
import chalk from "chalk";

export async function generateImportOutput(answers: AnswersT) {
  const useCdn = answers.cdn === "yes";
  const useTailwind = answers.tailwind === "yes";
  const version = answers.version;

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
    ? imports.push(simpleOutput(useCdn, answers.layers === "yes", version))
    : imports.push(
        ...advancedOutput(answers, useCdn, answers.layers === "yes", version)
      );

  if (useTailwind) {
    importStr = `@import "tailwindcss/base";
${imports.join("\n")}

@import "tailwindcss/components";
@import "tailwindcss/utilities";
    `;
  } else {
    importStr = imports.join("\n");
  }

  if (answers.output.includes("print")) {
    console.log(chalk.bold.cyan(`\nImports 🚀 \n`));
    console.log(chalk.green(`${importStr}`));
  }

  if (useCdn) {
    console.log(chalk.bold.underline.cyan(`\nNotes on CDN-usage 📝`));
    console.log(
      `We recommend using Static imports, then uploading the your bundled static-files to your own CDN-instance.
✔︎ This allows you to control the version of the CSS-files with package.json, and avoids desync between ds-react/ds-css.
✔︎ Remember to add 'https://cdn.nav.no' to your applications CSP!`
    );
  }

  if (useTailwind) {
    console.log(chalk.bold.underline.cyan(`\nNotes on Tailwind-use 📝`));
    console.log(
      `When using tailwind with Aksel, you will need to add the postcss plugin ${chalk.cyan(
        "postcss-import"
      )}
✔︎ NPM: https://www.npmjs.com/package/postcss-import
✔︎ Read more here: https://aksel.nav.no/grunnleggende/kode/tailwind`
    );
  }

  if (answers.layers === "yes") {
    console.log(chalk.bold.underline.cyan(`\nNotes on Layers 📝`));
    console.log(
      `Layers is not yet supported in Safari <= 15.3. (https://caniuse.com/css-cascade-layers)`
    );
  }

  answers.output.includes("clipboard") && clipboard.writeSync(importStr);
}

function simpleOutput(cdn: boolean, layers: boolean, version: string) {
  const options = {
    static: `@import "@navikt/ds-css"${layers ? layerSuffix : ""};`,
    cdn: toCdn("index.css", version),
  };

  return cdn ? options.cdn : options.static;
}

function advancedOutput(
  answers: AnswersT,
  cdn: boolean,
  layers: boolean,
  version: string
) {
  const imports = ["/* Defaults */"];
  const baselineImports = answers.imports.filter(
    (x) => !x.startsWith(ComponentPrefix) && x !== "default"
  );

  const componentImports = answers.imports
    .filter((x) => x.startsWith(ComponentPrefix) && x !== "components")
    .map((x) => x.replace(ComponentPrefix, ""));

  baselineImports.forEach((x) => {
    cdn
      ? imports.push(toCdn(`${globalDir}/${x}.css`, version))
      : imports.push(toCssImport(`${globalDir}/${x}.css`, layers));
  });

  if (answers["config-type"] === "easy") {
    cdn
      ? imports.push(toCdn(componentsCss, version))
      : imports.push(toCssImport(`${rootDir}/${componentsCss}`, layers));
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
    const pascalCase = lodash.camelCase(x.replace("css", "")).toLowerCase();
    cdn
      ? imports.push(toCdn(`${componentDir}/${pascalCase}.css`, version))
      : imports.push(toCssImport(`${componentDir}/${pascalCase}.css`, layers));
  });

  return imports;
}

function toCdn(str: string, version: string): string {
  return `<link rel="preload" href="https://cdn.nav.no/aksel/@navikt/ds-css/${version}/${str
    .replace(".css", ".min.css")
    .replace(`${rootDir}/`, "")}" as="style"></link>`;
}

function toCssImport(str: string, layers: boolean): string {
  return `@import "@navikt/ds-css/${str}"${layers ? layerSuffix : ""};`;
}
