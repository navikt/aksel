const path = require('path');
const fs = require('fs');
const glob = require('glob');
const markdownMagic = require('markdown-magic');
const mustache = require('mustache');

mustache.tags = ['<%', '%>'];
const disclaimerMD = fs.readFileSync(path.join(__dirname, 'DISCLAIMER.md'), 'utf-8');

class PackageGraphNode {
    constructor(pkg) {
        this.package = pkg;
        this.dependencies = [];
    }

    getDeps() {
        return this.dependencies;
    }
}

function getNavFrontendDependencies({ dependencies }) {
    return dependencies.filter((dep) => dep.includes('nav-frontend-') && !dep.includes('nav-frontend-core'));
}

class PackageGraph {
    constructor(packages) {
        this.nodes = [];
        this.nodesByName = {};

        for (let p = 0; p < packages.length; p++) {
            const pkg = packages[p];
            const node = new PackageGraphNode(pkg);
            this.nodes.push(node);
            this.nodesByName[pkg.name] = node;
        }

        for (let n = 0; n < this.nodes.length; n++) {
            const node = this.nodes[n];
            const dependencies = node.package.peerDependencies || {};

            const depNames = Object.keys(dependencies);

            for (let d = 0; d < depNames.length; d++) {
                const depName = depNames[d];
                node.dependencies.push(depName);
            }
        }

        for (const nodeName in this.nodesByName) {
            const node = this.nodesByName[nodeName];
            const navFrontendDependencies = getNavFrontendDependencies(node);

            if (navFrontendDependencies.length > 0) {
                for (const dep of navFrontendDependencies) {
                    node.dependencies = node.dependencies.concat(this.getNode(dep).dependencies);
                }
            }
        }
    }

    getNode(packageName) {
        return this.nodesByName[packageName];
    }

    get(packageName) {
        return Array.from(new Set(this.nodesByName[packageName].dependencies)).sort();
    }
}

function createConfig(moduleName, dependencies) {
    return {
        transforms: {
            DISCLAIMER() {
                const renderdata = { name: moduleName };
                return mustache.render(disclaimerMD, renderdata);
            },
            INSTALL() {
                return [
                    '### Installering:',
                    '```',
                    `npm install ${moduleName} ${dependencies.join(' ')} --save`,
                    '```'
                ].join('\n');
            }
        }
    };
}


glob('./packages/node_modules/**/package.json', { dot: true }, (err, files) => {
    const pkgs = files
        .map((file) => (JSON.parse(fs.readFileSync(file, 'utf-8'))));

    const graph = new PackageGraph(pkgs);

    pkgs.forEach((pkg) => {
        const pkgName = pkg.name;
        let pkgDependencies = graph.get(pkgName);
        const config = createConfig(pkgName, pkgDependencies);
        const MD = path.join(__dirname, '..', 'packages', 'node_modules', pkgName, 'README.md');
        markdownMagic(MD, config, (err) => err && console.log('err',err));
    });
});

