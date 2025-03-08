import { translateToken } from "../codemod/utils/translate-token";

function getAllTokenRegexes(variable: string): RegExp[] {
  return [
    getTokenRegex(variable, "css"),
    getTokenRegex(variable, "scss"),
    getTokenRegex(variable, "less"),
    getTokenRegex(variable, "js"),
    /* TODO: We need a special handler for TW */
    /* getTokenRegex(variable, "tailwind"), */
  ];
}

function getTokenRegex(
  variable: string,
  format: "css" | "scss" | "less" | "js" | "tailwind",
) {
  const cleanedVariable = variable.replace("--a-", "").replace("--ax-", "");

  switch (format) {
    case "css":
      return new RegExp(`(${variable})`, "gm");
    case "scss":
      return new RegExp(`(\\${translateToken(variable, "scss")})`, "gm");
    case "less":
      return new RegExp(`(${translateToken(variable, "less")})`, "gm");
    case "js":
      return new RegExp(`(${translateToken(variable, "js")})`, "gm");
    case "tailwind":
      return new RegExp(
        `(?<!(${
          cleanedVariable === "transparent" ? "surface|" : ""
        }meta|brand|--navds|__navds|global|semantic|legacy|migration|--a|@a|\\$a).*)-${cleanedVariable}`,
        "gm",
      );
    default:
      console.error("Invalid format");
  }
}

export { getTokenRegex, getAllTokenRegexes };
