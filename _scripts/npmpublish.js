const fs = require('fs');
const utils = require('./utils');
const GitUtilities = require('lerna-waiting-on-pull-607/lib/GitUtilities');
const NpmUtilities = require('lerna-waiting-on-pull-607/lib/NpmUtilities');
const ChildProcessUtilities = require('lerna-waiting-on-pull-607/lib/ChildProcessUtilities');
const semver = require('semver');
const ProgressBar = require('progress');

const lastTaggedCommit = GitUtilities.getLastTaggedCommit();
const currentSHA = GitUtilities.getCurrentSHA();
const npmPublishUrl = 'http://maven.adeo.no/nexus/content/repositories/npm-internal/';

if (lastTaggedCommit !== currentSHA) {
    throw new Error('There are untagged commits...');
}

function getTags() {
    return ChildProcessUtilities.execSync(`git tag --points-at ${lastTaggedCommit}`)
        .split(/\s/)
        .map(utils.parsetag)
        .filter((tag) => tag.name !== 'nav-frontend-moduler'); // Fjern tags som er relatert til storybook-appen
}

function verifyTags(tags) {
    const progressbar = new ProgressBar('Verifying packages [:bar] (:current/:total)', {
        complete: '=',
        incomplete: ' ',
        width: (process.stdout.columns || 100) - 50 - 3,
        total: 3 * tags.length
    });

    return new Promise((resolve) => {
        tags.forEach((tag) => {
            const dir = `./packages/node_modules/${tag.name}`;
            const pkg = JSON.parse(fs.readFileSync(`${dir}/package.json`, 'utf-8'));

            // package.json and tag must have same version
            if (pkg.version !== tag.version) {
                // eslint-disable-next-line max-len
                throw new Error(`Tag-PKG mismatch, found ${pkg.version} in '${tag.name}/package.json', expected ${tag.version}`);
            }
            progressbar.tick();

            // Fetch data about package from npm
            NpmUtilities.execInDir('show', [tag.name, '--json'], '.', (err, resultString) => {
                // If previously released
                if (resultString) {
                    const result = JSON.parse(resultString);
                    const publishedVersions = result.versions.sort((a, b) => (semver.lt(a, b) ? 1 : -1));
                    const largestSemverVersion = publishedVersions[0];

                    // Verify the version is not already released
                    if (publishedVersions.indexOf(tag.version) >= 0) {
                        const versions = publishedVersions.join(', ');
                        throw new Error(`Tag ${tag.version} already released. Found ${versions} in repository.`);
                    }
                    progressbar.tick();

                    // Check if a greater version has been released, handle these cases manuelly
                    if (semver.lt(tag.version, largestSemverVersion)) {
                        // eslint-disable-next-line max-len
                        throw new Error(`A "greater" version har been released (${largestSemverVersion}). Tried to publish ${tag.version}`);
                    }
                    progressbar.tick();
                } else {
                    // Not released, go ahead
                    progressbar.tick(2);
                }
                resolve(tags);
            });
        });
    });
}

function npmPublish(tags) {
    const progressbar = new ProgressBar('Publishing packages [:bar] (:current/:total)', {
        complete: '=',
        incomplete: ' ',
        width: (process.stdout.columns || 100) - 50 - 3,
        total: tags.length
    });

    tags.forEach((tag) => {
        // Publish packageso
        const dir = `./packages/node_modules/${tag.name}`;
        console.log(`Exec: 'npm publish --registry=${npmPublishUrl}' in dir: ${dir}`);
        NpmUtilities.execInDir('publish', [`--registry=${npmPublishUrl}`], dir, (err, result) => {
            if (err) {
                throw new Error(err);
            } else {
                console.log('result', result);
                progressbar.tick(1);
            }
        });
    });
}

verifyTags(getTags())
    .then(npmPublish);

