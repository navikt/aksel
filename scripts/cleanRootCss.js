const css = require("css");
const { readFileSync, writeFileSync } = require("fs");

const cssData = readFileSync("./dist/index.css");

const parsed = css.parse(cssData.toString());

/**
 * Maps all root selectors into a flat list
 * {property: string, value: string, invalid: boolean}[]
 */
const rootValues = parsed.stylesheet.rules
  .filter((r) => r.selectors?.includes(":root"))
  .map((x) => x.declarations)
  .reduce(
    (old, cur) => [
      ...old,
      ...cur.map((l) => ({
        property: l.property,
        value: l.value,
        invalid: l.type !== "declaration",
      })),
    ],
    []
  );

const rootStr = () => {
  let str = ":root {\n";
  rootValues.forEach((sel) => {
    if (sel.invalid) return;
    str += `  ${sel.property}: ${sel.value};\n`;
  });
  str += "}\n";
  return str;
};

/**
 * Filters out all :root selectors and sourcemap
 */
const filtered = parsed.stylesheet.rules.filter(
  (r) =>
    !r.selectors?.includes(":root") &&
    !(r.type === "comment" && r.comment.includes("sourceMappingURL"))
);

parsed.stylesheet.rules = filtered;

writeFileSync(
  "./dist/demo.css",
  `${css.stringify(parsed)}\n
${rootStr()}`
);
