import type { FileInfo } from "jscodeshift";
import { legacyTokenConfig } from "../config/legacy.tokens";
import { createSingleTwRegex } from "../config/token-regex";

export default function transformer(file: FileInfo) {
  let src = file.source;

  for (const [name, config] of Object.entries(legacyTokenConfig)) {
    if (!config.twOld || !config.twNew) {
      continue;
    }

    const isBreakpoint = name.includes("breakpoint");

    if (isBreakpoint) {
      src = src.replace(config.regexes.tailwind, `${config.twNew}:`);
      continue;
    }

    const beforeSplit = config.twOld.split(",");
    const afterSplit = config.twNew.split(",");

    const matches = src.match(config.regexes.tailwind) || [];

    for (const match of matches) {
      const index = beforeSplit.indexOf(match.trim().replace(":", ""));

      if (index >= 0) {
        const withPrefix = match.trim().startsWith(":");

        const addSpace = match.startsWith(" ");

        const replacementToken = afterSplit[index];
        src = src.replace(
          createSingleTwRegex(match),
          withPrefix
            ? `:${replacementToken}`
            : `${addSpace ? " " : ""}${replacementToken}`,
        );
      }
    }
  }

  return src;
}
