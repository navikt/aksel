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
const configureSvgIcon = require('react-svg-icon-generator-fork').default;

const jsScripts = './packages/node_modules/*/src/**/*.js';
const typoFonts = './packages/node_modules/nav-frontend-typografi-style/assets/**/*.woff';
const typoFontsDest = './packages/node_modules/nav-frontend-typografi-style/src/';
const iconFonts = './packages/node_modules/nav-frontend-ikoner-webfont-style/assets/**/*.woff';
const iconFontsDest = './packages/node_modules/nav-frontend-ikoner-webfont-style/src/';
const dest = 'packages/node_modules';

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

function typoCssFontfile(filename, mimetype, file64, format) {
    const fontFamiliy = 'Source Sans Pro'; // all fonts at this point is Source sans pro
    const fontWeight = filename.replace(/\D/g, '') || '400'; // 400 is called regular
    const fontStyle = filename.indexOf('italic') >= 0 ? 'italic' : 'normal';

    // eslint-disable-next-line max-len
    return `@font-face { font-family: '${fontFamiliy}'; font-weight: ${fontWeight}; font-style: ${fontStyle}; src: url(data:${mimetype};base64,${file64}) format("${format}");}`;
}

function iconCssFontfile(filename, mimetype, file64, format) {
    const fontFamily = filename;
    
    let filenameParts = filename.split('nav-ikoner-');
    let rest = filenameParts[1].split('-');
    let styleModifier = rest.shift();
    let iconGroup = rest.join('-');
    let baseSelector = ['nav-ikoner', styleModifier, iconGroup].join('.');

    // eslint-disable-next-line max-len
    return `@font-face { font-family: '${fontFamily}'; font-weight: normal; font-style: normal; src: url(data:${mimetype};base64,${file64}) format("${format}");} .${baseSelector} { font-family: '${fontFamily}'; font-size:24px; letter-spacing:normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; line-height: 1; -webkit-font-feature-settings: "liga", "dlig"; -moz-font-feature-settings: "liga=1, dlig=1"; -moz-font-feature-settings: "liga", "dlig"; -ms-font-feature-settings: "liga", "dlig"; -o-font-feature-settings: "liga", "dlig"; font-feature-settings: "liga", "dlig"; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }`;
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

function buildTypoCssFonts() {
    return gulp.src(typoFonts)
        .pipe(fixErrorHandling())
        .pipe(onlyNewFiles(mapSrcToDest))
        .pipe(logCompiling())
        .pipe(cssfont64({ formatter: typoCssFontfile, extention: 'less' }))
        .pipe(renameUsingMapper(mapSrcToDest))
        .pipe(gulp.dest(typoFontsDest));
}

function buildIconsCssFonts() {
    return gulp.src(iconFonts)
        .pipe(fixErrorHandling())
        .pipe(onlyNewFiles(mapSrcToDest))
        .pipe(logCompiling())
        .pipe(cssfont64({ formatter: iconCssFontfile, extention: 'less' }))
        .pipe(renameUsingMapper(mapSrcToDest))
        .pipe(gulp.dest(iconFontsDest));
}

configureSvgIcon({
    destination: path.join(__dirname, 'packages', 'node_modules', 'nav-frontend-ikoner-assets', 'src', 'index.js'),
    svgDir: path.join(__dirname, 'packages', 'node_modules', 'nav-frontend-ikoner-assets', 'assets'),
    keepFillColor: true
});

gulp.task('test', test);
gulp.task('buildJs', buildJs);
gulp.task('build', ['buildJs']);
gulp.task('default', ['test', 'build']);
gulp.task('buildicons', ['svg-icon']);
gulp.task('buildTypoCssFonts', buildTypoCssFonts);
gulp.task('buildIconsCssFonts', buildIconsCssFonts);
gulp.task('buildfonts', ['buildTypoCssFonts', 'buildIconsCssFonts']);
