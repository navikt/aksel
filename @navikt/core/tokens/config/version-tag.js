const fs = require("fs");
const path = require("path");

const cssFilePath = path.join(__dirname, "../dist/tokens.css");
const packageJsonPath = path.join(__dirname, "../package.json");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

let cssContent = fs.readFileSync(cssFilePath, "utf8");

if (!cssContent.includes("--a-version")) {
  cssContent = cssContent.replace("{", `{\n  --a-version: "${version}";`);
  fs.writeFileSync(cssFilePath, cssContent);
}
