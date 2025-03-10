import chalk from "chalk";
import { Command } from "commander";
import Enquirer from "enquirer";
import fg from "fast-glob";
import * as jscodeshift from "jscodeshift/src/Runner";
import path from "path";
import {
  GLOB_IGNORE_PATTERNS,
  getDefaultGlob,
} from "../codemod/codeshift.utils";
import { validateGit } from "../codemod/validation";
import { printRemaining } from "./tasks/print-remaining";
import { getStatus } from "./tasks/status";

// Types
type TaskName =
  | "status"
  | "print-remaining-tokens"
  | "css-tokens"
  | "scss-tokens"
  | "less-tokens"
  | "js-tokens"
  | "tailwind-tokens"
  | "run-all-migrations"
  | "exit";

type ToolingOptions = {
  force: boolean;
  dryRun: boolean;
  print: boolean;
  glob: string;
  ext: string;
};

type CodeshiftOptions = {
  dryRun: boolean;
  force: boolean;
};

// Constants
const TRANSFORMS: Record<string, string> = {
  "css-tokens": "./transforms/darkside-tokens-css",
  "scss-tokens": "./transforms/darkside-tokens-scss",
  "less-tokens": "./transforms/darkside-tokens-less",
  "js-tokens": "./transforms/darkside-tokens-js",
  "tailwind-tokens": "./transforms/darkside-tokens-tailwind",
};

const TASK_MENU = {
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
    { message: "Run all migrations", name: "run-all-migrations" },
    { message: "Exit", name: "exit" },
  ] as { message: string; name: TaskName }[],
};

/**
 * Main entry point for the tooling system
 */
export async function runTooling(
  options: ToolingOptions,
  program: Command,
): Promise<void> {
  // Find matching files based on glob pattern
  const filepaths = fg.sync([options.glob ?? getDefaultGlob(options?.ext)], {
    cwd: process.cwd(),
    ignore: GLOB_IGNORE_PATTERNS,
  });

  // Show initial status
  getStatus(filepaths);

  // Task execution loop
  let task: TaskName;
  while ((task = await getNextTask()) !== "exit") {
    console.info("\n");

    try {
      await executeTask(task, filepaths, options, program);
    } catch (error) {
      program.error(chalk.red("Error:", error.message));
    }
  }

  process.exit(0);
}

/**
 * Executes the selected task
 */
async function executeTask(
  task: TaskName,
  filepaths: string[],
  options: ToolingOptions,
  program: Command,
): Promise<void> {
  switch (task) {
    case "status":
      getStatus(filepaths);
      break;

    case "print-remaining-tokens":
      printRemaining(filepaths);
      break;

    case "css-tokens":
    case "scss-tokens":
    case "less-tokens":
    case "js-tokens":
    case "tailwind-tokens": {
      const updatedStatus = getStatus(filepaths, "no-print").status;
      const scopedFiles = getScopedFilesForTask(task, filepaths, updatedStatus);

      await runCodeshift(task, scopedFiles, {
        dryRun: options.dryRun,
        force: options.force,
      });
      break;
    }
    case "run-all-migrations": {
      const tasks = [
        "css-tokens",
        "scss-tokens",
        "less-tokens",
        "js-tokens",
        "tailwind-tokens",
      ] as const;
      for (const migrationTask of tasks) {
        if (!options.force) {
          validateGit(options, program);
        }

        console.info(`\nRunning ${migrationTask}...`);
        await runCodeshift(migrationTask, filepaths, {
          dryRun: options.dryRun,
          force: true,
        });
      }
      break;
    }

    default:
      program.error(chalk.red(`Unknown task: ${task}`));
  }
}

/**
 * Filter files based on the selected task
 */
function getScopedFilesForTask(
  task: TaskName,
  filepaths: string[],
  status: any,
): string[] {
  return filepaths.filter((f) => {
    switch (task) {
      case "css-tokens":
        return !!status.css.legacy.find((config) => config.fileName === f);
      case "scss-tokens":
        return !!status.scss.legacy.find((config) => config.fileName === f);
      case "less-tokens":
        return !!status.less.legacy.find((config) => config.fileName === f);
      case "js-tokens":
        return !!status.js.legacy.find((config) => config.fileName === f);
      case "tailwind-tokens":
        return !!status.tailwind.legacy.find((config) => config.fileName === f);
      default:
        return false;
    }
  });
}

/**
 * Runs the jscodeshift codemod for the selected task
 */
async function runCodeshift(
  task: TaskName,
  filepaths: string[],
  options: CodeshiftOptions,
): Promise<void> {
  if (!TRANSFORMS[task]) {
    throw new Error(`No transform found for task: ${task}`);
  }

  const codemodPath = path.join(__dirname, `${TRANSFORMS[task]}.js`);

  await jscodeshift.run(codemodPath, filepaths, {
    babel: true,
    ignorePattern: GLOB_IGNORE_PATTERNS,
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

/**
 * Prompts the user for the next task to run
 */
async function getNextTask(): Promise<TaskName> {
  try {
    const response = await Enquirer.prompt([
      {
        ...TASK_MENU,
        onCancel: () => process.exit(1),
      },
    ]);
    return (response as { task: TaskName }).task;
  } catch (error) {
    if (error.isTtyError) {
      console.info(
        "Oops, something went wrong! Looks like @navikt/aksel can't run in this terminal. " +
          "Contact Aksel for support if this persists, or try another terminal.",
      );
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}
