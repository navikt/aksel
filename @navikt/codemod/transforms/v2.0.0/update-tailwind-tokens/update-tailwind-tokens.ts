import { tokens } from "../../../tokens-map.mjs";

/* Cherry-picks object keys we want */
const semanticTokens = () =>
  tokens
    .filter((val) => val[0].startsWith("--navds-semantic-color"))
    .map((val) => {
      return [
        val[0].replace("--navds-semantic-color-", "-"),
        val[1].replace("--a-", "-"),
      ];
    });

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  let src = file.source;
  const colors = semanticTokens();
  const duplicateText: string[][] = [];
  /*
  colors.forEach(
    (x) =>
      x[0].startsWith("-text-") && duplicateText.push(["-text-" + x[0], x[1]])
  ); */

  [...duplicateText, ...colors].forEach((tok) => {
    const rgx = new RegExp("(" + tok[0] + ")", "gm");
    const rgxNested = new RegExp("(" + tok[0] + "[-])", "gm");
    if (!src.match(rgxNested)) {
      src = src.replace(rgx, tok[1]);
    }
  });

  return src;
}
