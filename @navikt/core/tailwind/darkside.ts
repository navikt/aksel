import { writeFileSync } from "fs";
import { kebabCaseForAlpha } from "@navikt/ds-tokens/config/kebabCase";
import { breakpointsTokenConfig } from "@navikt/ds-tokens/darkside/tokens/breakpoints";
import * as TokensBuild from "@navikt/ds-tokens/dist/darkside/tokens";

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

const transformedTokens = Object.fromEntries(
  Object.entries(TokensBuild).map(([key, value]) => {
    return [kebabCaseForAlpha(key), value];
  }),
);

/**
 * TODO features
 * - Shadow
 * TODO deprecations:
 * - max-width
 * - z-index
 */
const config = {
  theme: {
    colors: getColors(),
    screens: {
      sm: breakpointsTokenConfig.breakpoint.sm.value,
      md: breakpointsTokenConfig.breakpoint.md.value,
      lg: breakpointsTokenConfig.breakpoint.lg.value,
      xl: breakpointsTokenConfig.breakpoint.xl.value,
      "2xl": breakpointsTokenConfig.breakpoint["2xl"].value,
    },
    extend: {
      spacing: Reducer(["spacing"]),
      fontWeight: Reducer(["font-weight"]),
      fontSize: Reducer(["font-size"]),
      lineHeight: Reducer(["font-line-height"]),
      fontFamily: Reducer(["font-family"]),
      borderRadius: Reducer(["border-radius"]),
    },
  },
};

const outputString = `module.exports = ${JSON.stringify(config, null, 2)};`;

writeFileSync("tailwind.darkside.config.js", outputString);

/**
 * Assumes that all remaining names not in nonColorTokens are colors
 * TODO: Should probably write some tests on this when tokens are more stable
 */
function getColors() {
  return Object.fromEntries(
    Object.entries(transformedTokens).filter(([key]) => {
      return !nonColorTokens.find((prefix) =>
        key.toLowerCase().includes(prefix),
      );
    }, []),
  );
}

function replaceKey(s: string, keys: string[]) {
  let key = s;
  keys.forEach((k) => {
    key = key.replace(`${k}-`, "");
  });
  return key;
}

/* Cherry-picks object keys we want */
function Reducer(replace: string[]) {
  return Object.entries(transformedTokens).reduce((old, [key, value]) => {
    if (replace.find((v) => key.startsWith(v))) {
      old[replaceKey(key, replace)] = value;
    }
    return old;
  }, {});
}
