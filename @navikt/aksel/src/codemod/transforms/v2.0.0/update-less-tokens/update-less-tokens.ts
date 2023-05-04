import { translateToken } from "../../../utils/translate-token";
import { tokens } from "../../../tokens-map.mjs";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  let src = file.source;

  tokens.forEach((tok) => {
    const lessToken = translateToken(tok[0], "less");

    const rgx = new RegExp("(\\" + lessToken + ")", "gm");
    src = src.replace(rgx, translateToken(tok[1], "less"));
  });

  return src;
}
