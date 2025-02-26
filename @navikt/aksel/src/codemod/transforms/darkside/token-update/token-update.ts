import type { FileInfo } from "jscodeshift";
import { translateToken } from "../../../utils/translate-token";
import { updatedTokens } from "../darkside.tokens";

/**
 * Updates old tokens to new names.
 * Replaces global and semantic tokens with avalaible replacement.
 */
export default function transformer(file: FileInfo) {
  let src = file.source;

  Object.entries(updatedTokens).forEach(([oldToken, config]) => {
    const oldCSSVar = `--a-${oldToken}`;

    if (config.ref.length > 1) {
      const newCSSVar = `--ax-${config.ref}`;
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
      return;
    }
  });

  return file.source;
}
