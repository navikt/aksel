import { execSync, spawnSync } from "child_process";
import FastGlob from "fast-glob";
import { rmSync } from "fs";

/**
 * This script is used to clean up build artifacts.
 * - Removes all node_modules folders if `--reset`-argv is passed
 */
const globPatterns = [
  "**/dist",
  "./@navikt/**/lib",
  "./@navikt/**/esm",
  "./@navikt/**/cjs",
  "./@navikt/aksel-icons/src",
  "**/playwright-report",
  "**/.next",
];

console.group("Cleaning up build artifacts");

for (const globPattern of globPatterns) {
  const folders = FastGlob.sync(globPattern, {
    dot: true,
    onlyDirectories: true,
    ignore: ["**/node_modules"],
  });
  folders.forEach((folder) => {
    console.info(`Deleting folder ${folder}`);
    rmSync(folder, { recursive: true });
  });
}

console.groupEnd();

if (!process.argv.includes("--reset")) {
  console.info(`\nCompleted dir cleanup, remember to run 'yarn boot'!`);
  process.exit(0);
}

if (process.platform === "win32") {
  const tasklist = execSync("tasklist").toString();
  const nodeCount = (tasklist.match(/node\.exe/g) || []).length;
  if (nodeCount > 1) {
    console.warn(
      `There are ${nodeCount} node.exe processes running. You might want to close them before trying to delete node_modules.`,
    );
  }
  spawnSync("pause", { shell: true, stdio: [0, 1, 2] });
}

console.group("Cleaning up node_modules. This may take a while...");

const nodeModulesFolders = FastGlob.sync("**/node_modules", {
  onlyDirectories: true,
  ignore: ["**/node_modules/**/node_modules"],
});

for (const folder of nodeModulesFolders) {
  console.info(`Deleting dir ${folder}`);
  rmSync(folder, { recursive: true });
}

console.groupEnd();
console.info(
  `\nCompleted dir cleanup, remember to run 'yarn install' & 'yarn boot'!`,
);
