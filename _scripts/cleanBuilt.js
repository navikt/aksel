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

glob('./packages/node_modules/**/lib', { dot: true }, (err, folders) => {
    folders.forEach((folder) => {
        console.log(`Deleting ${folder}`);
        deleteFolder(folder);
    });
});
