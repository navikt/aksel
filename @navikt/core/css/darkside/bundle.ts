import browserslist from "browserslist";
import CleanCss from "clean-css";
import fs from "fs";
import { Features, browserslistToTargets, bundleAsync } from "lightningcss";
import path from "path";
import {
  StyleMappings,
  componentsCss,
  formCss,
  primitivesCss,
} from "../config/_mappings";

const buildDir = path.join(__dirname, "..", "dist/darkside");

[buildDir, `${buildDir}/global`, `${buildDir}/component`].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const rootFile = fs.readFileSync(`${__dirname}/index.css`, "utf8");

const layerDefinition = rootFile
  .split("\n")
  .find((line) => line.startsWith("@layer"));

if (!layerDefinition) {
  console.error("No layer definition found in index.css. Stopped bundling");
  process.exit(1);
}

async function bundleCSS(rootParser?: (rootFile: string) => string) {
  const { code } = await bundleAsync({
    filename: `${__dirname}/index.css`,
    minify: false,
    include:
      Features.Nesting | Features.MediaRangeSyntax | Features.HexAlphaColors,

    drafts: {
      customMedia: false,
    },
    targets: browserslistToTargets(
      browserslist(">= 0.5% in NO, safari >= 15.4, iOS >= 15.4, not dead"),
    ),
    resolver: {
      read(filePath) {
        const file = fs.readFileSync(filePath, "utf8");
        if (filePath === `${__dirname}/index.css` && rootParser) {
          return rootParser(file);
        }

        return file;
      },
    },
  });

  let codeString = code.toString();

  /**
   * LightningCSS adds these tokens to the bundle that we want removed:
   * --lightningcss-light: initial;
   * --lightningcss-dark: ;
   */
  codeString = codeString
    .split("\n")
    .filter((line) => !line.includes("--lightningcss-"))
    .join("\n");

  return codeString;
}

function writeFile({ file, filePath }: { file: string; filePath: string }) {
  fs.writeFileSync(`${buildDir}/${filePath}`, file);

  const minifiedCss = new CleanCss({}).minify(file);

  if (minifiedCss.errors.length > 0) {
    console.error(
      `Errors found when minifying for ${filePath} CSS. Stopped bundling`,
    );
  }

  fs.writeFileSync(
    `${buildDir}/${filePath.replace(".css", ".min.css")}`,
    minifiedCss.styles,
  );
}

/* ----------------------------- index.css build ---------------------------- */
bundleCSS().then((file) => {
  writeFile({
    file,
    filePath: "index.css",
  });
});

/* --------------------------- component.css build -------------------------- */
function rootComponentsParser(rootString: string) {
  let parsed = rootString
    .split("\n")
    .filter((line) => {
      return (
        line.endsWith("layer(aksel.components);") ||
        line.endsWith("layer(aksel.layout);")
      );
    })
    .join("\n");

  parsed = layerDefinition + "\n" + parsed;

  return parsed;
}

bundleCSS(rootComponentsParser).then((file) => {
  writeFile({
    file,
    filePath: componentsCss,
  });
});

/* ------------------------------ /global build ----------------------------- */
StyleMappings.baseline.forEach((style) => {
  function parser(input: string) {
    return input
      .split("\n")
      .filter((line) => line.startsWith("@import"))
      .filter((line) =>
        line.replace(".darkside.css", ".css").includes(style.main),
      )
      .join("\n");
  }

  bundleCSS(parser).then((file) => {
    writeFile({
      file,
      filePath: `global/${style.main}`,
    });
  });
});

/* ------------------------------ form build ----------------------------- */
function rootFormParser(input: string) {
  return input
    .split("\n")
    .filter((line) => line.startsWith("@import"))
    .filter((line) => line.includes("form/index.css"))
    .join("\n");
}

bundleCSS(rootFormParser).then((file) => {
  writeFile({
    file,
    filePath: `component/${formCss}`,
  });
});

/* ------------------------------ Primitives build ----------------------------- */
function rootPrimitivesParser(input: string) {
  return input
    .split("\n")
    .filter((line) => line.startsWith("@import"))
    .filter((line) => line.includes("primitives/index.css"))
    .join("\n");
}

bundleCSS(rootPrimitivesParser).then((file) => {
  writeFile({
    file,
    filePath: `component/${primitivesCss}`,
  });
});

/* ---------------------------- /component build ---------------------------- */
