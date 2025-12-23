import fs from "node:fs";
import packageJson from "@navikt/ds-react/package.json" with { type: "json" };

const exports = Object.keys(packageJson.exports).filter(
  (key) =>
    key.startsWith("./") &&
    key !== "./index" &&
    !key.includes("*") &&
    /^\.\/[A-Z]/.test(key),
);

const lines = exports.map((key) => {
  const importPath = key.replace("./", "@navikt/ds-react/");
  return `export * from "${importPath}";`;
});

fs.writeFileSync("./src/auto-generated-imports.ts", lines.join("\n") + "\n");
