import type { FileInfo } from "jscodeshift";
import { legacyTokenConfig } from "../config/legacy.tokens";

export default function transformer(file: FileInfo) {
  let src = file.source;

  /*
    1. Replace definitions: --a-token: -> --aksel-legacy__a-token:
    Matches "--a-token" followed by optional whitespace and a colon.
    Uses negative lookbehind to ensure we don't match "--not-a-token".
  */
  src = src.replace(
    /(?<![\w-])(--a-[\w-]+)(\s*:)/g,
    (match, tokenName, suffix) => {
      const key = tokenName.replace("--a-", "");
      if (legacyTokenConfig[key]) {
        return `--aksel-legacy${tokenName.replace("--", "__")}${suffix}`;
      }
      return match;
    },
  );

  /*
    2. Replace usages: --a-token -> --ax-replacement
    Matches "--a-token" with word boundaries.
  */
  src = src.replace(/(?<![\w-])(--a-[\w-]+)(?![\w-])/g, (match, tokenName) => {
    const key = tokenName.replace("--a-", "");
    const config = legacyTokenConfig[key];

    if (config?.replacement) {
      return `--ax-${config.replacement}`;
    }
    return match;
  });

  return src;
}
