const fastglob = require("fast-glob");
const path = require("path");
const {
  existsSync,
  readFileSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} = require("fs");

function main() {
  const basePath = path.resolve(__dirname, "../icons");
  const iconFolder = path.resolve(__dirname, "../dist/svg");

  const svgList = fastglob.sync("*.svg", { cwd: basePath });

  if (existsSync(iconFolder)) {
    rmSync(iconFolder, { recursive: true, force: true });
  }
  mkdirSync(iconFolder);

  svgList.forEach((svg) => {
    const icon = readFileSync(`${basePath}/${svg}`).toString();
    writeFileSync(`${iconFolder}/${svg}`, parseIcon(icon));
  });
}

/**
 *
 * @param {string} SVG-string
 * @returns {string} Parsed SVG-string
 */
function parseIcon(svgString) {
  let icon = svgString;
  icon = icon.replace(`width="24"`, `width="1em"`);
  icon = icon.replace(`height="24"`, `height="1em"`);
  icon = icon.replaceAll(`#202733`, `currentColor`);

  return icon;
}

module.exports = { parseIcon, main };
