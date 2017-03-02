const glob = require('glob');
const semver = require('semver');

const pkgGlob = `./packages/node_modules/**/package.json`;

glob(pkgGlob, { dot: true }, (err, files) => {
    console.log('files', files);
});