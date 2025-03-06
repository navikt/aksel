import Enquirer from "enquirer";
import fg from "fast-glob";
import { printRemaining } from "./tasks/print-remaining";
import { status } from "./tasks/status";

const ignoreNodeModules = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/lib/**",
  "**/.next/**",
];

export async function runTooling(options: {
  force: boolean;
  dryRun: boolean;
  print: boolean;
  glob: string;
  ext: string;
}) {
  const filepaths = fg.sync([options.glob ?? getDefaultGlob(options?.ext)], {
    cwd: process.cwd(),
    ignore: ignoreNodeModules,
  });

  /* await showStatus() */
  let task: Awaited<ReturnType<typeof getNextTask>>;

  status(filepaths);

  while (task !== "exit") {
    task = await getNextTask();

    if (task === "css-tokens") {
      /* run css migrations */
      /* show status */
      continue;
    }
    if (task === "scss-tokens") {
      /* run scss migrations */
      /* show status */
      continue;
    }
    if (task === "less-tokens") {
      /* run less migrations */
      /* show status */
      continue;
    }
    if (task === "js-tokens") {
      /* run js migrations */
      /* show status */
      continue;
    }
    if (task === "status") {
      status(filepaths);
      continue;
    }
    if (task === "print-remaining-tokens") {
      printRemaining(filepaths);
      continue;
    }

    if (task === "exit") {
      process.exit(1);
    }
  }

  /* OLD */
  // const codemodPath = path.join(
  //   __dirname,
  //   `./transforms/${getMigrationPath(input)}.js`,
  // );
  //

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

type TaskName =
  | "status"
  | "print-remaining-tokens"
  | "css-tokens"
  | "scss-tokens"
  | "less-tokens"
  | "js-tokens"
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
