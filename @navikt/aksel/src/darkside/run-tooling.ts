import chalk from "chalk";
import { Command } from "commander";
import Enquirer from "enquirer";
import fg from "fast-glob";
import * as jscodeshift from "jscodeshift/src/Runner";
import path from "node:path";
import {
  GLOB_IGNORE_PATTERNS,
  SupportedCodemodExtensions,
  getDefaultGlob,
} from "../codemod/codeshift.utils";
import { validateGit } from "../codemod/validation";
import { TokenStatus } from "./config/TokenStatus";
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

/**
 * Main entry point for the tooling system
 */
export async function runTooling(
  options: ToolingOptions,
  program: Command,
): Promise<void> {
  console.info(
    chalk.greenBright.bold("\nWelcome to the Aksel v8 token migration tool!"),
  );

  const globList = [options.glob ?? getDefaultGlob(options?.ext)];

  console.info(
    chalk.gray(
      `Using glob pattern(s): ${globList.join(", ")}\nWorking directory: ${process.cwd()}\n`,
    ),
  );

  // Find matching files based on glob pattern
  const filepaths = await fg(globList, {
    cwd: process.cwd(),
    ignore: GLOB_IGNORE_PATTERNS,
    followSymbolicLinks: false,
  });

  if (options.dryRun) {
    console.info(
      chalk.yellow("Running in dry-run mode, no changes will be made"),
    );
  }

  // Show initial status
  const initialStatus = getStatus(filepaths);

  // Task execution loop
  let task: TaskName = await getNextTask(initialStatus.status);
  let currentStatus = initialStatus;

  while (task !== "exit") {
    console.info("\n\n");

    try {
      await executeTask(task, filepaths, options, program, currentStatus);
    } catch (error) {
      program.error(chalk.red("Error:", error.message));
    }

    // Only re-scan if we actually ran a migration
    if (task !== "status" && task !== "print-remaining-tokens") {
      currentStatus = getStatus(filepaths, "no-print");
    }

    task = await getNextTask(currentStatus.status);
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
  statusStore: TokenStatus,
): Promise<void> {
  switch (task) {
    case "status":
      getStatus(filepaths);
      break;

    case "print-remaining-tokens":
      await printRemaining(filepaths, statusStore.status);
      break;

    case "css-tokens":
    case "scss-tokens":
    case "less-tokens":
    case "js-tokens":
    case "tailwind-tokens": {
      if (!options.force) {
        validateGit(options, program);
      }
      const scopedFiles = getScopedFilesForTask(
        task,
        filepaths,
        statusStore.status,
      );

      await runCodeshift(task, scopedFiles, {
        dryRun: options.dryRun,
        force: options.force,
      });

      console.info(chalk.green(`\n✅ ${task} complete!`));
      console.info(`Processed ${scopedFiles.length} files.`);
      await waitForKeyPress();
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

      if (!options.force) {
        validateGit(options, program);
      }

      for (const migrationTask of tasks) {
        console.info(`\nRunning ${migrationTask}...`);
        await runCodeshift(migrationTask, filepaths, {
          dryRun: options.dryRun,
          force: true,
        });
      }

      console.info(chalk.green(`\n✅ All migrations complete!`));
      await waitForKeyPress();
      break;
    }

    default:
      program.error(chalk.red(`Unknown task: ${task}`));
  }
}

async function waitForKeyPress() {
  await Enquirer.prompt({
    type: "input",
    name: "key",
    message: "Press Enter to return to menu...",
  });
}

const JS_EXTENSIONS = [
  "js",
  "jsx",
  "ts",
  "tsx",
] satisfies SupportedCodemodExtensions[];

/**
 * Filter files based on the selected task
 */
function getScopedFilesForTask(
  task: TaskName,
  filepaths: string[],
  status: any,
): string[] {
  let safeFilepaths = filepaths;

  if (task === "js-tokens") {
    safeFilepaths = filepaths.filter((f) =>
      JS_EXTENSIONS.some((ext) => f.endsWith(`.${ext}`)),
    );
  }

  return safeFilepaths.filter((f) => {
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
async function getNextTask(status?: any): Promise<TaskName> {
  const getMessage = (base: string, tokens: any[]) => {
    if (!status) return base;
    const fileCount = new Set(tokens.map((t) => t.fileName)).size;
    if (fileCount === 0) return `${base} (Done)`;
    return `${base} (${fileCount} files)`;
  };

  const choices = [
    { message: "Check status", name: "status" },
    { message: "Print status", name: "print-remaining-tokens" },
    {
      message: getMessage("Migrate CSS tokens", status?.css?.legacy ?? []),
      name: "css-tokens",
    },
    {
      message: getMessage("Migrate Scss tokens", status?.scss?.legacy ?? []),
      name: "scss-tokens",
    },
    {
      message: getMessage("Migrate Less tokens", status?.less?.legacy ?? []),
      name: "less-tokens",
    },
    {
      message: getMessage("Migrate JS tokens", status?.js?.legacy ?? []),
      name: "js-tokens",
    },
    {
      message: getMessage(
        "Migrate tailwind tokens",
        status?.tailwind?.legacy ?? [],
      ),
      name: "tailwind-tokens",
    },
    { message: "Run all migrations", name: "run-all-migrations" },
    { message: "Exit", name: "exit" },
  ] as { message: string; name: TaskName }[];

  try {
    const response = await Enquirer.prompt<{ task: TaskName }>({
      type: "select",
      name: "task",
      message: "Task",
      initial: "status",
      choices,
      onCancel: () => process.exit(1),
    } as any);
    return response.task;
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
