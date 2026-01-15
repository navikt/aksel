import type { FileInfo } from "jscodeshift";
import { legacyTokenConfig } from "../config/legacy.tokens";

export default function transformer(file: FileInfo) {
  let src = file.source;

  for (const [name, config] of Object.entries(legacyTokenConfig)) {
    if (!config.twOld || !config.twNew || !config.regexes.tailwind) {
      continue;
    }

    const isBreakpoint = name.includes("breakpoint");

    if (isBreakpoint) {
      src = src.replace(config.regexes.tailwind, `${config.twNew}:`);
      continue;
    }

    const beforeSplit = config.twOld.split(",");
    const afterSplit = config.twNew.split(",");

    src = src.replace(config.regexes.tailwind, (match) => {
      const trimmed = match.trim();
      const cleanToken = trimmed.replace(":", "");
      const index = beforeSplit.indexOf(cleanToken);

      if (index >= 0) {
        const withPrefix = trimmed.startsWith(":");
        const addSpace = match.startsWith(" ");
        const replacementToken = afterSplit[index];

        return `${addSpace ? " " : ""}${withPrefix ? ":" : ""}${replacementToken}`;
      }

      return match;
    });
  }

  return src;
}
