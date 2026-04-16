import type { FileInfo } from "jscodeshift";
import { tokens } from "../../../tokens-map.js";

export default function transformer(file: FileInfo) {
  let src = file.source;

  tokens.forEach((tok) => {
    const rgx = new RegExp("(" + `${tok[0]}:` + ")", "gm");
    src = src.replace(rgx, `--v2-migration${tok[0].replace("--", "__")}:`);
  });

  tokens.forEach((tok) => {
    const rgx = new RegExp("(" + tok[0] + ")", "gm");
    src = src.replace(rgx, tok[1]);
  });

  return src;
}
