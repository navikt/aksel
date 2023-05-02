import { Command } from "commander";
import fg from "fast-glob";
import * as jscodeshift from "jscodeshift/src/Runner";
import path from "path";
import { getMigrationPath } from "./migrations";
import chalk from "chalk";

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
  program: Command
) {
  const codemodPath = path.join(
    __dirname,
    `./transforms/${getMigrationPath(input)}.js`
  );

  console.log({
    paths: codemodPath,
    options,
  });

  const filepaths = fg.sync(getDefaultGlob(options?.ext), {
    cwd: process.cwd(),
    ignore: ignoreNodeModules,
  });

  console.log(filepaths);

  console.log("Running migration:", chalk.green("input"));

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
