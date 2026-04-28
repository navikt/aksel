const path = require("path");

const defaultIndexTemplate = (paths) => {
  const exportEntries = paths.map((filePath) => {
    const basename = path.basename(
      filePath.originalPath,
      path.extname(filePath.originalPath),
    );
    return `export { default as ${basename}Icon } from './${basename}'`;
  });

  return exportEntries.join("\n");
};

module.exports = defaultIndexTemplate;
