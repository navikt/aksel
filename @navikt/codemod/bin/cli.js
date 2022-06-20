"use strict";
/**
 * Copyright 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// Based on https://github.com/reactjs/react-codemod/blob/dd8671c9a470a2c342b221ec903c574cf31e9f57/bin/cli.js
// @next/codemod optional-name-of-transform optional/path/to/src [...options]
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.run =
  exports.runTransform =
  exports.checkGitStatus =
  exports.transformerDirectory =
  exports.jscodeshiftExecutable =
    void 0;
const globby_1 = __importDefault(require("globby"));
const inquirer_1 = __importDefault(require("inquirer"));
const meow_1 = __importDefault(require("meow"));
const path_1 = __importDefault(require("path"));
const execa_1 = __importDefault(require("execa"));
const chalk_1 = __importDefault(require("chalk"));
const is_git_clean_1 = __importDefault(require("is-git-clean"));
exports.jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
exports.transformerDirectory = path_1.default.join(
  __dirname,
  "../",
  "transforms"
);
function checkGitStatus(force) {
  let clean = false;
  let errorMessage = "Unable to determine if git directory is clean";
  try {
    clean = is_git_clean_1.default.sync(process.cwd());
    errorMessage = "Git directory is not clean";
  } catch (err) {
    if (err && err.stderr && err.stderr.indexOf("Not a git repository") >= 0) {
      clean = true;
    }
  }
  if (!clean) {
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log("Thank you for using @@navikt/ds-codemod");
      console.log(
        chalk_1.default.yellow(
          "\nBut before we continue, please stash or commit your git changes."
        )
      );
      console.log(
        "\nYou may use the --force flag to override this safety check."
      );
      process.exit(1);
    }
  }
}
exports.checkGitStatus = checkGitStatus;
function runTransform({ files, flags, transformer }) {
  const transformerPath = path_1.default.join(
    exports.transformerDirectory,
    `${transformer}.js`
  );
  let args = [];
  const { dry, print, runInBand } = flags;
  if (dry) {
    args.push("--dry");
  }
  if (print) {
    args.push("--print");
  }
  if (runInBand) {
    args.push("--run-in-band");
  }
  args.push("--verbose=2");
  args.push("--ignore-pattern=**/node_modules/**");
  args.push("--extensions=tsx,ts,jsx,js");
  args.push("--parser=tsx");
  args = args.concat(["--transform", transformerPath]);
  if (flags.jscodeshift) {
    args = args.concat(flags.jscodeshift);
  }
  args = args.concat(files);
  console.log(`Executing command: jscodeshift ${args.join(" ")}`);
  const result = execa_1.default.sync(exports.jscodeshiftExecutable, args, {
    stdio: "inherit",
    stripFinalNewline: false,
  });
  if (result.failed) {
    throw new Error(`jscodeshift exited with code ${result.exitCode}`);
  }
}
exports.runTransform = runTransform;
const TRANSFORMER_INQUIRER_CHOICES = [
  {
    name: "v1-chat: Fixes breaking API-changes to <SpeechBubble /> (now <Chat/>) component",
    value: "v1-chat",
  },
];
function expandFilePathsIfNeeded(filesBeforeExpansion) {
  const shouldExpandFiles = filesBeforeExpansion.some((file) =>
    file.includes("*")
  );
  return shouldExpandFiles
    ? globby_1.default.sync(filesBeforeExpansion)
    : filesBeforeExpansion;
}
function run() {
  const cli = meow_1.default({
    description: "Codemods for updating @navikt/ds-* packages",
    help: `
    Usage
      $ npx @navikt/codemod <transform> <path> <...options>
        transform    One of the choices from <link-here>
        path         Files or directory to transform. Can be a glob like pages/**.js
    Options
      --force            Bypass Git safety checks and forcibly run codemods
      --dry              Dry run (no changes are made to files)
      --print            Print transformed files to your terminal
      --jscodeshift  (Advanced) Pass options directly to jscodeshift
    `,
    flags: {
      boolean: ["force", "dry", "print", "help"],
      string: ["_"],
      alias: {
        h: "help",
      },
    },
  });
  if (!cli.flags.dry) {
    checkGitStatus(cli.flags.force);
  }
  if (
    cli.input[0] &&
    !TRANSFORMER_INQUIRER_CHOICES.find((x) => x.value === cli.input[0])
  ) {
    console.error("Invalid transform choice, pick one of:");
    console.error(
      TRANSFORMER_INQUIRER_CHOICES.map((x) => "- " + x.value).join("\n")
    );
    process.exit(1);
  }
  inquirer_1.default
    .prompt([
      {
        type: "input",
        name: "files",
        message: "On which files or directory should the codemods be applied?",
        when: !cli.input[1],
        default: ".",
        // validate: () =>
        filter: (files) => files.trim(),
      },
      {
        type: "list",
        name: "transformer",
        message: "Which transform would you like to apply?",
        when: !cli.input[0],
        pageSize: TRANSFORMER_INQUIRER_CHOICES.length,
        choices: TRANSFORMER_INQUIRER_CHOICES,
      },
    ])
    .then((answers) => {
      const { files, transformer } = answers;
      const filesBeforeExpansion = cli.input[1] || files;
      const filesExpanded = expandFilePathsIfNeeded([filesBeforeExpansion]);
      const selectedTransformer = cli.input[0] || transformer;
      if (!filesExpanded.length) {
        console.log(
          `No files found matching ${filesBeforeExpansion.join(" ")}`
        );
        return null;
      }
      return runTransform({
        files: filesExpanded,
        flags: cli.flags,
        transformer: selectedTransformer,
      });
    });
}
exports.run = run;
//# sourceMappingURL=cli.js.map
