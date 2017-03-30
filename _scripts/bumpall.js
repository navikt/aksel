const glob = require('glob');
const fs = require('fs');
const inquirer = require('inquirer');
const semver = require('semver');

function readfile(file) {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function getModules() {
    return new Promise((resolve, reject) => {
        glob('./packages/node_modules/**/package.json', {}, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const filesdata = files.map((file) => ({
                    location: file,
                    pkg: readfile(file)
                }));

                resolve(filesdata);
            }
        });
    });
}

function bumpVersions(bump) {
    return (modules) => {
        modules.forEach((module) => module.pkg.version = semver.inc(module.pkg.version, bump))
        return modules;
    };
}

function saveToDisk(modules) {
    modules.forEach((module) => {
        const location = module.location;
        const pkg = module.pkg;

        const content = `${JSON.stringify(pkg, null, 2)}\n`;

        console.log('Bumped', pkg.name, pkg.version);
        fs.writeFileSync(location, content, 'utf-8');
    });
}

inquirer.prompt([{
    type: 'list',
    name: 'bump',
    message: 'Bump?',
    choices: ['patch', 'minor', 'major']
}]).then((answers) => {
    getModules()
        .then(bumpVersions(answers.bump))
        .then(saveToDisk)
        .catch((error) => {
            console.log('error', error); // eslint-disable-line no-console
        });
});