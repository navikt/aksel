import { writeFileSync } from "fs";
import * as tokens from "./tokens.json";
import Reducer from "./reducer";

const config = {
  theme: {
    colors: Reducer(tokens, ["semantic-color", "global-color"]),
    spacing: Reducer(tokens, ["spacing"]),
    zIndex: Reducer(tokens, ["z-index"]),
    boxShadow: Reducer(tokens, ["shadow"]),
    fontWeight: Reducer(tokens, ["font-weight"]),
    fontSize: Reducer(tokens, ["font-size"]),
    lineHeight: Reducer(tokens, ["font-line-height"]),
    fontFamily: Reducer(tokens, ["font-family"]),
  },
};

const outputString = `module.exports = ${JSON.stringify(config, null, 2)};`;

writeFileSync("./tailwind/tailwind.config.js", outputString);
