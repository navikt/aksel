import type { FileInfo } from "jscodeshift";
import { legacyTokenConfig } from "../config/legacy.tokens";

export default function transformer(file: FileInfo) {
  let src = file.source;

  /*
    Replace usages: --a-token -> --ax-replacement
    Matches "--a-token" with word boundaries.
    Uses negative lookahead to skip definitions (--a-token:)
  */
  src = src.replace(
    /(?<![\w-])(--a-[\w-]+)(?![\w-])(?!\s*:)/g,
    (match, tokenName) => {
      const key = tokenName.replace("--a-", "");
      const config = legacyTokenConfig[key];

      if (config?.replacement) {
        return `--ax-${config.replacement}`;
      }
      return match;
    },
  );

  return src;
}
