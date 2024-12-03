import browserslist from "browserslist";

/* import fs from "fs"; */
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

/* fs.writeFileSync("./OUTPUT.css", codeString); */

console.info(codeString);
