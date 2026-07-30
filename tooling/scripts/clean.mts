import { execFileSync, spawnSync } from "node:child_process";
import { globSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * This script is used to clean up build artifacts.
 * - Removes all node_modules folders if `--reset` is passed
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

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const isReset = process.argv.includes("--reset");
const isDryRun = process.argv.includes("--dry-run");

function removeMatches(
  patterns: string[],
  label: string,
  exclude: string[] = ["**/node_modules"],
) {
  console.group(label);

  for (const globPattern of patterns) {
    const dirsAndFiles = globSync(globPattern, {
      cwd: repositoryRoot,
      exclude,
    });

    for (const name of dirsAndFiles.toSorted((a, b) => b.length - a.length)) {
      console.info(`${isDryRun ? "Would delete" : "Deleting"} ${name}`);

      if (!isDryRun) {
        rmSync(resolve(repositoryRoot, name), { force: true, recursive: true });
      }
    }
  }

  console.groupEnd();
}

removeMatches(globPatterns, "Cleaning up build artifacts");

if (!isReset) {
  console.info(`\nCompleted dir cleanup, remember to run 'yarn boot'!`);
} else {
  if (process.platform === "win32") {
    const tasklist = execFileSync("tasklist", { encoding: "utf8" });
    const nodeCount = (tasklist.match(/node\.exe/gi) || []).length;

    if (nodeCount > 2) {
      console.warn(
        `There are ${nodeCount - 2} other node.exe processes running. You might want to close them before trying to delete node_modules.`,
      );
      spawnSync("pause", { shell: true, stdio: [0, 1, 2] });
    }
  }

  removeMatches(
    ["**/node_modules"],
    "Cleaning up node_modules. This may take a while...",
    ["**/node_modules/**/node_modules"],
  );

  console.info(
    `\nCompleted dir cleanup, remember to run 'yarn install' & 'yarn boot'!`,
  );
}
