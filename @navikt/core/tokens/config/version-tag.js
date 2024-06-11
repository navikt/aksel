const fs = require("fs");
const path = require("path");

const cssFilePath = path.join(__dirname, "../dist/tokens.css");
const packageJsonPath = path.join(__dirname, "../package.json");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

let cssContent = fs.readFileSync(cssFilePath, "utf8");

cssContent = cssContent.replace("{", `{\n  --aksel-version: "${version}";`);

fs.writeFileSync(cssFilePath, cssContent);
