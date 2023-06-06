"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translate_token_1 = require("../../../utils/translate-token");
const tokens_map_mjs_1 = require("../../../tokens-map.mjs");
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
function transformer(file, api) {
  let src = file.source;
  tokens_map_mjs_1.tokens.forEach((tok) => {
    const scssToken = (0, translate_token_1.translateToken)(tok[0], "scss");
    const rgx = new RegExp("(\\" + scssToken + ")", "gm");
    src = src.replace(
      rgx,
      (0, translate_token_1.translateToken)(tok[1], "scss")
    );
  });
  return src;
}
exports.default = transformer;
