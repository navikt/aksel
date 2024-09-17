import { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import { kebabCase } from "./util";

export const formatES6: FormatFn = async ({ dictionary, file }) => {
  const header = await fileHeader({ file });
  return (
    header +
    dictionary.allTokens
      .map((token) => {
        return `export const ${token.name} = "var(--${kebabCase(
          token.name,
        )})";`;
      })
      .join("\n") +
    "\n"
  );
};

export const formatCJS: FormatFn = async ({ dictionary, file }) => {
  const header = await fileHeader({ file });
  return (
    header +
    "module.exports = {\n" +
    dictionary.allTokens
      .map((token, idx, arr) => {
        return `  "${token.name}": "var(--${kebabCase(token.name)})"${
          idx !== arr.length - 1 ? "," : ""
        }`;
      })
      .join("\n") +
    "\n};" +
    "\n"
  );
};
