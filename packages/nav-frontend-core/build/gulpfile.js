/* eslint-disable strict */

"use strict";

const gulp = require("gulp");
const addVariablesExportPlugin = require("./gulp-export-less-variables.js");
const camelcase = require("lodash.camelcase");

function exportLessVariables() {
  const file = "../less";
  return gulp
    .src(`${file}/_variabler.less`)
    .pipe(addVariablesExportPlugin({ exportNames: camelcase }))
    .pipe(gulp.dest(file));
}

gulp.task("buildLess", gulp.series(exportLessVariables));
