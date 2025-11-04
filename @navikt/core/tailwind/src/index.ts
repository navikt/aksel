import { writeFileSync } from "node:fs";
import * as TokensBuild from "@navikt/ds-tokens/dist/tokens";
import { getColors } from "./colors";
import { getBreakpoints } from "./getBreakpoints";
import { getMaxWidth } from "./getMaxWidth";
import kebabCase from "./kebabCase";
import Reducer from "./reducer";

const tokens = Object.entries(TokensBuild).reduce((old, [key, val]) => {
  const newKey = kebabCase(key)
    .replace("a-", "")
    .replace("az-index-", "z-index-");
  old[newKey] = val;

  return old;
}, {});

const config = {
  theme: {
    colors: getColors(tokens),
    screens: getBreakpoints(tokens),
    extend: {
      spacing: Reducer(tokens, ["spacing"]),
      zIndex: Reducer(tokens, ["z-index"]),
      boxShadow: Reducer(tokens, ["shadow"]),
      fontWeight: Reducer(tokens, ["font-weight"]),
      fontSize: Reducer(tokens, ["font-size"]),
      lineHeight: Reducer(tokens, ["font-line-height"]),
      fontFamily: Reducer(tokens, ["font-family"]),
      borderRadius: Reducer(tokens, ["border-radius"]),
      maxWidth: getMaxWidth(tokens),
    },
  },
};

const outputString = `module.exports = ${JSON.stringify(config, null, 2)};`;

writeFileSync("tailwind.config.js", outputString);
