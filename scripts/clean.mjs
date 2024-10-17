import FastGlob from "fast-glob";
import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync } from "fs";
import { join } from "path";

/**
 * This script is used to clean up build artifacts.
 * - Removes all node_modules folders if `--reset`-argv is passed
 */
const globPatterns = [
  "./@navikt/**/lib",
  "./@navikt/**/esm",
  "./@navikt/**/cjs",
  "./@navikt/aksel-icons/src",
  "**/playwright-report",
  "**/.next",
  "**/dist",
];

console.group("Cleaning up build artifacts");

for (const globPattern of globPatterns) {
  const folders = FastGlob.sync(globPattern, {
    dot: true,
    onlyDirectories: true,
    ignore: ["**/node_modules"],
  });
  folders
    .filter((folder) => !folder.includes("node_modules"))
    .forEach((folder) => {
      console.info(`Deleting folder ${folder}`);
      deleteFolder(folder);
    });
}

console.info(`Everything looks squeaky clean 🧼`);

console.groupEnd();

if (!process.argv.includes("--reset")) {
  console.info(`\nCompleted dir cleanup, remember to run 'yarn boot'!`);
  process.exit(0);
}

console.group("Cleaning up node_modules. This may take a while...");

const nodeModulesFolders = FastGlob.sync("**/node_modules", {
  onlyDirectories: true,
}).filter((dir) => {
  // Avoid deleting nested node_modules
  return !dir.match(/node_modules\/.*\/node_modules/);
});

for (const folder of nodeModulesFolders) {
  console.info(`Deleting dir ${folder}`);
  deleteFolder(folder);
}

console.groupEnd();
console.info(
  `\nCompleted dir cleanup, remember to run 'yarn install' & 'yarn boot'!`,
);

function deleteFolder(folder) {
  if (!existsSync(folder)) {
    throw new Error(`path: ${folder} does not exist`);
  }
  if (!lstatSync(folder).isDirectory()) {
    throw new Error(`path: ${folder} is not a directory`);
  }
  readdirSync(folder).forEach((file) => {
    const currentPath = join(folder, file);
    if (lstatSync(currentPath).isDirectory()) {
      deleteFolder(currentPath);
    } else {
      unlinkSync(currentPath);
    }
  });
  rmdirSync(folder);
}
