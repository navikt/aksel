const fs = require("fs");
const path = require("path");
const fastglob = require("fast-glob");
const { camelCase, startCase } = require("lodash");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const combineSelectors = require("postcss-combine-duplicated-selectors");
const cssImports = require("postcss-import");
const cssnano = require("cssnano");
const version = require("../package.json").version;

if (!fs.existsSync(path.resolve(__dirname, "../dist"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist"));
}

if (!fs.existsSync(path.resolve(__dirname, "../dist/module"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist/module"));
}

if (!fs.existsSync(path.resolve(__dirname, `../dist/versioned/${version}`))) {
  fs.mkdirSync(path.resolve(__dirname, `../dist/versioned/${version}`), {
    recursive: true,
  });
}

bundleMonolith();
bundleComponents();
bundleFragments();

/**
 * Postcss-plugins
 * - cssImports: Handle inline of imports from other css files
 * - combineSelectors: Combine selectors with the same properties
 * Expect user to handle autoprefixing and minification inside their own build process
 */
function bundleMonolith() {
  const indexSrc = path.resolve(__dirname, "../index.css");
  const indexDist = path.resolve(__dirname, "../dist/module/index.css");

  fs.readFile(indexSrc, (_, css) => {
    postcss([cssImports, combineSelectors])
      .process(css, { from: indexSrc, to: indexDist })
      .then((result) => {
        fs.writeFileSync(indexDist, result.css, () => true);
      });
  });
}

/**
 * Postcss-plugins
 * - cssImports: Handle inline of imports from other css files
 * - combineSelectors: Combine selectors with the same properties
 * Expect user to handle autoprefixing and minification inside their own build process
 */
function bundleComponents() {
  const indexSrc = path.resolve(__dirname, "../index.css");
  const indexDist = path.resolve(__dirname, "../dist/module/Components.css");

  fs.readFile(indexSrc, (_, css) => {
    const cssString = css.toString().split("\n").slice(2).join("\n");
    postcss([cssImports, combineSelectors])
      .process(cssString, { from: indexSrc, to: indexDist })
      .then((result) => {
        fs.writeFileSync(indexDist, result.css, () => true);
        fs.writeFileSync(
          indexDist.replace("module", `versioned/${version}`),
          result.css,
          () => true
        );
      });

    postcss([cssImports, combineSelectors, autoprefixer, cssnano])
      .process(cssString, {
        from: indexSrc,
        to: indexDist.replace(".css", ".min.css"),
      })
      .then((result) => {
        fs.writeFileSync(
          indexDist
            .replace(".css", ".min.css")
            .replace("module", `versioned/${version}`),
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
 * - autoprefixer: Add vendor prefixes, uses browserlist in package.json
 * - cssnano: Simple minification of css
 */
function bundleFragments() {
  const files = fastglob
    .sync("*.css", { cwd: "." })
    .map((fileN) => path.basename(fileN))
    .filter((x) => x !== "index.css")
    .map((x) => ({
      input: path.resolve(__dirname, `../${x}`),
      output: path.resolve(
        __dirname,
        `../dist/module/${startCase(camelCase(x.replace("css", ""))).replace(
          / /g,
          ""
        )}.css`
      ),
    }));

  /* Bundle forms together for easier cascading */
  files.push({ input: "form/index.css", output: "dist/module/Forms.css" });

  /* Distribute a autprefixed and minified version of the complete stylesheet */
  files.push({ input: "index.css", output: "dist/module/index.css" });

  files.push({ input: "baseline/reset.css", output: "dist/module/reset.css" });
  files.push({ input: "baseline/fonts.css", output: "dist/module/fonts.css" });
  files.push({ input: "baseline/print.css", output: "dist/module/print.css" });
  files.push({
    input: "baseline/baseline.css",
    output: "dist/module/baseline.css",
  });
  files.push({
    input: "baseline/tokens.css",
    output: "dist/module/tokens.css",
  });

  files.forEach((file) => {
    const css = fs.readFileSync(file.input, { encoding: "utf-8" });
    postcss([cssImports, combineSelectors])
      .process(css, { from: file.input, to: file.output })
      .then((result) => {
        fs.writeFileSync(file.output, result.css, () => true);
        fs.writeFileSync(
          file.output.replace("module", `versioned/${version}`),
          result.css,
          () => true
        );
      });

    postcss([cssImports, combineSelectors, autoprefixer, cssnano])
      .process(css, { from: file.input, to: file.output })
      .then((result) => {
        fs.writeFileSync(
          file.output.replace(".css", ".min.css"),
          result.css,
          () => true
        );
        fs.writeFileSync(
          file.output
            .replace("module", `versioned/${version}`)
            .replace(".css", ".min.css"),
          result.css,
          () => true
        );
      });
  });
}
