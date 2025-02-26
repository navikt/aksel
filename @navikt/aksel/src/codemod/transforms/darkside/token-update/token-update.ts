import chalk from "chalk";
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

  if (!messages.has("Token update")) {
    messages.set("Token update", {
      format: formatMessage,
      messages: [],
    });
  }

  Object.entries(updatedTokens).forEach(([oldToken, config]) => {
    const oldCSSVar = `--a-${oldToken}`;

    /* We update all re-definitions of a token to a "legacy" version */
    const replaceRegex = new RegExp("(" + `${oldToken}:` + ")", "gm");
    src = src.replace(
      replaceRegex,
      `--aksel-legacy${oldToken.replace("--", "__")}:`,
    );

    if (config.replacement.length > 0) {
      src = replaceTokenWithReference({
        src,
        newToken: `--ax-${config.replacement}`,
        oldToken: oldCSSVar,
      });
    } else {
      documentLegacyReferences({
        src,
        oldToken: oldCSSVar,
        comment: config.comment,
      });
    }
  });

  return src;
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

/**
 * Replaces old token with new token reference.
 */
function documentLegacyReferences({
  src,
  oldToken,
  comment,
}: {
  src: string;
  oldToken: string;
  comment?: string;
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

  if (CSSRgx.test(src)) {
    addMessage(oldToken, comment);
  } else if (SCSSRgx.test(src)) {
    addMessage(translateToken(oldToken, "scss"), comment);
  } else if (LESSRgx.test(src)) {
    addMessage(translateToken(oldToken, "less"), comment);
  }
}

function addMessage(message: string, comment?: string) {
  messages
    .get("Token update")
    ?.messages.push(`${comment ? `\n/* ${comment} */\n` : ""}${message}`);
}

function formatMessage(input: string[]) {
  if (input.length === 0) {
    console.info(
      chalk.green(
        `Found no legacy-tokens 🎉, you are now migrated over to the darkside.`,
      ),
    );
  }

  console.info(chalk.green(`\nToken update`));
  console.info(
    chalk.green(
      `Found use of ${input.length} tokens no longer supported. Until these are updated, you will need to keep old tokens imported in your code.`,
    ),
  );

  console.info(
    `${[...new Set(input)]
      .map((token) => (token.startsWith("/*") ? `\n\n${token}` : `\n${token}`))
      .join("")}`,
  );
}
