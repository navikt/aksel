import { translateToken } from "../../utils/translate-token";

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

  const twTokens = twString.split(",");

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
  format: "css" | "scss" | "less" | "js",
) {
  switch (format) {
    case "css":
      return new RegExp(`(\\s|^)?(${variable})(?=\\s|$|[^\\w-])`, "gm");
    case "scss":
      return new RegExp(
        `(\\s|^)?(\\${translateToken(variable, "scss")})(?=\\s|$|[^\\w-])`,
        "gm",
      );
    case "less":
      return new RegExp(
        `(\\s|^)?(${translateToken(variable, "less")})(?=\\s|$|[^\\w-])`,
        "gm",
      );
    case "js":
      return new RegExp(
        `(\\s|^)?(${translateToken(variable, "js")})(?=\\s|$|[^\\w-])`,
        "gm",
      );
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

function createSingleTwRegex(token: string) {
  return new RegExp(`(?<!:)(\\s|^)?(${token})(?=\\s|$|[^\\w-])`, "gm");
}

export {
  createCompositeTwRegex,
  createSingleTwRegex,
  getFrameworkRegexes,
  getTokenRegex,
};
