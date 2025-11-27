import type { API, FileInfo } from "jscodeshift";
import { findComponentImport } from "../../../utils/ast";
import { getLineTerminator } from "../../../utils/lineterminator";
import { translateToken } from "../../../utils/translate-token";
import { legacySpacingTokenMap } from "../spacing.utils";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  let root = j(file.source);

  legacySpacingTokenMap.forEach((newVar, oldVar) => {
    const oldCSSVar = translateToken(`--a-spacing-${oldVar}`, "js");
    const newCSSVar = translateToken(`--a-space-${newVar}`, "js");

    const name = findComponentImport({
      root,
      j,
      name: oldCSSVar,
      packageType: "tokens",
    });

    if (!name) {
      return;
    }

    let code = root.toSource(getLineTerminator(file.source));

    const rgx = new RegExp("(" + oldCSSVar + ")", "gm");
    code = code.replace(rgx, newCSSVar);
    root = j(code);
  });

  return root.toSource(getLineTerminator(file.source));
}
