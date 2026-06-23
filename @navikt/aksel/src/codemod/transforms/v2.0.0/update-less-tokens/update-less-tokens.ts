import type { FileInfo } from "jscodeshift";
import { tokens } from "../../../tokens-map.js";
import { translateToken } from "../../../utils/translate-token";

export default function transformer(file: FileInfo) {
  let src = file.source;

  tokens.forEach((tok) => {
    const lessToken = translateToken(tok[0], "less");

    const rgx = new RegExp("(\\" + lessToken + ")", "gm");
    src = src.replace(rgx, translateToken(tok[1], "less"));
  });

  return src;
}
