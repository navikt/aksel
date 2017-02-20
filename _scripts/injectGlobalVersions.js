const glob = require('glob');
const fs = require('fs');
const extend = require('extend');
const utils = require('./utils');
const globalPackage = require('./../package.json');

const globalDeps = extend({}, globalPackage.devDependencies, globalPackage.dependencies);


function getModules() {
    return new Promise((resolve, reject) => {
        glob('./packages/node_modules/**/package.json', {}, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

function fixDependencies(_package, section) {
    if (!_package[section]) {
        return;
    }

    _package[section] = utils.entries(_package[section])
        .map((entry) => {
            const depName = entry.key;

            if (!globalDeps[depName]) {
                return entry;
            }

            return { key: depName, value: globalDeps[depName] };
        })
        .map((entry) => { console.log('entry', entry, { [entry.key]: entry.value }); return entry; })
        .reduce((deps, entry) => extend(deps, { [entry.key]: entry.value }), {});

}
function injectGlobalDependencies(modules) {
    return modules.map((module) => {
        const _package = JSON.parse(fs.readFileSync(module, 'utf-8'));

        fixDependencies(_package, 'dependencies');
        fixDependencies(_package, 'devDependencies');
        fixDependencies(_package, 'peerDependencies');

        return {
            _location: module,
            _package: _package
        };
    })
}

function saveToDisk(modules) {
    modules.forEach((module) => {
        const _location = module._location;
        const _package = module._package;

        const content = JSON.stringify(_package, null, 2);

        fs.writeFileSync(_location, content, 'utf-8');
    });
}

getModules()
    .then(injectGlobalDependencies)
    .then(saveToDisk)
    .catch((error) => {
        console.log('error', error);
    });