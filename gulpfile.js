/* eslint-disable strict */

'use strict';

const gulp = require('gulp');
const through = require('through2');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const path = require('path');
const chalk = require('chalk');
const cssfont64 = require('gulp-cssfont64-formatter');
const merge = require('merge2');
const configureSvgIcon = require('react-svg-icon-generator-fork').default;
const addVariablesExportPlugin = require('./_scripts/gulp-export-less-variables');
const camelcase = require('lodash.camelcase');

const jsScripts = './packages/node_modules/*/src/**/*.js';
const tsScripts = './packages/node_modules/*/src/**/*.ts*';
const fonts = './packages/node_modules/*/assets/**/*.woff';
const dest = 'packages/node_modules';
const tsProject = ts.createProject('tsconfig.json');

const tsDocgen = require('react-docgen-typescript').withDefaultConfig({
    propFilter: { skipPropsWithoutDoc: true }
});

const insert = require('gulp-insert');
const fs = require('fs');

let srcEx;
let assetsEx;
let libFragment;
let srcFragment;
let tsDocLib;
let tsDocSrc;

if (path.win32 === path) {
    srcEx = /(packages\\node_modules\\[^/]+)\\src\\/;
    assetsEx = /(packages\\node_modules\\[^/]+)\\assets\\/;
    libFragment = '$1\\lib\\';
    srcFragment = '$1\\src\\';
    tsDocLib = /\\lib\\/g;
    tsDocSrc = '\\src\\';
} else {
    srcEx = new RegExp('(packages/node_modules/[^/]+)/src/');
    assetsEx = new RegExp('(packages/node_modules/[^/]+)/assets/');
    libFragment = '$1/lib/';
    srcFragment = '$1/src/';
    tsDocLib = /\/lib\//g;
    tsDocSrc = '/src/';
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

function parseTsAndAppendDocInfo(contents, file) {
    const tsPath = file.path.replace(tsDocLib, tsDocSrc).replace(/.js$/g, '.tsx');

    let docInfo;
    let docInfoString;

    if (fs.existsSync(tsPath)) {
        const docs = tsDocgen.parse(tsPath);
        docInfo = docs[0];

        // Yeah, superhack. Men react-docgen-typescript velger alltid feil export fra tekstomrade filen
        if (docInfo.displayName === 'createDynamicHighlightingRule') {
            docInfo = docs[1];
        }

        const exceptions = ['StatelessComponent', 'EventThrottler', 'Container'];

        if (exceptions.indexOf(docInfo.displayName) !== -1) {
            return contents;
        }

        if (
            docInfo.props.type &&
            docInfo.props.type.type &&
            docInfo.props.type.type.name &&
            docInfo.props.type.type.name.indexOf('|') !== -1
        ) {
            docInfo.props.type.type.value = docInfo.props.type.type.name
                .split('|')
                .map((strValue) =>
                    ({ value: strValue.trim() })
                );
            docInfo.props.type.type.name = 'enum';
        }

        docInfoString = JSON.stringify(docInfo);

        // eslint-disable-next-line prefer-template
        return contents + '\n' + docInfo.displayName + '.__docgenInfo = ' + docInfoString;
    }

    return contents;
}

function buildTs() {
    const ignoreErrors = process.argv.indexOf('--ignoreErrors') !== -1;
    const withDocs = process.argv.indexOf('--docs') !== -1;

    const tsResult = gulp.src(tsScripts)
        .pipe(fixErrorHandling())
        .pipe(onlyNewFiles(mapToDest))
        .pipe(logCompiling())
        .pipe(tsProject())
        .on('error', () => { if (!ignoreErrors) process.exit(1); });

    const tsPipe = tsResult.js
        .pipe(babel({ plugins: ['transform-react-display-name'] }))
        .pipe(renameUsingMapper(mapToDest))
        .pipe(gulpif(withDocs, insert.transform((contents, file) => parseTsAndAppendDocInfo(contents, file))))
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

function exportLessVariables() {
    const file = './packages/node_modules/nav-frontend-core/less';
    return gulp.src(`${file}/_variabler.less`)
        .pipe(addVariablesExportPlugin({ exportNames: camelcase }))
        .pipe(gulp.dest(file));
}

configureSvgIcon({
    destination: path.join(__dirname, 'packages', 'node_modules', 'nav-frontend-ikoner-assets', 'src', 'index.js'),
    svgDir: path.join(__dirname, 'packages', 'node_modules', 'nav-frontend-ikoner-assets', 'assets'),
    keepFillColor: true
});

gulp.task('test', gulp.series(test));
gulp.task('buildLess', gulp.series(exportLessVariables));
gulp.task('buildJs', gulp.series(buildJs));
gulp.task('buildTs', gulp.series(buildTs));
gulp.task('build', gulp.series('buildLess', 'buildJs', 'buildTs'));
gulp.task('default', gulp.series('test', 'build'));
gulp.task('buildicons', gulp.series('svg-icon'));
gulp.task('buildfonts', gulp.series(buildCssfonts));
