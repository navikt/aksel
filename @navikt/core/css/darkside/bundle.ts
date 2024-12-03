import browserslist from "browserslist";
import fs from "fs";
import { Features, browserslistToTargets, bundle } from "lightningcss";

console.log(
  browserslist(">= 0.4% in NO, safari >= 15.4, iOS >= 15.4, not dead"),
);
const { code } = bundle({
  filename: `./index.css`,
  minify: false,
  include:
    Features.Nesting | Features.MediaRangeSyntax | Features.HexAlphaColors,

  targets: browserslistToTargets(
    browserslist(">= 0.4% in NO, safari >= 15.4, iOS >= 15.4, not dead"),
  ),
});

fs.writeFileSync("./OUTPUT.css", code.toString());
