import chalk from "chalk";
import { Command } from "commander";
import Enquirer from "enquirer";
import fg from "fast-glob";
import * as jscodeshift from "jscodeshift/src/Runner";
import path from "path";
import { printRemaining } from "./tasks/print-remaining";
import { getStatus } from "./tasks/status";

const ignoreNodeModules = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/lib/**",
  "**/.next/**",
];

type TaskT = Awaited<ReturnType<typeof getNextTask>>;

export async function runTooling(
  options: {
    force: boolean;
    dryRun: boolean;
    print: boolean;
    glob: string;
    ext: string;
  },
  program: Command,
) {
  const filepaths = fg.sync([options.glob ?? getDefaultGlob(options?.ext)], {
    cwd: process.cwd(),
    ignore: ignoreNodeModules,
  });

  /* await showStatus() */
  let task: TaskT;

  getStatus(filepaths);

  while (task !== "exit") {
    console.info("\n");
    task = await getNextTask();

    if (task === "status") {
      getStatus(filepaths);
      continue;
    }

    if (task === "print-remaining-tokens") {
      printRemaining(filepaths);
      continue;
    }

    if (task === "exit") {
      process.exit(1);
    }

    try {
      const updatedStatus = getStatus(filepaths, "no-print").status;

      const scopedFiles = filepaths.filter((f) => {
        switch (task) {
          case "css-tokens":
            return !!updatedStatus.css.legacy.find(
              (config) => config.fileName === f,
            );
          case "scss-tokens":
            return !!updatedStatus.scss.legacy.find(
              (config) => config.fileName === f,
            );
          case "less-tokens":
            return !!updatedStatus.less.legacy.find(
              (config) => config.fileName === f,
            );
          case "js-tokens":
            return !!updatedStatus.js.legacy.find(
              (config) => config.fileName === f,
            );
          case "tailwind-tokens":
            return !!updatedStatus.tailwind.legacy.find(
              (config) => config.fileName === f,
            );
          default:
            return false;
        }
      });

      await runCodeshift(task, scopedFiles, {
        dryRun: options.dryRun,
        force: options.force,
      });
    } catch (error) {
      program.error(chalk.red("Error:", error.message));
    }
  }
}

const transforms = {
  "css-tokens": "./transforms/darkside-tokens-css",
  "scss-tokens": "./transforms/darkside-tokens-scss",
  "less-tokens": "./transforms/darkside-tokens-less",
  "js-tokens": "./transforms/darkside-tokens-js",
  tailwind: "./transforms/darkside-tokens-tailwind",
} as const;

async function runCodeshift(
  task: TaskT,
  filepaths: string[],
  options: { dryRun: boolean; force: boolean },
) {
  const codemodPath = path.join(__dirname, `${transforms[task]}.js`);

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
    print: false,
  });
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

type TaskName =
  | "status"
  | "print-remaining-tokens"
  | "css-tokens"
  | "scss-tokens"
  | "less-tokens"
  | "js-tokens"
  | "tailwind-tokens"
  | "exit";

const taskQuestion = {
  type: "select",
  name: "task",
  message: "Task",
  initial: "status",
  choices: [
    { message: "Update status", name: "status" },
    { message: "Print remaining tokens", name: "print-remaining-tokens" },
    { message: "Migrate CSS tokens", name: "css-tokens" },
    { message: "Migrate Scss tokens", name: "scss-tokens" },
    { message: "Migrate Less tokens", name: "less-tokens" },
    { message: "Migrate JS tokens", name: "js-tokens" },
    { message: "Migrate tailwind tokens", name: "tailwind-tokens" },
    { message: "Exit", name: "exit" },
  ] satisfies { message: string; name: TaskName }[],
} as const;

async function getNextTask() {
  let task: TaskName;
  await Enquirer.prompt(
    [taskQuestion].map((x) => ({
      ...x,
      cancel: () => process.exit(1),
    })),
  )
    .then((a: { task: TaskName }) => {
      task = a.task;
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.info(
          "Oops, something went wrong! Looks like @navikt/aksel can't run in this terminal. Contact Aksel for support if this persists, or try another terminal.",
        );
      } else {
        console.error(error);
      }
      process.exit(1);
    });

  return task;
}
