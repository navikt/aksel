import type { FileInfo } from "jscodeshift";
import { legacyTokenConfig } from "../config/legacy.tokens";

export default function transformer(file: FileInfo) {
  let src = file.source;

  for (const [oldToken, config] of Object.entries(legacyTokenConfig)) {
    const oldCSSVar = `--a-${oldToken}`;

    /* We update all re-definitions of a token to a "legacy" version */
    const replaceRegex = new RegExp("(" + `${oldCSSVar}:` + ")", "gm");

    src = src.replace(
      replaceRegex,
      `--aksel-legacy${oldCSSVar.replace("--", "__")}:`,
    );

    if (config.replacement.length > 0) {
      src = src.replace(config.regexes.css, `--ax-${config.replacement}`);
    }
  }

  return src;
}
