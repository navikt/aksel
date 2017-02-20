const fs = require('fs');
const semver = require('semver');
const Command = require('lerna/lib/Command').default;
const UpdatedPackagesCollector = require('lerna/lib/UpdatedPackagesCollector');
const NpmUtilities = require('lerna/lib/NpmUtilities');
const path = require('path');
const allCompleted = require('./utils').allCompleted;

const command = new Command();
const updatedPackagesCollector = new UpdatedPackagesCollector(command);

const NOTFOUND = 'NOTFOUND';

function getGreatestVersions(module) {
    return new Promise((resolve, reject) => {
        NpmUtilities.execInDir('show', [module._package.name, 'versions', '--json'], '.', (err, response) => {
            if (err) {
                module._latest = NOTFOUND;
                reject(module);
            } else {
                const versions = JSON.parse(response);
                versions.sort((a, b) => semver.gt(a, b) ? -1 : 1);

                module._latest = versions[0];
                resolve(module);
            }
        })
    });
}


function incrementPatchVersion(module) {
    if (module._latest === NOTFOUND) {
        return;
    }
    const pkgVersion = module._package.version;
    const latestReleasedVersion = module._latest;

    if (semver.eq(pkgVersion, latestReleasedVersion)) {
        module._package.version = semver.inc(pkgVersion, 'patch');

        console.log('Setting new version for ', module._package.name, module._package.version);

        fs.writeFileSync(path.join(module._location, 'package.json'), JSON.stringify(module._package, null, 2));

    } else if (semver.lt(pkgVersion, latestReleasedVersion)) {
        throw new Error(`Package version lower than last release version for ${module._package.name}, version: ${pkgVersion} lastReleased: ${latestReleasedVersion}`);
    }
}

const updates = updatedPackagesCollector.getUpdates()
    .map((update) => update.package)
    .map(getGreatestVersions);

allCompleted(updates)
    .then((updates) => updates.map(incrementPatchVersion))
    .catch((err) => console.log('ERROR', err));
