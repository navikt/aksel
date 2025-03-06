import type { FileInfo } from "jscodeshift";
import { updatedTokens } from "../../codemod/transforms/darkside/darkside.tokens";
import { getTokenRegex } from "../token-regex";

export default function transformer(file: FileInfo) {
  let src = file.source;

  for (const [oldToken, config] of Object.entries(updatedTokens)) {
    const oldCSSVar = `--a-${oldToken}`;

    /* We update all re-definitions of a token to a "legacy" version */
    const replaceRegex = new RegExp("(" + `${oldCSSVar}:` + ")", "gm");

    src = src.replace(
      replaceRegex,
      `--aksel-legacy${oldCSSVar.replace("--", "__")}:`,
    );

    if (config.replacement.length > 0) {
      src = src.replace(
        getTokenRegex(oldCSSVar, "css"),
        `--ax-${config.replacement}`,
      );
    }
  }

  return src;
}
