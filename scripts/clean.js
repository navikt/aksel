const path = require("path");
const fs = require("fs");
const fastglob = require("fast-glob");

function deleteFolder(folder) {
  if (!fs.existsSync(folder)) {
    throw new Error(`path: ${folder} does not exist`);
  }
  if (!fs.lstatSync(folder).isDirectory()) {
    throw new Error(`path: ${folder} is not a directory`);
  }
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

function clean() {
  const globPatterns = [
    "./@navikt/**/dist",
    "./@navikt/**/lib",
    "./@navikt/**/esm",
    "./@navikt/**/cjs",
    "./@navikt/aksel-icons/src",
  ];
  let deletedFoldersCount = 0;

  for (const globPattern of globPatterns) {
    const folders = fastglob.sync(globPattern, {
      dot: true,
      onlyDirectories: true,
    });
    folders
      .filter((folder) => !folder.includes("node_modules"))
      .forEach((folder) => {
        console.info(`Deleting folder ${folder}`);
        deleteFolder(folder);
        deletedFoldersCount++;
      });
  }

  console.info(`Deleted ${deletedFoldersCount} folders`);
}

clean();
