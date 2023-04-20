const fs = require("fs");
const path = require("path");
const fastglob = require("fast-glob");
const { camelCase } = require("lodash");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const combineSelectors = require("postcss-combine-duplicated-selectors");
const cssImports = require("postcss-import");
const cssnano = require("cssnano");
const version = require("../package.json").version;
const { StyleMappings, componentsCss, formCss } = require("./mappings.js");

run();

async function run() {
  if (!fs.existsSync(path.resolve(__dirname, "../dist"))) {
    fs.mkdirSync(path.resolve(__dirname, "../dist"));
  }

  if (!fs.existsSync(path.resolve(__dirname, `../dist/version/${version}`))) {
    fs.mkdirSync(path.resolve(__dirname, `../dist/version/${version}`), {
      recursive: true,
    });
  }

  await bundleMonolith();
  await bundleComponents();
  await bundleFragments();
  await bundleMinified();
}

/**
 * Postcss-plugins
 * - cssImports: Handle inline of imports from other css files
 * - combineSelectors: Combine selectors with the same properties
 */
async function bundleMonolith() {
  const indexSrc = path.resolve(__dirname, "../index.css");
  const indexDist = path.resolve(__dirname, "../dist/index.css");

  return fs.readFile(indexSrc, (_, css) => {
    postcss([cssImports, combineSelectors])
      .process(css, { from: indexSrc, to: indexDist })
      .then((result) => {
        fs.writeFileSync(indexDist, result.css, () => true);
      });
  });
}

/**
 * Bundle Components together for flexible import-options
 */
async function bundleComponents() {
  const indexSrc = path.resolve(__dirname, "../index.css");
  const indexDist = path.resolve(__dirname, `../dist/${componentsCss}`);

  return fs.readFile(indexSrc, (_, css) => {
    /* Remove @charset, baseline */
    const cssString = css.toString().split("\n").slice(2).join("\n");
    postcss([cssImports, combineSelectors])
      .process(cssString, { from: indexSrc, to: indexDist })
      .then((result) => {
        fs.writeFileSync(
          indexDist.replace("dist", `dist/version/${version}`),
          result.css,
          () => true
        );
      });
  });
}

/**
 * Postcss-plugins
 * - cssImports: Handle inline of imports from other css files
 * - combineSelectors: Combine selectors with the same properties
 */
async function bundleFragments() {
  const files = fastglob
    .sync("*.css", { cwd: ".", ignore: "**/*.min.css" })
    .map((fileN) => path.basename(fileN))
    .map((x) => ({
      input: path.resolve(__dirname, `../${x}`),
      output: path.resolve(
        __dirname,
        `../dist/${camelCase(x.replace("css", ""))
          .toLowerCase()
          .replace(/ /g, "")}.css`
      ),
    }));

  StyleMappings.baseline.forEach(({ main }) => {
    files.push({ input: `baseline/${main}`, output: `dist/${main}` });
  });

  files.push({ input: "form/index.css", output: `dist/${formCss}` });

  for (let file of files) {
    const css = fs.readFileSync(file.input, { encoding: "utf-8" });
    await postcss([cssImports, combineSelectors])
      .process(css, { from: file.input, to: file.output })
      .then((result) => {
        fs.writeFileSync(file.output, result.css, () => true);
        fs.writeFileSync(
          file.output.replace("dist", `dist/version/${version}`),
          result.css,
          () => true
        );
      });
  }
}

/**
 * Give a minified version of of CSS for CDN and static imports
 * Postcss-plugins
 * - autoprefixer: Add vendor prefixes, uses browserlist in package.json
 * - cssnano: css-minification
 */
async function bundleMinified() {
  const files = fastglob
    .sync("**/*.css", { cwd: "./dist", ignore: "**/*.min.css" })
    .map((x) => ({
      input: `dist/${x}`,
      output: `dist/${x}`.replace("css", "min.css"),
    }));

  for (let file of files) {
    const css = fs.readFileSync(file.input, { encoding: "utf-8" });
    await postcss([autoprefixer, cssnano])
      .process(css, { from: file.input, to: file.output })
      .then((result) => {
        fs.writeFileSync(file.output, result.css, () => true);
      });
  }
}
