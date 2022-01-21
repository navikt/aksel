import * as Tokens from "./tokens";
import _ from "lodash";
import { writeFileSync } from "fs";

const kebabCaseTokens = Object.entries(Tokens).map(([x, value]) => ({
  name: _.kebabCase(x),
  value,
}));

const colors = kebabCaseTokens
  .filter(
    (x) =>
      x.name.startsWith("navds-semantic-color") ||
      x.name.startsWith("navds-global-color")
  )
  .map((x) => ({
    ...x,
    name: x.name
      .replace("navds-semantic-color-", "")
      .replace("navds-global-color-", ""),
  }))
  .reduce((old, cur) => ({ ...old, [cur.name]: cur.value }), {});

const colorConfig = `module.exports = {
  theme: {
    colors: ${JSON.stringify(colors, null, 2)},
  },
};`;

writeFileSync("./tw.config.js", colorConfig);

console.log(colors);
