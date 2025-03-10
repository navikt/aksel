import type { FileInfo } from "jscodeshift";
import { updatedTokens } from "../../codemod/transforms/darkside/darkside.tokens";
import { translateToken } from "../../codemod/utils/translate-token";
import { getTokenRegex } from "../config/tokenRegex";

export default function transformer(file: FileInfo) {
  let src = file.source;

  for (const [oldToken, config] of Object.entries(updatedTokens)) {
    const oldCSSVar = `--a-${oldToken}`;

    if (config.replacement.length > 0) {
      src = src.replace(
        getTokenRegex(oldCSSVar, "scss"),
        translateToken(`--ax-${config.replacement}`, "scss"),
      );
    }
  }

  return src;
}
