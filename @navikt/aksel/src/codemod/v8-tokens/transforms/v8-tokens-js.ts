import type { API, FileInfo } from "jscodeshift";
import { getImportSpecifier } from "../../utils/imports";
import { getLineTerminator } from "../../utils/lineterminator";
import moveAndRenameImport from "../../utils/packageImports";
import { translateToken } from "../../utils/translate-token";
import { legacyTokenConfig } from "../config/legacy.tokens";

const axBorderRadiusMap: Record<string, string> = {
  AxBorderRadiusFull: "AxRadiusFull",
  AxBorderRadiusSmall: "AxRadius2",
  AxBorderRadiusMedium: "AxRadius4",
  AxBorderRadiusLarge: "AxRadius8",
  AxBorderRadiusXlarge: "AxRadius12",
};

export default function transformer(file: FileInfo, api: API) {
  let src = file.source;

  const j = api.jscodeshift;

  let root = j(file.source);

  const jsImport = root.find(j.ImportDeclaration).filter((x) => {
    return ["@navikt/ds-tokens/dist/tokens"].includes(
      x.node.source.value as string,
    );
  });

  if (jsImport.size() > 0) {
    for (const [oldToken, config] of Object.entries(legacyTokenConfig)) {
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
        const jsToken = translateToken(
          `--ax-${config.replacement}`,
          "js",
        ).slice(2);

        const localName = moveAndRenameImport(j, root, {
          fromImport: "@navikt/ds-tokens/dist/tokens",
          toImport: "@navikt/ds-tokens/js",
          fromName: foundName,
          toName: jsToken,
          ignoreAlias: true,
        });

        let code = root.toSource(getLineTerminator(src));

        const rgx = new RegExp(`(\\s|^)?(${localName})(?=\\s|$|[^\\w-])`, "gm");
        code = code.replace(rgx, jsToken);
        src = code;

        root = j(code);
      }
    }
  }

  let output = root.toSource(getLineTerminator(src));

  const jsV8TokenImport = root.find(j.ImportDeclaration).filter((x) => {
    return ["@navikt/ds-tokens/js"].includes(x.node.source.value as string);
  });

  if (jsV8TokenImport.size() > 0) {
    /*
    Replace usages: AxBorderRadius(Full|Small|Medium|Large|Xlarge) -> AxRadius(Full|2|4|8|12)
  */
    output = output.replace(
      /(?<!\w)(AxBorderRadius(?:Full|Small|Medium|Large|Xlarge))(?!\w)/g,
      (match, tokenName) => {
        return axBorderRadiusMap[tokenName] ?? match;
      },
    );
  }

  return output;
}
