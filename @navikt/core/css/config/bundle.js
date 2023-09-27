const fs = require("fs");
const path = require("path");
const fastglob = require("fast-glob");
const { camelCase } = require("lodash");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const combineSelectors = require("postcss-combine-duplicated-selectors");
const cssImports = require("postcss-import");
const cssnano = require("cssnano");
const getDirName = require("path").dirname;
const version = require("../package.json").version;
const {
  StyleMappings,
  componentsCss,
  formCss,
  rootDir,
  globalDir,
  componentDir,
  primitivesCss,
} = require("./_mappings.js");

run();

/**
 * Postcss-plugins
 * - cssImports: Inline of imports from other css files
 * - combineSelectors: Combine selectors with the same properties, removes duplicates
 * Minified-versions:
 * - autoprefixer: Add vendor prefixes, uses browserlist in package.json
 * - cssnano: css-minification
 */
async function run() {
  [`${rootDir}/version/${version}`, globalDir, componentDir].forEach((dir) => {
    if (!fs.existsSync(path.resolve(__dirname, `../${dir}`))) {
      fs.mkdirSync(path.resolve(__dirname, `../${dir}`), { recursive: true });
    }
  });

  await bundleMonolith();
  await bundleComponents();
  await bundleFragments();
  await bundleMinified();
  copyToVersionFolder();
}

async function bundleMonolith() {
  const indexSrc = path.resolve(__dirname, "../index.css");
  const indexDist = path.resolve(__dirname, `../${rootDir}/index.css`);

  const css = fs.readFileSync(indexSrc);
  const result = await postcss([cssImports, combineSelectors]).process(css, {
    from: indexSrc,
    to: indexDist,
  });

  fs.writeFileSync(indexDist, result.css);
}

/**
 * Bundle Components together for flexible import-options
 */
async function bundleComponents() {
  const indexSrc = path.resolve(__dirname, "../index.css");
  const indexDist = path.resolve(__dirname, `../${rootDir}/${componentsCss}`);

  const css = fs.readFileSync(indexSrc);

  /* Remove @charset, baseline */
  const cssString = css.toString().split("\n").slice(2).join("\n");

  const result = await postcss([cssImports, combineSelectors]).process(
    cssString,
    {
      from: indexSrc,
      to: indexDist,
    }
  );

  fs.writeFileSync(indexDist, result.css);
}

/**
 * Postcss-plugins
 * - cssImports: Handle inline of imports from other css files
 * - combineSelectors: Combine selectors with the same properties
 */
async function bundleFragments() {
  const files = buildFragmentFiles();

  for (let file of files) {
    const css = fs.readFileSync(file.input, { encoding: "utf-8" });
    const result = await postcss([cssImports, combineSelectors]).process(css, {
      from: file.input,
      to: file.output,
    });

    fs.writeFileSync(file.output, result.css);
  }
}

function buildFragmentFiles() {
  const files = fastglob
    .sync("*.css", { cwd: ".", ignore: "**/*.min.css" })
    .map((fileN) => path.basename(fileN))
    .map((x) => ({
      input: path.resolve(__dirname, `../${x}`),
      output: path.resolve(
        __dirname,
        `../${componentDir}/${camelCase(x.replace("css", ""))
          .toLowerCase()
          .replace(/ /g, "")}.css`
      ),
    }));

  StyleMappings.baseline.forEach(({ main }) => {
    files.push({
      input: `baseline/${main}`,
      output: `${globalDir}/${main}`,
    });
  });

  files.push({
    input: "form/index.css",
    output: `${componentDir}/${formCss}`,
  });

  files.push({
    input: "primitives/index.css",
    output: `${componentDir}/${primitivesCss}`,
  });

  return files;
}

async function bundleMinified() {
  const files = fastglob
    .sync("**/*.css", { cwd: `./${rootDir}`, ignore: "**/*.min.css" })
    .map((x) => ({
      input: `${rootDir}/${x}`,
      output: `${rootDir}/${x}`.replace("css", "min.css"),
    }));

  for (let file of files) {
    const css = fs.readFileSync(file.input, { encoding: "utf-8" });
    const result = await postcss([autoprefixer, cssnano]).process(css, {
      from: file.input,
      to: file.output,
    });

    fs.writeFileSync(file.output, result.css);
  }
}

function copyToVersionFolder() {
  const files = fastglob.sync("**/*.css", {
    cwd: `./${rootDir}`,
    ignore: "**/version/**",
  });

  for (let file of files) {
    const css = fs.readFileSync(`${rootDir}/${file}`, { encoding: "utf-8" });

    const filename = `${rootDir}/version/${version}/${file}`;
    fs.mkdirSync(getDirName(filename), { recursive: true });

    fs.writeFileSync(filename, css);
  }
}
