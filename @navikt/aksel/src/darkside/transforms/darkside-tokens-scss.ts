import type { FileInfo } from "jscodeshift";
import { translateToken } from "../../codemod/utils/translate-token";
import { updatedTokens } from "../config/darkside.tokens";

export default function transformer(file: FileInfo) {
  let src = file.source;

  for (const config of Object.values(updatedTokens)) {
    if (config.replacement.length > 0) {
      src = src.replace(
        config.regexes.scss,
        translateToken(`--ax-${config.replacement}`, "scss"),
      );
    }
  }

  return src;
}
