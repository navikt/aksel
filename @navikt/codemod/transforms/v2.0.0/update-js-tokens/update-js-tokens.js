"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imports_1 = require("../../../utils/imports");
const translate_token_1 = require("../../../utils/translate-token");
const tokens_map_mjs_1 = require("../../../tokens-map.mjs");
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
function transformer(file, api) {
  let src = file.source;
  const j = api.jscodeshift;
  let root = j(file.source);
  const jsImport = root.find(j.ImportDeclaration).filter((x) => {
    return ["@navikt/ds-tokens/dist/tokens"].includes(x.node.source.value);
  });
  if (!jsImport) {
    return src;
  }
  tokens_map_mjs_1.tokens.forEach((x) => {
    const name = (0, translate_token_1.translateToken)(x[0], "js");
    const out = (0, translate_token_1.translateToken)(x[1], "js");
    let foundName = "";
    (0, imports_1.getImportSpecifier)(
      j,
      root,
      name,
      "@navikt/ds-tokens/dist/tokens"
    ).forEach((x) => (foundName = x.node.imported.name));
    if (name === foundName) {
      const localName =
        (0, imports_1.getImportSpecifierName)(
          j,
          root,
          name,
          "@navikt/ds-tokens/dist/tokens"
        ) || name;
      (0, imports_1.renameImportSpecifier)(
        j,
        root,
        name,
        out,
        "@navikt/ds-tokens/dist/tokens"
      );
      let code = root.toSource();
      const rgx = new RegExp("(" + localName + ")", "gm");
      code = code.replace(rgx, out);
      root = j(code);
    }
  });
  return root.toSource();
}
exports.default = transformer;
