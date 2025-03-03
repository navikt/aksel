import chalk from "chalk";
import { Command } from "commander";
import Enquirer from "enquirer";
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

export const messages = new Map<
  string,
  {
    format: (input: any) => void;
    data: any;
  }
>();

export async function runTooling(
  input: string,
  options: any,
  program: Command,
) {
  await Enquirer.prompt(
    [
      {
        type: "select",
        name: "output",
        message: "Output format",
        initial: "print-clipboard",
        choices: [
          { message: "Clipboard & Print", name: "clipboard-print" },
          { message: "Clipboard", name: "clipboard" },
          { message: "Print", name: "print" },
        ],
      },
    ].map((x) => ({
      ...x,
      cancel: () => process.exit(1),
      header: `\n${chalk.gray(
        "Command 'css-imports' will not edit your files directly!",
      )}\n`,
    })),
  )
    .then((a) => {
      Object.entries(a).forEach(([key, value]) => {
        console.info(key, value);
      });
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.info(
          "Oops, something went wrong! Looks like @navikt/aksel-cli can't run in this terminal. Contact Aksel",
        );
      } else {
        console.error(error);
      }
    });

  // const codemodPath = path.join(
  //   __dirname,
  //   `./transforms/${getMigrationPath(input)}.js`,
  // );
  //
  // const filepaths = fg.sync([options.glob ?? getDefaultGlob(options?.ext)], {
  //   cwd: process.cwd(),
  //   ignore: ignoreNodeModules,
  // });
  //
  // console.info("\nRunning migration:", chalk.green("input"));
  //
  // options?.glob && console.info(`Using glob: ${chalk.green(options.glob)}\n`);
  //
  // const warning = getWarning(input);
  //
  // try {
  //   await jscodeshift.run(codemodPath, filepaths, {
  //     babel: true,
  //     ignorePattern: ignoreNodeModules,
  //     extensions: "tsx,ts,jsx,js",
  //     parser: "tsx",
  //     verbose: 2,
  //     runInBand: true,
  //     silent: false,
  //     stdin: false,
  //     dry: options?.dryRun,
  //     force: options?.force,
  //     print: options?.print,
  //   });
  //
  //   warning && console.info(`\n${chalk.yellow(warning)}\n`);
  //
  //   messages.forEach((value) => {
  //     value.format(value.data);
  //   });
  // } catch (error) {
  //   program.error(chalk.red("Error:", error.message));
  // }
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
