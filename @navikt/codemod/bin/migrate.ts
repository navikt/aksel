import fs from "fs";
import path from "path";

import * as jscodeshift from "jscodeshift/src/Runner";
import chalk from "chalk";
import isGitClean from "is-git-clean";
import globby from "globby";

export interface MigrateOptions {
  dry?: boolean;
  print?: boolean;
  force?: boolean;
}

const migrationsMap = [
  {
    name: "v1/preset: Runs all codemods for beta to v1 migration",
    value: "v1/preset",
    path: "v1.0.0/preset",
  },
  {
    name: "v1/pagination: Fixes breaking API-changes from <Pagination /> component",
    value: "v1/pagination",
    path: "v1.0.0/pagination",
  },
  {
    name: "v1/tabs: Fixes breaking API-changes from <Tabs /> component",
    value: "v1/tabs",
    path: "v1.0.0/tabs",
  },
  {
    name: "v1/chat: Fixes breaking API-changes from <SpeechBubble /> (now <Chat/>) component",
    value: "v1/chat",
    path: "v1.0.0/chat",
  },
  {
    name: "v2/css: Fixes css-variables",
    value: "v2/css",
    path: "v2.0.0/update-css-tokens/update-css-tokens",
  },
  {
    name: "v2/js: Fixes js-variables",
    value: "v2/js",
    path: "v2.0.0/update-js-tokens/update-js-tokens",
  },
  {
    name: "v2/sass: Fixes sass-variables",
    value: "v2/sass",
    path: "v2.0.0/update-sass-tokens/update-sass-tokens",
  },
  {
    name: "v2/less: Fixes less-variables",
    value: "v2/less",
    path: "v2.0.0/update-less-tokens/update-less-tokens",
  },
  {
    name: "v2/tailwind: Fixes tailwind styling with tokens",
    value: "v2/tailwind",
    path: "v2.0.0/update-tailwind-tokens/update-tailwind-tokens",
  },
];

export async function migrate(
  migration: string,
  files: string,
  options: MigrateOptions = {}
) {
  const foundMigration = migrationsMap.find((x) => x.value === migration);
  const migrationFile = path.join(
    __dirname,
    `../transforms/${foundMigration.path}.js`
  );

  try {
    if (!fs.existsSync(migrationFile)) {
      throw new Error(`No migration found for ${migration}`);
    }

    if (!files) throw new Error(`No path provided for migration`);

    if (!options.dry) {
      checkGitStatus(options.force);
    }

    const filepaths = globby.sync(files, { cwd: process.cwd() });

    if (filepaths.length === 0) {
      throw new Error(`No files found for ${files}`);
    }

    // eslint-disable-next-line no-console
    console.log(chalk.green("Running migration:"), migration);

    await jscodeshift.run(migrationFile, filepaths, {
      babel: true,
      ignorePattern: [
        "**/node_modules/**",
        "**/.next/**",
        "**/build/**",
        "**/dist/**",
      ],
      extensions: "tsx,ts,jsx,js",
      parser: "tsx",
      verbose: 2,
      runInBand: true,
      silent: false,
      stdin: false,
      ...options,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export function checkGitStatus(force?: boolean) {
  let clean = false;
  let errorMessage = "Unable to determine if git directory is clean";
  try {
    clean = isGitClean.sync(process.cwd());
    errorMessage = "Git directory is not clean";
  } catch (err: any) {
    if (err && err.stderr && err.stderr.indexOf("Not a git repository") >= 0) {
      clean = true;
    }
  }

  if (!clean) {
    /* eslint-disable no-console */
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log("Thank you for using @navikt/ds-codemod!");
      console.log(
        chalk.yellow(
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
