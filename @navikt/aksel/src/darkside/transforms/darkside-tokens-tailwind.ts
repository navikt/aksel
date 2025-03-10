import type { FileInfo } from "jscodeshift";
import { updatedTokens } from "../config/darkside.tokens";
import { createSingleTwRegex } from "../config/tokenRegex";

export default function transformer(file: FileInfo) {
  let src = file.source;

  for (const [name, config] of Object.entries(updatedTokens)) {
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
      const index = beforeSplit.indexOf(match.trim());

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
