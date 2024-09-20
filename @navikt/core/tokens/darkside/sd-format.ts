import { File, FormatFn, TransformedToken } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import { kebabCase } from "../config/kebabCase";

const generateHeader = async (file: File): Promise<string> => {
  return await fileHeader({ file });
};

const createComment = (comment?: string): string => {
  if (!comment) {
    return "";
  }

  return `/**\n * ${comment}\n */\n`;
};

export const generateTokenString = (
  token: TransformedToken,
  format: "es6" | "cjs",
  isLast: boolean,
): string => {
  /**
   * test token
   */
  const comment = createComment(token.comment);
  const kebabName = kebabCase(token.name);
  if (format === "es6") {
    return `${comment}export const ${token.name.slice(
      1,
    )} = "var(--${kebabName})";`;
  }
  return `  ${comment}"${token.name.slice(1)}": "var(--${kebabName})"${
    isLast ? "" : ","
  }`;
};

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
