import chalk from "chalk";
import { Command } from "commander";
import fg from "fast-glob";
import * as jscodeshift from "jscodeshift/src/Runner";
import path from "node:path";
import { GLOB_IGNORE_PATTERNS, getDefaultGlob } from "./codeshift.utils";
import {
  getIgnoredFileExtensions,
  getMigrationPath,
  getWarning,
} from "./migrations";

const ignoreNodeModules = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/lib/**",
  "**/.next/**",
];

export async function runCodeshift(
  input: string,
  options: any,
  program: Command,
) {
  const codemodPath = path.join(
    __dirname,
    `./transforms/${getMigrationPath(input)}.js`,
  );

  console.info("\nRunning migration:", chalk.green(input));

  const globList = options.glob ?? getDefaultGlob(options?.ext);

  console.info(
    chalk.gray(
      `Using glob pattern(s): ${globList}\nWorking directory: ${process.cwd()}\n`,
    ),
  );

  const filepaths = fg.sync(globList, {
    cwd: process.cwd(),
    ignore: GLOB_IGNORE_PATTERNS,
    /**
     * When globbing, do not follow symlinks to avoid processing files outside the directory.
     * This is most likely to happen in monorepos where node_modules may contain symlinks to packages
     * in other parts of the repo.
     *
     * While node_modules is already ignored via GLOB_IGNORE_PATTERNS, if user globs upwards (e.g., using '../src/**'),
     * that ignore-pattern may be ignored, leading to unintended file processing.
     */
    followSymbolicLinks: false,
  });

  const warning = getWarning(input);

  const unsafeExtensions = getIgnoredFileExtensions(input);

  let safeFilepaths = filepaths;

  if (unsafeExtensions.length > 0) {
    safeFilepaths = filepaths.filter(
      (f) => !unsafeExtensions.some((ext) => f.endsWith(`.${ext}`)),
    );
  }

  try {
    await jscodeshift.run(codemodPath, safeFilepaths, {
      babel: true,
      ignorePattern: ignoreNodeModules,
      parser: "tsx",
      verbose: 2,
      runInBand: true,
      silent: false,
      stdin: false,
      dry: options?.dryRun,
      force: options?.force,
      print: options?.print,
    });

    warning && console.info(`\n${chalk.yellow(warning)}\n`);
  } catch (error) {
    program.error(chalk.red("Error:", error.message));
  }
}
