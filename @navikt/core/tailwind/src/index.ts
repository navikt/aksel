// @ts-ignore
import * as TokensBuild from "@navikt/ds-tokens/dist/tokens";
import { writeFileSync } from "fs";
import kebabCase from "./kebabCase";
import Reducer from "./reducer";

const tokens = Object.entries(TokensBuild).reduce(
  (old, [key, val]) => ({
    ...old,
    [kebabCase(key).replace("navds-", "")]: val,
  }),
  {}
);

const config = {
  theme: {
    colors: Reducer(tokens, ["semantic-color", "global-color"]),
    extend: {
      spacing: Reducer(tokens, ["spacing"]),
      zIndex: Reducer(tokens, ["z-index"]),
      boxShadow: Reducer(tokens, ["shadow"]),
      fontWeight: Reducer(tokens, ["font-weight"]),
      fontSize: Reducer(tokens, ["font-size"]),
      lineHeight: Reducer(tokens, ["font-line-height"]),
      fontFamily: Reducer(tokens, ["font-family"]),
      borderRadius: Reducer(tokens, ["border-radius"]),
    },
  },
};

const outputString = `module.exports = ${JSON.stringify(config, null, 2)};`;

writeFileSync("tailwind.config.js", outputString);
