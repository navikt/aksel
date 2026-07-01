import { writeFileSync } from "node:fs";
import * as TokensBuild from "@navikt/ds-tokens/js";
import { kebabCaseForAlpha } from "../../tokens/config/kebabCase";
import { breakpointTokenConfig } from "../../tokens/src/tokens/breakpoint";

const transformedTokens = Object.fromEntries(
  Object.entries(TokensBuild)
    .map(([key, value]) => {
      return [kebabCaseForAlpha(key), value];
    })
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
  "radius",
];

const colorTokensEntries = Object.entries(transformedTokens).filter(([key]) => {
  return !nonColorTokens.find((prefix) => key.toLowerCase().includes(prefix));
});
const colors = Object.fromEntries(colorTokensEntries) as Record<string, string>;

export const v4Config = {
  colors,
  shadows: extractTokensForCategory("shadow"),
  fontSizes: extractTokensForCategory("font-size"),
  fontWeights: extractTokensForCategory("font-weight"),
  lineHeights: extractTokensForCategory("font-line-height"),
  fontFamilies: extractTokensForCategory("font-family"),
  opacity: extractTokensForCategory("opacity"),
  radius: extractTokensForCategory("radius"),
  breakpoints: {
    sm: breakpointTokenConfig.breakpoint.sm.value,
    md: breakpointTokenConfig.breakpoint.md.value,
    lg: breakpointTokenConfig.breakpoint.lg.value,
    xl: breakpointTokenConfig.breakpoint.xl.value,
    "2xl": breakpointTokenConfig.breakpoint["2xl"].value,
  },
};

function generateThemeCSS(): string {
  const lines: string[] = ["@theme {"];

  for (const [key, value] of Object.entries(v4Config.colors)) {
    lines.push(`  --color-ax-${key}: ${value};`);
  }

  lines.push("");
  for (const [key, value] of Object.entries(v4Config.shadows)) {
    lines.push(`  --shadow-ax-${key}: ${value};`);
  }

  lines.push("");
  for (const [key, value] of Object.entries(v4Config.fontSizes)) {
    lines.push(`  --font-size-ax-${key}: ${value};`);
  }

  lines.push("");
  for (const [key, value] of Object.entries(v4Config.fontWeights)) {
    lines.push(`  --font-weight-ax-${key}: ${value};`);
  }

  lines.push("");
  for (const [key, value] of Object.entries(v4Config.lineHeights)) {
    lines.push(`  --leading-ax-${key}: ${value};`);
  }

  lines.push("");
  for (const [key, value] of Object.entries(v4Config.fontFamilies)) {
    lines.push(`  --font-family-ax-${key}: ${value};`);
  }

  lines.push("");
  for (const [key, value] of Object.entries(v4Config.opacity)) {
    lines.push(`  --opacity-ax-${key}: ${value};`);
  }

  lines.push("");
  for (const [key, value] of Object.entries(v4Config.radius)) {
    lines.push(`  --radius-ax-${key}: ${value};`);
  }

  lines.push("");
  for (const [key, value] of Object.entries(v4Config.breakpoints)) {
    lines.push(`  --breakpoint-ax-${key}: ${value};`);
  }

  lines.push("}");
  return lines.join("\n");
}

writeFileSync("tailwind4.css", generateThemeCSS());

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

function extractTokensForCategory(tokenName: string) {
  const tokens = Object.entries(transformedTokens)
    .filter(([key]) => key.startsWith(tokenName))
    .map(([key, value]) => [key.replace(`${tokenName}-`, ""), value]);

  return Object.fromEntries(tokens);
}

export { generateThemeCSS };
