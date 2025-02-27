import chalk from "chalk";
import type { FileInfo } from "jscodeshift";
import { messages } from "../../../run-codeshift";
import { translateToken } from "../../../utils/translate-token";
import { updatedTokens } from "../darkside.tokens";

type UpdateMessageData = {
  scss: string[];
  less: string[];
  css: string[];
  js: string[];
};

/**
 * Updates old tokens to new names.
 * Replaces global and semantic tokens with avalaible replacement.
 */
export default function transformer(file: FileInfo) {
  let src = file.source;

  if (!messages.has("Token update")) {
    messages.set("Token update", {
      format: formatMessage,
      data: {
        scss: [],
        less: [],
        css: [],
        js: [],
      } satisfies UpdateMessageData,
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
    addMessage({ token: oldToken, comment, type: "css" });
  } else if (SCSSRgx.test(src)) {
    addMessage({
      token: translateToken(oldToken, "scss"),
      comment,
      type: "scss",
    });
  } else if (LESSRgx.test(src)) {
    addMessage({
      token: translateToken(oldToken, "less"),
      comment,
      type: "less",
    });
  }
}

function addMessage({
  token,
  comment,
  type,
}: {
  token: string;
  comment?: string;
  type: keyof UpdateMessageData;
}) {
  messages
    .get("Token update")
    ?.data[type].push(`${comment ? `\n/* ${comment} */\n` : ""}${token}`);
}

function formatMessage(input: UpdateMessageData) {
  const total =
    input.scss.length + input.less.length + input.css.length + input.js.length;

  if (total === 0) {
    console.info(
      chalk.green(
        `Found no legacy-tokens 🎉, you have now migrated over to the darkside.`,
      ),
    );
  }

  console.info(chalk.green(`\nToken update`));
  console.info(
    chalk.green(
      `Found use of ${total} tokens no longer supported. Until these are updated, you will need to keep old tokens imported in your code.`,
    ),
  );

  console.info(
    `CSS:\n${[...new Set(input.css)]
      .map((token) => (token.startsWith("/*") ? `\n\n${token}` : `\n${token}`))
      .join("")}`,
  );

  console.info(
    `SCSS:\n${[...new Set(input.css)]
      .map((token) => (token.startsWith("/*") ? `\n\n${token}` : `\n${token}`))
      .join("")}`,
  );

  console.info(
    `LESS:\n${[...new Set(input.css)]
      .map((token) => (token.startsWith("/*") ? `\n\n${token}` : `\n${token}`))
      .join("")}`,
  );

  console.info(
    `JS:\n${[...new Set(input.css)]
      .map((token) => (token.startsWith("/*") ? `\n\n${token}` : `\n${token}`))
      .join("")}`,
  );
}
