import fs from "fs";
import { Features, bundle } from "lightningcss";

const { code } = bundle({
  filename: `./index.css`,
  minify: false,
  include:
    Features.Nesting | Features.MediaRangeSyntax | Features.HexAlphaColors,
});

fs.writeFileSync("./OUTPUT.css", code.toString());
