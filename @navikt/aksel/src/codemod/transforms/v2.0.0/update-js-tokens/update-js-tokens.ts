import type { JSCodeshift } from "jscodeshift";
import { tokens } from "../../../tokens-map.js";
import {
  getImportSpecifier,
  getImportSpecifierName,
  renameImportSpecifier,
} from "../../../utils/imports";
import { getLineTerminator } from "../../../utils/lineterminator";
import { translateToken } from "../../../utils/translate-token";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file: JSCodeshift, api) {
  const src = file.source;

  const j = api.jscodeshift as JSCodeshift;

  let root = j(file.source);

  const jsImport = root.find(j.ImportDeclaration).filter((x) => {
    return ["@navikt/ds-tokens/dist/tokens"].includes(
      x.node.source.value as string,
    );
  });

  if (!jsImport) {
    return src;
  }

  tokens.forEach((token) => {
    const name = translateToken(token[0], "js");
    const out = translateToken(token[1], "js");

    let foundName: string = "";

    getImportSpecifier(j, root, name, "@navikt/ds-tokens/dist/tokens").forEach(
      (x) => (foundName = x.node.imported.name),
    );

    if (name === foundName) {
      const localName =
        getImportSpecifierName(
          j,
          root,
          name,
          "@navikt/ds-tokens/dist/tokens",
        ) || name;

      renameImportSpecifier(
        j,
        root,
        name,
        out,
        "@navikt/ds-tokens/dist/tokens",
      );

      let code = root.toSource(getLineTerminator(file.source));

      const rgx = new RegExp("(" + localName + ")", "gm");
      code = code.replace(rgx, out);
      root = j(code);
    }
  });

  return root.toSource(getLineTerminator(file.source));
}
