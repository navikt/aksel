import chalk from "chalk";
import type { API, FileInfo } from "jscodeshift";
import { messages } from "../../../run-codeshift";
import { getImportSpecifier } from "../../../utils/imports";
import { getLineTerminator } from "../../../utils/lineterminator";
import moveAndRenameImport from "../../../utils/moveAndRenameImport";
import { translateToken } from "../../../utils/translate-token";
import { updatedTokens } from "../darkside.tokens";

/**
 * Updates old tokens to new names.
 * Replaces global and semantic tokens with avalaible replacement.
 */
export default function transformer(file: FileInfo, api: API) {
  initMessageSetup();

  let src = file.source;

  const j = api.jscodeshift;

  let root = j(file.source);

  const jsImport = root.find(j.ImportDeclaration).filter((x) => {
    return ["@navikt/ds-tokens/dist/tokens"].includes(
      x.node.source.value as string,
    );
  });

  if (!jsImport) {
    return src;
  }

  for (const [oldToken, config] of Object.entries(updatedTokens)) {
    const oldCSSVar = `--a-${oldToken}`;
    const oldJsVar = translateToken(oldCSSVar, "js");

    let foundName: string | null = null;

    getImportSpecifier(
      j,
      root,
      oldJsVar,
      "@navikt/ds-tokens/dist/tokens",
    ).forEach((x) => {
      foundName = x.node.imported.name;
    });

    if (!foundName) {
      continue;
    }

    if (config.replacement.length > 0) {
      /* We remove the prefix */
      const jsToken = translateToken(`--ax-${config.replacement}`, "js").slice(
        2,
      );

      const localName = moveAndRenameImport(j, root, {
        fromImport: "@navikt/ds-tokens/dist/tokens",
        toImport: "@navikt/ds-tokens/darkside-js",
        fromName: foundName,
        toName: jsToken,
        ignoreAlias: true,
      });

      let code = root.toSource(getLineTerminator(src));

      const rgx = new RegExp("(" + localName + ")", "gm");
      code = code.replace(rgx, jsToken);
      src = code;

      root = j(code);
      continue;
    }

    documentLegacyReferences({
      src,
      oldToken: oldCSSVar,
      comment: config.comment,
    });
  }

  return root.toSource(getLineTerminator(src));
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
  const JSRgx = new RegExp("(" + translateToken(oldToken, "js") + ")", "gm");

  JSRgx.test(src) && addMessage({ token: oldToken, comment, type: "js" });
}

type UpdateMessageData = {
  js: string[];
};

function initMessageSetup() {
  if (!messages.has("Token update")) {
    messages.set("Token update", {
      format: formatMessage,
      data: {
        js: [],
      } satisfies UpdateMessageData,
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
    ?.data[type].push(`${token}${comment ? ` (${comment})` : ""}`);
}

function formatMessage(input: UpdateMessageData) {
  const js = [...new Set(input.js)];

  const total = js.length;

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

  js.length > 0 &&
    console.info(`\nJS:${js.map((token) => `\n${token}`).join("")}`);
}
