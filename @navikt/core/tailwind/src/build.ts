import { writeFileSync } from "node:fs";
import * as TokensBuild from "@navikt/ds-tokens/darkside-js";
import { kebabCaseForAlpha } from "../../tokens/config/kebabCase";
import { breakpointTokenConfig } from "../../tokens/darkside/tokens/breakpoint";

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
const colors = Object.fromEntries(colorTokensEntries) as Record<string, string>;

export const config = {
  theme: {
    colors: prefixTokens(colors),
    screens: prefixTokens({
      sm: breakpointTokenConfig.breakpoint.sm.value,
      md: breakpointTokenConfig.breakpoint.md.value,
      lg: breakpointTokenConfig.breakpoint.lg.value,
      xl: breakpointTokenConfig.breakpoint.xl.value,
      "2xl": breakpointTokenConfig.breakpoint["2xl"].value,
    }),
    extend: {
      boxShadow: prefixTokens(extractTokensForCategory("shadow")),
      fontWeight: prefixTokens(extractTokensForCategory("font-weight")),
      fontSize: prefixTokens(extractTokensForCategory("font-size")),
      lineHeight: prefixTokens(extractTokensForCategory("font-line-height")),
      fontFamily: prefixTokens(extractTokensForCategory("font-family")),
      opacity: prefixTokens(extractTokensForCategory("opacity")),
    },
  },
};

const outputString = `module.exports = ${JSON.stringify(config, null, 2)};`;

writeFileSync("tailwind.config.js", outputString);

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

/**
 * Prefixes all keys in a token object with "ax-" to avoid conflicts with TailwindCSS
 * While making the token more verbose, it communicates better that the token is from Aksel and not locally defined.
 */
function prefixTokens(tokens: Record<string, string>) {
  const withPrefix: Record<string, string> = {};

  for (const [key, value] of Object.entries(tokens)) {
    withPrefix[`ax-${key}`] = value;
  }
  return withPrefix;
}
