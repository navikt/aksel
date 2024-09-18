import { readFileSync, writeFileSync } from "fs";

const cssFilePath = "./dist/tokens.css";
const packageJsonPath = "./package.json";

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

let cssContent = readFileSync(cssFilePath, "utf8");

if (!cssContent.includes("--a-version")) {
  cssContent = cssContent.replace("{", `{\n  --a-version: "${version}";`);
  writeFileSync(cssFilePath, cssContent);
}
