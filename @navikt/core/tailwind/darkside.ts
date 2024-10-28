import { writeFileSync } from "fs";
import { kebabCaseForAlpha } from "@navikt/ds-tokens/config/kebabCase";
import { breakpointsTokenConfig } from "@navikt/ds-tokens/darkside/tokens/breakpoints";
import * as TokensBuild from "@navikt/ds-tokens/dist/darkside/tokens";

const transformedTokens = Object.fromEntries(
  Object.entries(TokensBuild).map(([key, value]) => {
    return [kebabCaseForAlpha(key), value];
  }),
);

const nonColorTokens = [
  "spacing",
  "shadow",
  "font-weight",
  "font-size",
  "font-line-height",
  "font-family",
  "border-radius",
  "breakpoint",
];
/*
 * Assumes that all remaining names not in nonColorTokens are colors
 * TODO: Should probably write some tests on this when tokens are more stable
 */
const colorTokensEntries = Object.entries(transformedTokens).filter(([key]) => {
  return !nonColorTokens.find((prefix) => key.toLowerCase().includes(prefix));
});
const colors = Object.fromEntries(colorTokensEntries);

/**
 * TODO features
 * - Shadow
 * TODO deprecations:
 * - max-width
 * - z-index
 */
const config = {
  theme: {
    colors,
    screens: {
      sm: breakpointsTokenConfig.breakpoint.sm.value,
      md: breakpointsTokenConfig.breakpoint.md.value,
      lg: breakpointsTokenConfig.breakpoint.lg.value,
      xl: breakpointsTokenConfig.breakpoint.xl.value,
      "2xl": breakpointsTokenConfig.breakpoint["2xl"].value,
    },
    extend: {
      spacing: extractTokensForCategory("spacing"),
      fontWeight: extractTokensForCategory("font-weight"),
      fontSize: extractTokensForCategory("font-size"),
      lineHeight: extractTokensForCategory("font-line-height"),
      fontFamily: extractTokensForCategory("font-family"),
      borderRadius: extractTokensForCategory("border-radius"),
    },
  },
};

const outputString = `module.exports = ${JSON.stringify(config, null, 2)};`;

writeFileSync("tailwind.darkside.config.js", outputString);

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

/* Cherry-picks object keys we want */
function extractTokensForCategory(tokenName: string) {
  const tokens = Object.entries(transformedTokens)
    .filter(([key]) => key.startsWith(tokenName))
    /* We want extract only the value from each token, so we replace the name: "spacing-4" -> "4" */
    .map(([key, value]) => [key.replace(`${tokenName}-`, ""), value]);

  return Object.fromEntries(tokens);
}
