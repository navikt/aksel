import browserslist from "browserslist";
import CleanCss from "clean-css";
import fs from "fs";
import { Features, browserslistToTargets, bundle } from "lightningcss";
import path from "path";

const { code } = bundle({
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

const buildDir = path.join(__dirname, "..", "dist/darkside");

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

const minifiedCss = new CleanCss({}).minify(codeString);

if (minifiedCss.errors.length > 0) {
  console.error("Errors found when minifying CSS. Stopped bundling");
}

fs.writeFileSync(`${buildDir}/index.css`, minifiedCss.styles);
