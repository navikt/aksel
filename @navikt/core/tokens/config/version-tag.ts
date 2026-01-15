import { readFileSync, writeFileSync } from "node:fs";

const cssFilePaths = ["./dist/tokens.css"];
const packageJsonPath = "./package.json";

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

for (const path of cssFilePaths) {
  let cssContent = readFileSync(path, "utf8");

  cssContent = cssContent.replace(
    ":root, :host {",
    `:root, :host {\n  --ax-version: "${version}";`,
  );
  writeFileSync(path, cssContent);
}
