/* eslint-disable strict */

'use strict';

const gulp = require('gulp');
const through = require('through2');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const path = require('path');
const chalk = require('chalk');
const cssfont64 = require('gulp-cssfont64-formatter');

const scripts = './packages/node_modules/*/src/**/*.js';
const fonts = './packages/node_modules/*/assets/**/*.woff';
const dest = 'packages/node_modules';

let srcEx;
let fontEx;
let libFragment;
let fontFragment;

if (path.win32 === path) {
    srcEx = /(packages\\node_modules\\[^/]+)\\src\\/;
    fontEx = /(packages\\node_modules\\[^/]+)\\assets\\/;
    libFragment = '$1\\lib\\';
    fontFragment = '$1\\src\\';
} else {
    srcEx = new RegExp('(packages/node_modules/[^/]+)/src/');
    fontEx = new RegExp('(packages/node_modules/[^/]+)/assets/');
    libFragment = '$1/lib/';
    fontFragment = '$1/src/';
}

function mapToDest(filepath) {
    return filepath.replace(srcEx, libFragment);
}
function mapFontsToDest(filepath) {
    return filepath.replace(fontEx, fontFragment);
}

function lint() {
    return 0;
}
function test() {
    return 0;
}

function build() {
    return gulp.src(scripts)
        .pipe(plumber({
            errorHandler: (err) => gutil.log(err.stack)
        }))
        .pipe(newer({ map: mapToDest }))
        .pipe(through.obj((file, enc, callback) => {
            gutil.log('Compiling', `'${chalk.cyan(file.path)}'...`);
            callback(null, file);
        }))
        .pipe(babel())
        .pipe(through.obj((file, enc, callback) => {
            file._path = file.path; // eslint-disable-line no-underscore-dangle, no-param-reassign
            file.path = mapToDest(file.path); // eslint-disable-line no-param-reassign

            callback(null, file);
        }))
        .pipe(gulp.dest(dest));
}

function cssFontfile(filename, mimetype, file64, format) {
    const fontFamiliy = 'Source Sans Pro'; // all fonts at this point is Source sans pro
    const fontWeight = filename.replace(/\D/g, '') || '400'; // 400 is called regular
    const fontStyle = filename.indexOf('italic') >= 0 ? 'italic' : 'normal';

    // eslint-disable-next-line max-len
    return `@font-face { font-family: '${fontFamiliy}'; font-weight: ${fontWeight}; font-style: ${fontStyle}; src: url(data:${mimetype};base64,${file64}) format("${format}");}`;
}

function buildCssfonts() {
    return gulp.src(fonts)
        .pipe(plumber({
            errorHandler: (err) => gutil.log(err.stack)
        }))
        .pipe(newer({ map: mapFontsToDest }))
        .pipe(through.obj((file, enc, callback) => {
            gutil.log('Compiling font', `'${chalk.cyan(file.path)}'...`);
            callback(null, file);
        }))
        .pipe(cssfont64(cssFontfile))
        .pipe(through.obj((file, enc, callback) => {
            file._path = file.path; // eslint-disable-line no-underscore-dangle, no-param-reassign
            file.path = mapFontsToDest(file.path); // eslint-disable-line no-param-reassign

            callback(null, file);
        }))
        .pipe(gulp.dest(dest));
}

gulp.task('lint', lint);
gulp.task('test', test);
gulp.task('build', build);
gulp.task('default', ['lint', 'test', 'build']);
gulp.task('buildfonts', buildCssfonts);
