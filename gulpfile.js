/* eslint-disable strict */

'use strict';

const gulp = require('gulp');
const through = require('through2');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const svgmin = require('gulp-svgmin');
const gutil = require('gulp-util');
const path = require('path');
const chalk = require('chalk');
const cssfont64 = require('gulp-cssfont64-formatter');

const scripts = './packages/node_modules/*/src/**/*.js';
const fonts = './packages/node_modules/*/assets/**/*.woff';
const icons = './packages/node_modules/*/assets/**/*.svg';
const dest = 'packages/node_modules';

let srcEx;
let assetsEx;
let libFragment;
let assetsFragment;
let srcFragment;

if (path.win32 === path) {
    srcEx = /(packages\\node_modules\\[^/]+)\\src\\/;
    assetsEx = /(packages\\node_modules\\[^/]+)\\assets\\/;
    libFragment = '$1\\lib\\';
    assetsFragment = '$1\\assets\\';
    srcFragment = '$1\\src\\';
} else {
    srcEx = new RegExp('(packages/node_modules/[^/]+)/src/');
    assetsEx = new RegExp('(packages/node_modules/[^/]+)/assets/');
    libFragment = '$1/lib/';
    assetsFragment = '$1/assets/';
    srcFragment = '$1/src/';
}

function mapToDest(filepath) {
    return filepath.replace(srcEx, libFragment);
}
function mapSrcToDest(filepath) {
    return filepath.replace(assetsEx, srcFragment);
}
function mapAssetsToDest(filepath) {
    return filepath.replace(assetsEx, assetsFragment);
}

function fixErrorHandling() {
    return plumber({
        errorHandler: (err) => gutil.log(err.stack)
    });
}

function onlyNewFiles(map) {
    return newer({ map });
}

function logCompiling() {
    return through.obj((file, enc, callback) => {
        gutil.log('Compiling', `'${chalk.cyan(file.path)}'...`);
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
    const fontFamiliy = 'Source Sans Pro'; // all fonts at this point is Source sans pro
    const fontWeight = filename.replace(/\D/g, '') || '400'; // 400 is called regular
    const fontStyle = filename.indexOf('italic') >= 0 ? 'italic' : 'normal';

    // eslint-disable-next-line max-len
    return `@font-face { font-family: '${fontFamiliy}'; font-weight: ${fontWeight}; font-style: ${fontStyle}; src: url(data:${mimetype};base64,${file64}) format("${format}");}`;
}

function test() {
    return 0;
}

function build() {
    return gulp.src(scripts)
        .pipe(fixErrorHandling())
        .pipe(onlyNewFiles(mapToDest))
        .pipe(logCompiling())
        .pipe(babel())
        .pipe(renameUsingMapper(mapToDest))
        .pipe(gulp.dest(dest));
}


function buildCssfonts() {
    return gulp.src(fonts)
        .pipe(fixErrorHandling())
        .pipe(onlyNewFiles(mapSrcToDest))
        .pipe(logCompiling())
        .pipe(cssfont64(cssFontfile))
        .pipe(renameUsingMapper(mapSrcToDest))
        .pipe(gulp.dest(dest));
}

function buildIcons() {
    return gulp.src(icons)
        .pipe(fixErrorHandling())
        .pipe(onlyNewFiles(mapAssetsToDest))
        .pipe(logCompiling())
        .pipe(svgmin({
            plugins: [{
                removeTitle: true
            }]
        }))
        .pipe(renameUsingMapper(mapAssetsToDest))
        .pipe(gulp.dest(dest));
}


gulp.task('test', test);
gulp.task('build', build);
gulp.task('default', ['test', 'build']);
gulp.task('buildfonts', buildCssfonts);
gulp.task('buildicons', buildIcons);
