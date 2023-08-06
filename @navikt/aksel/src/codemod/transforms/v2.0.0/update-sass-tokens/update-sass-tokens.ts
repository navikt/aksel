import { translateToken } from "../../../utils/translate-token";
import { tokens } from "../../../tokens-map.mjs";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  let src = file.source;

  tokens.forEach((tok) => {
    const scssToken = translateToken(tok[0], "scss");

    const rgx = new RegExp("(\\" + scssToken + ")", "gm");
    src = src.replace(rgx, translateToken(tok[1], "scss"));
  });

  return src;
}
