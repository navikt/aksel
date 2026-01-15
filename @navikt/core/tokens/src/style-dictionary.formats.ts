import {
  File,
  FormatFn,
  PlatformConfig,
  Transform,
  TransformedToken,
} from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import { kebabCaseForAlpha } from "../config/kebabCase";
import { type TokenTypes } from "./tokens.util";

export const formatES6: FormatFn = async ({ dictionary, file }) => {
  const header = await generateHeader(file);
  const tokens = dictionary.allTokens
    .map((token) => generateTokenString(token, "es6", false))
    .join("\n");
  return `${header}${tokens}\n`;
};

export const formatES6Static: FormatFn = async ({ dictionary, file }) => {
  const header = await generateHeader(file);
  const tokens = dictionary.allTokens
    .map((token) => generateTokenString(token, "es6", false, true))
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

export const formatCJSStatic: FormatFn = async ({ dictionary, file }) => {
  const header = await generateHeader(file);
  const tokens = dictionary.allTokens
    .map((token, idx, arr) =>
      generateTokenString(token, "cjs", idx === arr.length - 1, true),
    )
    .join("\n");
  return `${header}module.exports = {\n${tokens}\n};\n`;
};

export const formatSCSS: FormatFn = async ({ dictionary, file }) => {
  const header = await generateHeader(file);
  const tokens = dictionary.allTokens
    .map((token, idx, arr) =>
      generateTokenString(token, "scss", idx === arr.length - 1),
    )
    .join("\n");

  return `${header}${tokens}\n`;
};

const formatCategory = (token: TransformedToken): string | undefined => {
  const colorTypes = {
    bg: "backgroundColor",
    border: "borderColor",
    text: "textColor",
  };
  switch (token.type) {
    case "color":
      return token.attributes?.type
        ? colorTypes[token.attributes?.type as keyof typeof colorTypes]
        : (token.attributes?.type as string);
    case "global-space":
      return "space";
    case "global-radius":
      return "radius";
    case "global-breakpoint":
      return "breakpoint";
    case "global-font":
      return "font";
    default:
      return token.type;
  }
};

const formatCategoryTitle = (token: TransformedToken): string | undefined => {
  const category = formatCategory(token);
  switch (category) {
    case "backgroundColor":
      return "Bakgrunnsfarger";
    case "borderColor":
      return "Kantlinjefarger";
    case "textColor":
      return "Tekstfarger";
    case "shadow":
      return "Skygger";
    case "space":
      return "Avstander";
    case "radius":
      return "Radiuser";
    case "font":
      return "Fontstiler";
    case "breakpoint":
      return "Brekkpunkter";
    default:
      return category;
  }
};

const formatRawValue = (token: TransformedToken): string => {
  if (token.type === "global-breakpoint") {
    return `@media (${token.group === "desktop first" ? "max" : "min"}-width: ${
      token.value
    })`;
  }
  return token.value;
};

const formatModifier = (
  name: TransformedToken["name"],
  type: TransformedToken["type"],
): string => {
  const nameParts = name.split("-");
  switch (type) {
    case "global-breakpoint":
      return nameParts.slice(1).join("-");
    case "global-font":
      return nameParts.includes("heading") ? "heading" : "";
    default:
      return nameParts[nameParts.length - 1];
  }
};

const formatRole = (group: TransformedToken["group"]): string => {
  if (group?.indexOf(".") === -1) {
    if (["background", "text", "border"].includes(group)) {
      return "root";
    }
    return group;
  }
  return group?.split(".")[1];
};

export const formatDOCS: FormatFn = async ({ dictionary }) => {
  const ignoredTokenTypes = ["global-color", "opacity"];

  const tokens = dictionary.allTokens
    .filter((token) => token.type && !ignoredTokenTypes.includes(token.type))
    .filter((token) => !token.docsIgnore)
    .map((token, index) => {
      const tokenNameWithoutPrefix = token.name.slice(2);
      const name = kebabCaseForAlpha(tokenNameWithoutPrefix);
      return (
        JSON.stringify({
          name,
          value: createTokenValue(token),
          rawValue: formatRawValue(token),
          jsValue: tokenNameWithoutPrefix,
          cssValue: createTokenValue(token),
          scssValue: `$ax-${name}`,
          lessValue: `@ax-${name}`,
          comment: token.comment?.startsWith("TODO")
            ? undefined // Filter out placeholder comments
            : token.comment,
          type: token.type,
          rawType: token.attributes?.type,
          group: token.group,
          category: formatCategory(token),
          categoryTitle: formatCategoryTitle(token),
          role: formatRole(token.group),
          modifier: formatModifier(name, token.type),
        }) + (index === dictionary.allTokens.length - 1 ? "" : ",")
      );
    })
    .join("\n");

  return `export const tokens = [${tokens}];\n`;
};

export const formatLESS: FormatFn = async ({ dictionary, file }) => {
  const header = await generateHeader(file);
  const tokens = dictionary.allTokens
    .map((token, idx, arr) =>
      generateTokenString(token, "less", idx === arr.length - 1),
    )
    .join("\n");

  return `${header}${tokens}\n`;
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
  if ((token.type as TokenTypes) === "global-breakpoint") {
    return token.value ?? token.$value;
  }

  if ((token.type as TokenTypes) === "global-color") {
    return `var(--${token.path.join("-")})`;
  }

  return `var(--${kebabName})`;
}

/**
 * @param isStatic Lets us set the token to a static value instead of CSS-variables
 */
export function generateTokenString(
  token: TransformedToken,
  format: "es6" | "cjs" | "scss" | "less",
  isLast: boolean,
  isStatic?: boolean,
): string {
  const comment = createComment(token.comment);
  const nameWithoutPrefix = token.name.slice(2);

  const tokenValue = isStatic
    ? (token.value ?? token.$value)
    : createTokenValue(token);

  if (format === "es6") {
    return `${comment}export const ${nameWithoutPrefix} = "${tokenValue}";`;
  }
  if (format === "scss") {
    const name = kebabCaseForAlpha(token.name).replace("--ax-", "ax-");
    return `${comment} $${name}: ${tokenValue};`;
  }
  if (format === "less") {
    const name = kebabCaseForAlpha(token.name).replace("--ax-", "ax-");
    return `${comment} @${name}: ${tokenValue};`;
  }

  return `  ${comment}"${nameWithoutPrefix}": "${tokenValue}"${
    isLast ? "" : ","
  }`;
}
