import chalk from "chalk";
import { Command } from "commander";
import fg from "fast-glob";
import * as jscodeshift from "jscodeshift/src/Runner";
import path from "path";
import { GLOB_IGNORE_PATTERNS, getDefaultGlob } from "./codeshift.utils";
import { getMigrationPath, getWarning } from "./migrations";

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

  const filepaths = fg.sync([options.glob ?? getDefaultGlob(options?.ext)], {
    cwd: process.cwd(),
    ignore: GLOB_IGNORE_PATTERNS,
  });

  console.info("\nRunning migration:", chalk.green("input"));

  options?.glob && console.info(`Using glob: ${chalk.green(options.glob)}\n`);

  const warning = getWarning(input);

  try {
    await jscodeshift.run(codemodPath, filepaths, {
      babel: true,
      ignorePattern: ignoreNodeModules,
      extensions: "tsx,ts,jsx,js",
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
