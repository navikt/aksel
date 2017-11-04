const path = require('path');
const fs = require('fs');
const glob = require('glob');
const markdownMagic = require('markdown-magic');
const mustache = require('mustache');
const dfs = require('depth-first').default;

mustache.tags = ['<%', '%>'];
const disclaimerMD = fs.readFileSync(path.join(__dirname, 'DISCLAIMER.md'), 'utf-8');

function createConfig(moduleName, edges) {
    return {
        transforms: {
            DISCLAIMER() {
                const renderdata = { name: moduleName };
                return mustache.render(disclaimerMD, renderdata);
            },
            INSTALL() {
                const dependencies = dfs(edges, moduleName).join(' ');
                return [
                    '### Installering:',
                    '```',
                    `npm install ${dependencies} --save`,
                    '```'
                ].join('\n');
            }
        }
    };
}


glob('./packages/node_modules/**/package.json', { dot: true }, (err, files) => {
    const pkgs = files
        .map((file) => (JSON.parse(fs.readFileSync(file, 'utf-8'))));

    const edges = pkgs
        .map((pkg) => [pkg.name, Object.keys(pkg.peerDependencies || {})])
        .reduce((arr, [pkgName, pkgDependencies]) => {
            return [ ...arr, ...pkgDependencies.map((dependency) => [ pkgName, dependency ])]
        }, []);

    pkgs.forEach((pkg) => {
        const pkgName = pkg.name;
        const config = createConfig(pkgName, edges);
        const MD = path.join(__dirname, '..', 'packages', 'node_modules', pkgName, 'README.md');
        markdownMagic(MD, config, (err) => err && console.log('err',err));
    });
});

