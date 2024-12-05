import browserslist from "browserslist";
import CleanCss from "clean-css";
import fs from "fs";
import { Features, browserslistToTargets, bundle } from "lightningcss";

const { code } = bundle({
  filename: `./index.css`,
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

if (!fs.existsSync("../dist/darkside")) {
  fs.mkdirSync("../dist/darkside");
}

const minifiedCss = new CleanCss({}).minify(codeString);

if (minifiedCss.errors.length > 0) {
  console.error("Errors found when minifying CSS. Stopped bundling");
}

fs.writeFileSync("../dist/darkside/index.css", minifiedCss.styles);
