import browserslist from "browserslist";
import CleanCss from "clean-css";
import fs from "fs";
import { Features, browserslistToTargets, bundleAsync } from "lightningcss";
import path from "path";
import { componentsCss } from "../config/_mappings";

const buildDir = path.join(__dirname, "..", "dist/darkside");

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

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

/* Build index files */
bundleCSS().then((file) => {
  writeFile({
    file,
    filePath: "index.css",
  });
});

/* Build Component files */

const rootComponentsParser = (rootString: string) => {
  const parsed = rootString
    .split("\n")
    .filter((line) => {
      return (
        line.endsWith("layer(aksel.components);") ||
        line.endsWith("layer(aksel.layout);")
      );
    })
    .join("\n");

  /* console.log(parsed); */
  return parsed;
};

bundleCSS(rootComponentsParser).then((file) => {
  writeFile({
    file,
    filePath: componentsCss,
  });
});
