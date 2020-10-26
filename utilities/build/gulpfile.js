/* eslint-disable strict */

"use strict";

const gulp = require("gulp");
const through = require("through2");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const gutil = require("gulp-util");
const path = require("path");
const chalk = require("chalk");
const cssfont64 = require("gulp-cssfont64-formatter");
const configureSvgIcon = require("react-svg-icon-generator-fork").default;
const addVariablesExportPlugin = require("../scripts/gulp-export-less-variables");
const camelcase = require("lodash.camelcase");

const fonts = "./packages/node_modules/*/assets/**/*.woff";
const dest = "../../packages";

let assetsEx;
let srcFragment;

if (path.win32 === path) {
  assetsEx = /(packages\\[^/]+)\\assets\\/;
  srcFragment = "$1\\src\\";
} else {
  assetsEx = new RegExp("(packages/[^/]+)/assets/");
  srcFragment = "$1/src/";
}

function mapSrcToDest(filepath) {
  return filepath.replace(assetsEx, srcFragment);
}

function fixErrorHandling() {
  return plumber({
    errorHandler: (err) => gutil.log(err.stack),
  });
}

function onlyNewFiles(map) {
  return newer({ map });
}

function logCompiling() {
  return through.obj((file, enc, callback) => {
    gutil.log("Compiling", `'${chalk.cyan(file.path)}'...`);
    callback(null, file);
  });
}

function renameUsingMapper(mapper) {
  return through.obj((file, enc, callback) => {
    file._path = file.path; // eslint-disable-line no-underscore-dangle, no-param-reassign
    file.path = mapper(file.path); // eslint-disable-line no-param-reassign

    callback(null, file);
  });
}

function cssFontfile(filename, mimetype, file64, format) {
  const fontFamiliy = "Source Sans Pro"; // all fonts at this point is Source sans pro
  const fontWeight = filename.replace(/\D/g, "") || "400"; // 400 is called regular
  const fontStyle = filename.indexOf("italic") >= 0 ? "italic" : "normal";

  // eslint-disable-next-line max-len
  return `@font-face { font-family: '${fontFamiliy}'; font-weight: ${fontWeight}; font-style: ${fontStyle}; src: url(data:${mimetype};base64,${file64}) format("${format}");}`;
}

function buildCssfonts() {
  return gulp
    .src(fonts)
    .pipe(fixErrorHandling())
    .pipe(onlyNewFiles(mapSrcToDest))
    .pipe(logCompiling())
    .pipe(cssfont64({ formatter: cssFontfile, extention: "less" }))
    .pipe(renameUsingMapper(mapSrcToDest))
    .pipe(gulp.dest(dest));
}

function exportLessVariables() {
  const file = "../../packages/nav-frontend-core/less";
  return gulp
    .src(`${file}/_variabler.less`)
    .pipe(addVariablesExportPlugin({ exportNames: camelcase }))
    .pipe(gulp.dest(file));
}

configureSvgIcon({
  destination: path.join(
    __dirname,
    "packages",
    "node_modules",
    "nav-frontend-ikoner-assets",
    "src",
    "index.js"
  ),
  svgDir: path.join(
    __dirname,
    "packages",
    "node_modules",
    "nav-frontend-ikoner-assets",
    "assets"
  ),
  keepFillColor: true,
});

gulp.task("buildLess", gulp.series(exportLessVariables));
gulp.task("build", gulp.series("buildLess"));
gulp.task("default", gulp.series("build"));
gulp.task("buildicons", gulp.series("svg-icon"));
gulp.task("buildfonts", gulp.series(buildCssfonts));
