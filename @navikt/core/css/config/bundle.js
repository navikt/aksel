const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const combineSelectors = require("postcss-combine-duplicated-selectors");
const cssImports = require("postcss-import");
const cssnano = require("cssnano");

if (!fs.existsSync(path.resolve(__dirname, "../dist"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist"));
}

if (!fs.existsSync(path.resolve(__dirname, "../dist/module"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist/module"));
}

bundleMonolith();
bundleFragments();

function bundleMonolith() {
  const indexSrc = path.resolve(__dirname, "../index.css");
  const indexDist = path.resolve(__dirname, "../dist/index.css");

  fs.readFile(indexSrc, (_, css) => {
    postcss([cssImports, combineSelectors])
      .process(css, { from: indexSrc, to: indexDist })
      .then((result) => {
        fs.writeFileSync(indexDist, result.css, () => true);
      });
  });
}

function bundleFragments() {
  const indexSrc = path.resolve(__dirname, "../grid.css");
  const indexDist = path.resolve(__dirname, "../dist/module/grid.css");

  fs.readFile(indexSrc, (_, css) => {
    postcss([cssImports, combineSelectors, autoprefixer, cssnano])
      .process(css, { from: indexSrc, to: indexDist })
      .then((result) => {
        console.log(result);
        fs.writeFileSync(indexDist, result.css, () => true);
      });
  });
}
