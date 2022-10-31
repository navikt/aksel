import { readFileSync } from "fs";
import css from "css";

export const readCss = () => {
  const cssData = readFileSync(
    "../../@navikt/core/tokens/dist/tokens.css"
  ).toString();
  return css.parse(cssData);
};

export const getCssRoot = (css) => {
  return css.stylesheet.rules.find((r) => r.selectors?.includes(":root"));
};

export const getGlobalTokenValue = (value: string, root: any): string => {
  const varToken = value.match(/var\((.*)\)/)[1];
  if (!varToken) return value;

  let rawToken = "";

  const parentToken = root.declarations.find(
    (x) => x.property === varToken
  ).value;
  if (parentToken.includes("var(")) {
    rawToken = getGlobalTokenValue(parentToken, root);
  } else {
    rawToken = parentToken;
  }

  return value.replace(/var\((.*)\)/, rawToken);
};
