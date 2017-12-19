/* eslint-disable strict */

'use strict';

const gulp = require('gulp');
const through = require('through2');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const path = require('path');
const chalk = require('chalk');
const cssfont64 = require('gulp-cssfont64-formatter');
const merge = require('merge2');
const configureSvgIcon = require('react-svg-icon-generator-fork').default;

const jsScripts = './packages/node_modules/*/src/**/*.js';
const tsScripts = './packages/node_modules/*/src/**/*.ts*';
const fonts = './packages/node_modules/*/assets/**/*.woff';
const dest = 'packages/node_modules';
const tsProject = ts.createProject('tsconfig.json');

let srcEx;
let assetsEx;
let libFragment;
let srcFragment;

if (path.win32 === path) {
    srcEx = /(packages\\node_modules\\[^/]+)\\src\\/;
    assetsEx = /(packages\\node_modules\\[^/]+)\\assets\\/;
    libFragment = '$1\\lib\\';
    srcFragment = '$1\\src\\';
} else {
    srcEx = new RegExp('(packages/node_modules/[^/]+)/src/');
    assetsEx = new RegExp('(packages/node_modules/[^/]+)/assets/');
    libFragment = '$1/lib/';
    srcFragment = '$1/src/';
}

function mapToDest(filepath) {
    return filepath.replace(srcEx, libFragment);
}

function mapSrcToDest(filepath) {
    return filepath.replace(assetsEx, srcFragment);
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

function buildJs() {
    return gulp.src(jsScripts)
        .pipe(fixErrorHandling())
        .pipe(onlyNewFiles(mapToDest))
        .pipe(logCompiling())
        .pipe(babel({ plugins: ['transform-react-display-name'] }))
        .pipe(renameUsingMapper(mapToDest))
        .pipe(gulp.dest(dest));
}

function buildTs() {
    const tsResult = gulp.src(tsScripts)
        .pipe(fixErrorHandling())
        .pipe(onlyNewFiles(mapToDest))
        .pipe(logCompiling())
        .pipe(tsProject());

    const tsPipe = tsResult.js
        .pipe(babel({ plugins: ['transform-react-display-name'] }))
        .pipe(renameUsingMapper(mapToDest))
        .pipe(gulp.dest(dest));

    const dtsPipe = tsResult.dts
        .pipe(renameUsingMapper(mapToDest))
        .pipe(gulp.dest(dest));

    return merge([tsPipe, dtsPipe]);
}


function buildCssfonts() {
    return gulp.src(fonts)
        .pipe(fixErrorHandling())
        .pipe(onlyNewFiles(mapSrcToDest))
        .pipe(logCompiling())
        .pipe(cssfont64({ formatter: cssFontfile, extention: 'less' }))
        .pipe(renameUsingMapper(mapSrcToDest))
        .pipe(gulp.dest(dest));
}

configureSvgIcon({
    destination: path.join(__dirname, 'packages', 'node_modules', 'nav-frontend-ikoner-assets', 'src', 'index.js'),
    svgDir: path.join(__dirname, 'packages', 'node_modules', 'nav-frontend-ikoner-assets', 'assets'),
    keepFillColor: true
});

gulp.task('test', test);
gulp.task('buildJs', buildJs);
gulp.task('buildTs', buildTs);
gulp.task('build', ['buildJs', 'buildTs']);
gulp.task('default', ['test', 'build']);
gulp.task('buildicons', ['svg-icon']);
gulp.task('buildfonts', buildCssfonts);
