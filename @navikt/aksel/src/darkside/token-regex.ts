/* eslint-disable no-useless-escape */
import { UpdatedTokensData } from "../codemod/transforms/darkside/darkside.tokens";
import { translateToken } from "../codemod/utils/translate-token";

const createTwRegex = (token: string) =>
  new RegExp(`(?<!:)(\s|^)?${token}(?=\s|$)`, "g");

const createTwRegexWithPrefix = (token: string) =>
  new RegExp(`(?<!:)(\s|^)?:${token}(?=\s|$)`, "g");

const createTwRegexForBreakpoints = (token: string) =>
  new RegExp(`(?<!:)(?<=\s|^)${token}:(?=\w)`, "g");

function generateLegacyRegexes(token: string, config: UpdatedTokensData) {
  const regexes: Record<"css" | "scss" | "less" | "js" | "tailwind", RegExp[]> =
    {
      css: [getTokenRegex(token, "css")],
      scss: [getTokenRegex(token, "scss")],
      less: [getTokenRegex(token, "less")],
      js: [getTokenRegex(token, "js")],
      tailwind: [],
    };

  if (!config.twOld) {
    return regexes;
  }

  for (const twToken of config.twOld.split(",")) {
    if (token.includes("breakpoint")) {
      regexes.tailwind.push(createTwRegexForBreakpoints(twToken));
      continue;
    }

    regexes.tailwind.push(createTwRegex(twToken));
    regexes.tailwind.push(createTwRegexWithPrefix(twToken));
  }

  return regexes;
}

function generateNewRegexes(token: string, tailwindName: string | null) {
  const regexes: Record<"css" | "scss" | "less" | "js" | "tailwind", RegExp[]> =
    {
      css: [getTokenRegex(token, "css")],
      scss: [getTokenRegex(token, "scss")],
      less: [getTokenRegex(token, "less")],
      js: [getTokenRegex(token, "newJs")],
      tailwind: [],
    };

  if (!tailwindName) {
    return regexes;
  }

  for (const twToken of tailwindName.split(",")) {
    const twTokenWithPrefix = `ax-${twToken}`;

    if (token.includes("breakpoint")) {
      regexes.tailwind.push(createTwRegexForBreakpoints(twTokenWithPrefix));
      continue;
    }

    regexes.tailwind.push(createTwRegex(twTokenWithPrefix));
    regexes.tailwind.push(createTwRegexWithPrefix(twTokenWithPrefix));
  }

  return regexes;
}

function getTokenRegex(
  variable: string,
  format: "css" | "scss" | "less" | "js" | "newJs" | "tailwind",
) {
  switch (format) {
    case "css":
      return new RegExp(`(${variable})`, "gm");
    case "scss":
      return new RegExp(`(\\${translateToken(variable, "scss")})`, "gm");
    case "less":
      return new RegExp(`(${translateToken(variable, "less")})`, "gm");
    case "js":
      return new RegExp(`(${translateToken(variable, "js")})`, "gm");
    case "newJs":
      return new RegExp(
        `(${translateToken(variable.replace("--ax-", ""), "js")})`,
        "gm",
      );
    default:
      console.error("Invalid format");
  }
}

export { generateLegacyRegexes, getTokenRegex, generateNewRegexes };
