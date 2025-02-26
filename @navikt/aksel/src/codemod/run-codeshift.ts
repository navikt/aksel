import chalk from "chalk";
import { Command } from "commander";
import fg from "fast-glob";
import * as jscodeshift from "jscodeshift/src/Runner";
import path from "path";
import { getMigrationPath, getWarning } from "./migrations";

const ignoreNodeModules = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/lib/**",
  "**/.next/**",
];

export const messages = new Map<string, string[]>();

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
    ignore: ignoreNodeModules,
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

    messages.forEach((value, key) => {
      console.info(chalk.green(`\n${key}:`));
      value.forEach((message) => console.info(`- ${message}`));
    });
  } catch (error) {
    program.error(chalk.red("Error:", error.message));
  }
}

function getDefaultGlob(ext: string): string {
  const defaultExt = "js,ts,jsx,tsx,css,scss,less";
  return `**/*.{${cleanExtensions(ext ?? defaultExt).join(",")}}`;
}

function cleanExtensions(ext: string): string[] {
  return ext
    .split(",")
    .map((e) => e.trim())
    .map((e) => e.replace(".", ""));
}
