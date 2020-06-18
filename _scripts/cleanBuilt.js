const path = require('path');
const fs = require('fs');
const glob = require('glob');

function deleteFolder(folder) {
    if (!fs.lstatSync(folder).isDirectory()) {
        throw new Error(`path: ${folder} is not a directory`);
    }
    if (fs.existsSync(folder)) {
        fs.readdirSync(folder).forEach((file) => {
            const currentPath = path.join(folder, file);
            if (fs.lstatSync(currentPath).isDirectory()) {
                deleteFolder(currentPath);
            } else {
                fs.unlinkSync(currentPath);
            }
        });
        fs.rmdirSync(folder);
    }
}

function getGlobFiles(globPattern, options) {
    return new Promise((resolve, reject) => {
        glob(globPattern, options, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

Promise.all([
    getGlobFiles('./packages/node_modules/**/lib', { dot: true }),
    getGlobFiles('./packages/node_modules/**/doc', { dot: true }),
    getGlobFiles('./packages/node_modules/**/src/*.d.ts', { dit: true })
])
    .then(([folders, files]) => {
        files.forEach((file) => {
            console.log(`Deleting ${file}`);
            fs.unlinkSync(file);
        });

        folders.forEach((folder) => {
            console.log(`Deleting ${folder}`);
            deleteFolder(folder);
        });

        console.log(`Deleted ${folders.length} folders, and ${files.length} .d.ts-files`);
    });
