import chalk from "chalk";
import { Command } from "commander";
import Enquirer from "enquirer";
import { getMigrationsForVersion, getVersionKeys } from "./migrations.js";
import { runCodeshift } from "./run-codeshift.js";
import { validateGit } from "./validation.js";

/**
 * Validates that the provided version key exists in the migrations object.
 */
function validateVersion(version: string, program: Command) {
  const versionKeys = getVersionKeys();

  if (!versionKeys.includes(version)) {
    program.error(
      chalk.red(
        `Version <${version}> not found!\n${chalk.gray(
          `\nAvailable versions:\n${versionKeys.map((v) => `  ${v}`).join("\n")}`,
        )}`,
      ),
    );
  }
}

/**
 * Runs interactive migration selection for a specific version.
 */
async function runVersionMigration(
  version: string,
  options: any,
  program: Command,
) {
  const availableMigrations = getMigrationsForVersion(version);

  if (availableMigrations.length === 0) {
    program.error(chalk.red(`No migrations found for version ${version}`));
  }

  console.info(
    chalk.greenBright.bold(`\nAvailable migrations for ${version}:\n`),
  );

  const response = await Enquirer.prompt<{ selectedMigrations: string[] }>({
    type: "multiselect",
    name: "selectedMigrations",
    message: `Select migrations to run for ${version}`,

    choices: availableMigrations.map((migration) => ({
      name: migration.value,
      message: `${chalk.blue(migration.value)}: ${chalk.gray(migration.description)}\n`,
      value: migration.value,
    })),
  });

  const { selectedMigrations } = response;

  if (selectedMigrations.length === 0) {
    console.info(chalk.yellow("\nNo migrations selected. Exiting."));
    return;
  }

  console.info(
    chalk.gray(
      `\nRunning ${selectedMigrations.length} migration(s): ${selectedMigrations.join(", ")}\n`,
    ),
  );

  validateGit(options, program);

  for (const migration of selectedMigrations) {
    console.info(chalk.blue(`\n\n--- Running: ${migration} ---`));
    await runCodeshift(migration, options, program);
  }

  console.info(chalk.greenBright.bold("\nAll selected migrations completed!"));
}

export { runVersionMigration, validateVersion };
