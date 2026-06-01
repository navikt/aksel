import { execSync, spawnSync } from "node:child_process";
import { globSync } from "node:fs";
import { rmSync } from "node:fs";

/**
 * This script is used to clean up build artifacts.
 * - Removes all node_modules folders if `--reset`-argv is passed
 */
const globPatterns = [
  "**/dist",
  "**/*.tsbuildinfo",
  "./@navikt/**/lib",
  "./@navikt/**/esm",
  "./@navikt/**/cjs",
  "./@navikt/aksel-icons/src",
  "**/playwright-report",
  "./aksel.nav.no/website/.next",
];

console.group("Cleaning up build artifacts");

for (const globPattern of globPatterns) {
  const dirsAndFiles = globSync(globPattern, {
    exclude: ["**/node_modules"],
  });
  dirsAndFiles
    /* Longest names first, so that nested dirs are removed bottom-up */
    .toSorted((a, b) => b.length - a.length)
    .forEach((name) => {
      console.info(`Deleting ${name}`);
      rmSync(name, { recursive: true });
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
  if (nodeCount > 2) {
    console.warn(
      `There are ${nodeCount - 2} other node.exe processes running. You might want to close them before trying to delete node_modules.`,
    );
    spawnSync("pause", { shell: true, stdio: [0, 1, 2] });
  }
}

console.group("Cleaning up node_modules. This may take a while...");

const nodeModulesFolders = globSync("**/node_modules", {
  exclude: ["**/node_modules/**/node_modules"], // Ignore nested node_modules
});

for (const folder of nodeModulesFolders) {
  console.info(`Deleting dir ${folder}`);
  rmSync(folder, { recursive: true });
}

console.groupEnd();
console.info(
  `\nCompleted dir cleanup, remember to run 'yarn install' & 'yarn boot'!`,
);
