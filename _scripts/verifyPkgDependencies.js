/* eslint-disable strict, no-console */

'use strict';

const fs = require('fs');
const glob = require('glob');
const semver = require('semver');
const chalk = require('chalk');
const extend = require('extend');

let hasError = false;
const pkgGlob = `./packages/node_modules/**/package.json`;

console.log(`Checking package: ${chalk.cyan('./package.json')}`);
const globalPkg = analyzeDependenciesOf(JSON.parse(fs.readFileSync('./package.json')));
console.log('');

glob(pkgGlob, { dot: true }, (err, files) => {
    files.forEach((file) => {
        console.log(`Checking package: ${chalk.cyan(file)}`);
        const pkg = analyzeDependenciesOf(JSON.parse(fs.readFileSync(file, 'utf-8')));

        Object.keys(pkg)
            .filter((key) => !key.startsWith('nav-frontend-') && key !== 'nav-frontend-core')
            .forEach(verifySameValue(pkg, globalPkg));

        console.log('');
    });

    hasError && process.exit(1);
});

function objectIntersection(obj1, obj2) {
    return Object.keys(obj1).filter({}.hasOwnProperty.bind(obj2));
}

function verifySameValue(obj1, obj2) {
    return (key) => {
        if (obj1[key] !== obj2[key]) {
            console.log(`${chalk.red('ERROR::')} Found internal mismatch for ${key}. ${obj1[key]} !== ${obj2[key]}`)
            hasError = true;
        }
    }
}

function analyzeDependenciesOf(pkg) {
    // Check that dependencies in pkg use same version in all dependency-sections
    const dependencies = pkg.dependencies || {};
    const peerDependencies = pkg.peerDependencies || {};
    const devDependencies = pkg.devDependencies || {};

    objectIntersection(dependencies, peerDependencies).forEach(verifySameValue(dependencies, peerDependencies));
    objectIntersection(dependencies, devDependencies).forEach(verifySameValue(dependencies, devDependencies));
    objectIntersection(peerDependencies, devDependencies).forEach(verifySameValue(peerDependencies, devDependencies));

    return extend({}, dependencies, peerDependencies, devDependencies);
}
