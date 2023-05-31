import type { JSCodeshift } from "jscodeshift";
import {
  getImportSpecifier,
  getImportSpecifierName,
  renameImportSpecifier,
} from "../../../utils/imports";
import { translateToken } from "../../../utils/translate-token";
import { tokens } from "../../../tokens-map.mjs";
import { getLineTerminator } from "../../../utils/lineterminator";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file: JSCodeshift, api) {
  let src = file.source;

  const j = api.jscodeshift as JSCodeshift;

  let root = j(file.source);

  const jsImport = root.find(j.ImportDeclaration).filter((x) => {
    return ["@navikt/ds-tokens/dist/tokens"].includes(
      x.node.source.value as string
    );
  });

  if (!jsImport) {
    return src;
  }

  tokens.forEach((x) => {
    const name = translateToken(x[0], "js");
    const out = translateToken(x[1], "js");

    let foundName: string = "";

    getImportSpecifier(j, root, name, "@navikt/ds-tokens/dist/tokens").forEach(
      (x) => (foundName = x.node.imported.name)
    );

    if (name === foundName) {
      const localName =
        getImportSpecifierName(
          j,
          root,
          name,
          "@navikt/ds-tokens/dist/tokens"
        ) || name;

      renameImportSpecifier(
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

  return root.toSource(getLineTerminator(file.source));
}
