import type { FileInfo } from "jscodeshift";
import { tokens } from "../../../tokens-map.js";
import { translateToken } from "../../../utils/translate-token";

export default function transformer(file: FileInfo) {
  let src = file.source;

  tokens.forEach((tok) => {
    const scssToken = translateToken(tok[0], "scss");

    const rgx = new RegExp(`(\\${scssToken})`, "gm");
    src = src.replace(rgx, translateToken(tok[1], "scss"));
  });

  return src;
}
