import { translateToken } from "../codemod/utils/translate-token";

const createTwRegexForBreakpoints = (token: string) =>
  new RegExp(`(?<!:)(?<=\\s|^)${token}:(?=\\w)`, "gm");

function getFrameworkRegexes({
  token,
  twString,
  legacy = false,
}: {
  token: string;
  twString: string | null;
  legacy: boolean;
}): Record<"css" | "scss" | "less" | "js" | "tailwind", RegExp | null> {
  const regexes: ReturnType<typeof getFrameworkRegexes> = {
    css: getTokenRegex(token, "css"),
    scss: getTokenRegex(token, "scss"),
    less: getTokenRegex(token, "less"),
    /* New JS tokens dont have a prefix */
    js: legacy
      ? getTokenRegex(token, "js")
      : getTokenRegex(token.replace("--ax-", ""), "js"),
    tailwind: null,
  };

  if (!twString) {
    return regexes;
  }

  const twTokens = twString.split(",").map((t) => {
    /* New tailwind token have the `ax`-prefix */
    return legacy ? t : `ax-${t}`;
  });

  if (token.includes("breakpoint")) {
    /* We assume that breakpoint tw token only has a single declaration */
    regexes.tailwind = createTwRegexForBreakpoints(twTokens[0]);
  } else {
    regexes.tailwind = createCompositeTwRegex(twTokens);
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
    default:
      console.error("Invalid format");
  }
}

function createCompositeTwRegex(tokens: string[]) {
  return new RegExp(
    `(?<!:)(\\s|^)?(${tokens.join("|")}|${tokens
      .map((t) => `:${t}`)
      .join("|")})(?=\\s|$|[^\\w-])`,
    "gm",
  );
}

export { createCompositeTwRegex, getFrameworkRegexes, getTokenRegex };
