import { tokens } from "../update-css-tokens/update-css-tokens";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  let src = file.source;

  tokens.forEach((tok) => {
    const rgx = new RegExp("(" + tok[0] + ")", "gm");
    src = src.replace(rgx, tok[1]);
  });

  return src;
}
