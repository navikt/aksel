const path = require("path");
const fs = require("fs");
const glob = require("glob");

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
  getGlobFiles("./@navikt/**/dist", { dot: true }),
  getGlobFiles("./@navikt/**/lib", { dot: true }),
  getGlobFiles("./@navikt/**/esm", { dot: true }),
  getGlobFiles("./@navikt/**/cjs", { dot: true }),
  getGlobFiles("./@navikt/icons/src", { dot: true }),
]).then(([dist, libvnext, esmvnext, cjsvnext, iconsrc]) => {
  const folders = [
    ...dist,
    ...libvnext,
    ...esmvnext,
    ...cjsvnext,
    ...iconsrc,
  ].filter((path) => !path.includes("node_modules"));

  folders.forEach((folder) => {
    console.log(`Deleting folder ${folder}`);
    deleteFolder(folder);
  });

  console.log(`Deleted ${folders.length} folders`);
});
