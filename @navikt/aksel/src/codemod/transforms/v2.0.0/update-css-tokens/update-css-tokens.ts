import { tokens } from "../../../tokens-map.js";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file) {
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
