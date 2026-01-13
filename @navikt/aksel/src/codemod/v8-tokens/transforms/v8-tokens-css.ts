import type { FileInfo } from "jscodeshift";
import { legacyTokenConfig } from "../config/legacy.tokens";

const axBorderRadiusMap: Record<string, string> = {
  "--ax-border-radius-full": "--ax-radius-full",
  "--ax-border-radius-small": "--ax-radius-2",
  "--ax-border-radius-medium": "--ax-radius-4",
  "--ax-border-radius-large": "--ax-radius-8",
  "--ax-border-radius-xlarge": "--ax-radius-12",
};

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

  /*
    Replace usages: --ax-border-radius-(full|small|medium|large|xlarge) -> --ax-radius-(full|2|4|8|12)
    Matches "--ax-border-radius-*" with word boundaries.
    Uses negative lookahead to skip definitions (--ax-border-radius-small:)
  */
  src = src.replace(
    /(?<![\w-])(--ax-border-radius-(?:full|small|medium|large|xlarge))(?![\w-])(?!\s*:)/g,
    (match, tokenName) => {
      return axBorderRadiusMap[tokenName] ?? match;
    },
  );

  return src;
}
