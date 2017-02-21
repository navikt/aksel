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
const extend = require('extend');

const scripts = './packages/node_modules/*/src/**/*.js';
const dest = 'packages/node_modules';

let srcEx;
let libFragment;

if (path.win32 === path) {
    srcEx = /(packages\\[^/]+)\\src\\/;
    libFragment = '$1\\lib\\';
} else {
    srcEx = new RegExp('(packages/[^/]+)/src/');
    libFragment = '$1/lib/';
}

function mapToDest(filepath) {
    return filepath.replace(srcEx, libFragment);
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
            const nFile = extend({}, file, { _path: file.path, path: mapToDest(file.path) });
            callback(null, nFile);
        }))
        .pipe(gulp.dest(dest));
}

gulp.task('lint', lint);
gulp.task('test', test);
gulp.task('build', build);
gulp.task('default', ['lint', 'test', 'build']);
