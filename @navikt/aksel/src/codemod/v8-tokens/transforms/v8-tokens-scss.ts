import type { FileInfo } from "jscodeshift";
import { translateToken } from "../../utils/translate-token";
import { legacyTokenConfig } from "../config/legacy.tokens";

const axBorderRadiusMap: Record<string, string> = {
  "$ax-border-radius-full": "$ax-radius-full",
  "$ax-border-radius-small": "$ax-radius-2",
  "$ax-border-radius-medium": "$ax-radius-4",
  "$ax-border-radius-large": "$ax-radius-8",
  "$ax-border-radius-xlarge": "$ax-radius-12",
};

export default function transformer(file: FileInfo) {
  let src = file.source;

  for (const config of Object.values(legacyTokenConfig)) {
    if (config.replacement.length > 0) {
      src = src.replace(
        config.regexes.scss,
        translateToken(`--ax-${config.replacement}`, "scss"),
      );
    }
  }

  /*
    Replace usages: $ax-border-radius-(full|small|medium|large|xlarge) -> $ax-radius-(full|2|4|8|12)
  */
  src = src.replace(
    /(?<!\w)(\$ax-border-radius-(?:full|small|medium|large|xlarge))(?!\w)/g,
    (match, tokenName) => {
      return axBorderRadiusMap[tokenName] ?? match;
    },
  );

  return src;
}
