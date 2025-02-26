import type { FileInfo } from "jscodeshift";
import { messages } from "../../../run-codeshift";
import { translateToken } from "../../../utils/translate-token";
import { updatedTokens } from "../darkside.tokens";

/**
 * Updates old tokens to new names.
 * Replaces global and semantic tokens with avalaible replacement.
 */
export default function transformer(file: FileInfo) {
  let src = file.source;

  messages.set("token-update", []);

  Object.entries(updatedTokens).forEach(([oldToken, config]) => {
    const oldCSSVar = `--a-${oldToken}`;

    messages.get("token-update")?.push(oldToken);

    /* We update all re-definitions of a token to a "legacy" version */
    const replaceRegex = new RegExp("(" + `${oldToken}:` + ")", "gm");
    src = src.replace(
      replaceRegex,
      `--aksel-legacy${oldToken.replace("--", "__")}:`,
    );

    if (config.ref.length > 0) {
      src = replaceTokenWithReference({
        src,
        newToken: config.ref,
        oldToken: oldCSSVar,
      });
    }
  });

  return file.source;
}

/**
 * Replaces old token with new token reference.
 */
function replaceTokenWithReference({
  src,
  newToken,
  oldToken,
}: {
  src: string;
  newToken: string;
  oldToken: string;
}) {
  const CSSRgx = new RegExp("(" + oldToken + ")", "gm");
  const SCSSRgx = new RegExp(
    "(\\" + translateToken(oldToken, "scss") + ")",
    "gm",
  );
  const LESSRgx = new RegExp(
    "(" + translateToken(oldToken, "less") + ")",
    "gm",
  );

  let fileSrc = src;

  fileSrc = fileSrc.replace(CSSRgx, newToken);
  fileSrc = fileSrc.replace(SCSSRgx, translateToken(newToken, "scss"));
  fileSrc = fileSrc.replace(LESSRgx, translateToken(newToken, "less"));

  return fileSrc;
}
