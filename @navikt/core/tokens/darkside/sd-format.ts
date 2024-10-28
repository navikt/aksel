import {
  File,
  FormatFn,
  PlatformConfig,
  Transform,
  TransformedToken,
} from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import { kebabCaseForAlpha } from "../config/kebabCase";
import { TokenTypes } from "./util";

export const formatES6: FormatFn = async ({ dictionary, file }) => {
  const header = await generateHeader(file);
  const tokens = dictionary.allTokens
    .map((token) => generateTokenString(token, "es6", false))
    .join("\n");
  return `${header}${tokens}\n`;
};

export const formatCJS: FormatFn = async ({ dictionary, file }) => {
  const header = await generateHeader(file);
  const tokens = dictionary.allTokens
    .map((token, idx, arr) =>
      generateTokenString(token, "cjs", idx === arr.length - 1),
    )
    .join("\n");
  return `${header}module.exports = {\n${tokens}\n};\n`;
};

export const transformCSS: Transform = {
  name: "name/alpha-suffix",
  type: "name",
  transform: (token: TransformedToken, options: PlatformConfig) =>
    kebabCaseForAlpha([options.prefix].concat(token.path).join(" ")),
};

async function generateHeader(file: File): Promise<string> {
  return await fileHeader({ file });
}

function createComment(comment?: string): string {
  if (!comment) {
    return "";
  }

  return `/**\n * ${comment}\n */\n`;
}

function createTokenValue(token: TransformedToken): string {
  const kebabName = kebabCaseForAlpha(token.name);

  /*
   * Breakpoints can in most cases not be used as variables, so we need to return the value directly.
   */
  if ((token.type as TokenTypes) === "global-breakpoints") {
    return token.value ?? token.$value;
  }
  return `var(--${kebabName})`;
}

export function generateTokenString(
  token: TransformedToken,
  format: "es6" | "cjs",
  isLast: boolean,
): string {
  const comment = createComment(token.comment);
  const nameWithoutPrefix = token.name.slice(2);
  if (format === "es6") {
    return `${comment}export const ${nameWithoutPrefix} = "${createTokenValue(
      token,
    )}";`;
  }
  return `  ${comment}"${nameWithoutPrefix}": "${createTokenValue(token)}"${
    isLast ? "" : ","
  }`;
}
