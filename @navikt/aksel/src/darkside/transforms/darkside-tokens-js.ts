import type { API, FileInfo } from "jscodeshift";
import { updatedTokens } from "../../codemod/transforms/darkside/darkside.tokens";
import { getImportSpecifier } from "../../codemod/utils/imports";
import { getLineTerminator } from "../../codemod/utils/lineterminator";
import moveAndRenameImport from "../../codemod/utils/moveAndRenameImport";
import { translateToken } from "../../codemod/utils/translate-token";

export default function transformer(file: FileInfo, api: API) {
  let src = file.source;

  const j = api.jscodeshift;

  let root = j(file.source);

  const jsImport = root.find(j.ImportDeclaration).filter((x) => {
    return ["@navikt/ds-tokens/dist/tokens"].includes(
      x.node.source.value as string,
    );
  });

  if (!jsImport) {
    return src;
  }

  for (const [oldToken, config] of Object.entries(updatedTokens)) {
    const oldCSSVar = `--a-${oldToken}`;
    const oldJsVar = translateToken(oldCSSVar, "js");

    let foundName: string | null = null;

    getImportSpecifier(
      j,
      root,
      oldJsVar,
      "@navikt/ds-tokens/dist/tokens",
    ).forEach((x) => {
      foundName = x.node.imported.name;
    });

    if (!foundName) {
      continue;
    }

    if (config.replacement.length > 0) {
      /* We remove the prefix */
      const jsToken = translateToken(`--ax-${config.replacement}`, "js").slice(
        2,
      );

      const localName = moveAndRenameImport(j, root, {
        fromImport: "@navikt/ds-tokens/dist/tokens",
        toImport: "@navikt/ds-tokens/darkside-js",
        fromName: foundName,
        toName: jsToken,
        ignoreAlias: true,
      });

      let code = root.toSource(getLineTerminator(src));

      const rgx = new RegExp("(" + localName + ")", "gm");
      code = code.replace(rgx, jsToken);
      src = code;

      root = j(code);
      continue;
    }
  }

  return root.toSource(getLineTerminator(src));
}
