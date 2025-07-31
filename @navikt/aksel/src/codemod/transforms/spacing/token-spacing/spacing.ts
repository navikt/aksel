import type { FileInfo } from "jscodeshift";
import { translateToken } from "../../../utils/translate-token";
import { legacySpacingTokenMap } from "../spacing.utils";

export default function transformer(file: FileInfo) {
  let src = file.source;

  legacySpacingTokenMap.forEach((newVar, oldVar) => {
    const oldCSSVar = `--a-spacing-${oldVar}`;
    const newCSSVar = `--a-space-${newVar}`;

    const CSSRgx = new RegExp("(" + oldCSSVar + ")", "gm");
    const SCSSRgx = new RegExp(
      "(\\" + translateToken(oldCSSVar, "scss") + ")",
      "gm",
    );
    const LESSRgx = new RegExp(
      "(" + translateToken(oldCSSVar, "less") + ")",
      "gm",
    );

    src = src.replace(CSSRgx, newCSSVar);
    src = src.replace(SCSSRgx, translateToken(newCSSVar, "scss"));
    src = src.replace(LESSRgx, translateToken(newCSSVar, "less"));
  });

  return src;
}
