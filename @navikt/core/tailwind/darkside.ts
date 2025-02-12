import { writeFileSync } from "fs";
import * as TokensBuild from "@navikt/ds-tokens/darkside-js";
import { kebabCaseForAlpha } from "../tokens/config/kebabCase";
import { breakpointTokenConfig } from "../tokens/darkside/tokens/breakpoint";

const transformedTokens = Object.fromEntries(
  Object.entries(TokensBuild)
    .map(([key, value]) => {
      return [kebabCaseForAlpha(key), value];
    })
    /* "* as" imports incldes key "default" where value is every token  */
    .filter(([key]) => key !== "default"),
);

const nonColorTokens = [
  "space",
  "shadow",
  "font-weight",
  "font-size",
  "font-line-height",
  "font-family",
  "border-radius",
  "breakpoint",
  "opacity",
];
/*
 * Assumes that all remaining names not in nonColorTokens are colors
 */
const colorTokensEntries = Object.entries(transformedTokens).filter(([key]) => {
  return !nonColorTokens.find((prefix) => key.toLowerCase().includes(prefix));
});
const colors = Object.fromEntries(colorTokensEntries);

export const config = {
  theme: {
    colors,
    screens: {
      sm: breakpointTokenConfig.breakpoint.sm.value,
      md: breakpointTokenConfig.breakpoint.md.value,
      lg: breakpointTokenConfig.breakpoint.lg.value,
      xl: breakpointTokenConfig.breakpoint.xl.value,
      "2xl": breakpointTokenConfig.breakpoint["2xl"].value,
    },
    extend: {
      shadow: extractTokensForCategory("shadow"),
      fontWeight: extractTokensForCategory("font-weight"),
      fontSize: extractTokensForCategory("font-size"),
      lineHeight: extractTokensForCategory("font-line-height"),
      fontFamily: extractTokensForCategory("font-family"),
      borderRadius: extractTokensForCategory("border-radius"),
      opacity: extractTokensForCategory("opacity"),
    },
  },
};

const outputString = `module.exports = ${JSON.stringify(config, null, 2)};`;

writeFileSync("tailwind.darkside.config.js", outputString);

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

/* Cherry-picks object keys we want */
export function extractTokensForCategory(tokenName: string) {
  const tokens = Object.entries(transformedTokens)
    .filter(([key]) => key.startsWith(tokenName))
    /* We want extract only the value from each token, so we replace the name: "spacing-4" -> "4" */
    .map(([key, value]) => [key.replace(`${tokenName}-`, ""), value]);

  return Object.fromEntries(tokens);
}
