// oxlint-disable typescript/no-require-imports
const fastglob = require("fast-glob");
const kebabCase = require("lodash/kebabCase");
const path = require("node:path");
const {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} = require("node:fs");
const { optimize } = require("svgo");

/**
 * @param {string} iconName e.g. "MagnifyingGlass"
 * @returns {string} e.g. "--aksel-icon-magnifying-glass"
 */
function toCssVariableName(iconName) {
  return `--aksel-icon-${kebabCase(iconName)}`;
}

/**
 * @param {string} svgString
 * @returns {string} Minified SVG with currentColor fill and preserved viewBox
 */
function optimizeSvg(svgString) {
  return optimize(svgString.replaceAll("#202733", "currentColor"), {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: { overrides: { removeViewBox: false } },
      },
      { name: "removeAttrs", params: { attrs: "svg:(width|height)" } },
    ],
  }).data;
}

/**
 * Encodes SVG for use in a CSS `url()`. Keeps readable characters unescaped for smaller output.
 * @param {string} svgString
 * @returns {string}
 */
function svgToDataUri(svgString) {
  const encoded = svgString
    .replaceAll('"', "'")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[^\x20-\x7e]|[%#<>{}"\\]/g, encodeURIComponent);

  return `url("data:image/svg+xml,${encoded}")`;
}

/**
 * @param {string[]} declarations
 * @returns {string}
 */
function createCssFile(declarations) {
  return `:root {\n${declarations.map((d) => `  ${d}`).join("\n")}\n}\n`;
}

function main() {
  const basePath = path.resolve(__dirname, "../icons");
  const cssFolder = path.resolve(__dirname, "../dist/css");

  const svgList = fastglob.sync("*.svg", { cwd: basePath }).sort();

  if (existsSync(cssFolder)) {
    rmSync(cssFolder, { recursive: true, force: true });
  }
  mkdirSync(cssFolder, { recursive: true });

  const declarations = [];

  for (const svg of svgList) {
    const iconName = path.basename(svg, ".svg");
    const svgString = readFileSync(path.join(basePath, svg)).toString();
    const declaration = `${toCssVariableName(iconName)}: ${svgToDataUri(optimizeSvg(svgString))};`;

    declarations.push(declaration);
    writeFileSync(
      path.join(cssFolder, `${iconName}.css`),
      createCssFile([declaration]),
    );
  }

  writeFileSync(path.join(cssFolder, "index.css"), createCssFile(declarations));
}

module.exports = {
  createCssFile,
  main,
  optimizeSvg,
  svgToDataUri,
  toCssVariableName,
};
