import chalk from "chalk";
import { migrations } from "../migrations-config";

/**
 * Extracts `path` field for a given migration.
 */
export function getMigrationPath(migrationName: string) {
  return Object.values(migrations)
    .flat()
    .find((x) => x.value === migrationName)?.path;
}

/**
 * Extracts `warning` field for a given migration.
 */
export function getWarning(migrationName: string) {
  return Object.values(migrations)
    .flat()
    .find((x) => x.value === migrationName)?.warning;
}

/**
 * Extracts `ignoredExtensions` field for a given migration.
 */
export function getIgnoredFileExtensions(migrationName: string) {
  return (
    Object.values(migrations)
      .flat()
      .find((x) => x.value === migrationName)?.ignoredExtensions ?? []
  );
}

export function getMigrationNames() {
  return Object.values(migrations)
    .flat()
    .map((x) => x.value);
}

/**
 * Returns all available version keys from the migrations object.
 */
export function getVersionKeys(): string[] {
  return Object.keys(migrations);
}

/**
 * Returns the migrations available for a specific version.
 */
export function getMigrationsForVersion(version: string) {
  return migrations[version] ?? [];
}

/**
 * Returns the override migrations available for a specific version.
 */
function isOverrideVersion(
  version: string,
): version is keyof typeof migrationStringOverride {
  return version in migrationStringOverride;
}

export function getOverridesForVersion(version: string) {
  return isOverrideVersion(version) ? migrationStringOverride[version] : [];
}

/**
 * Allows injecting additional migration names that are not part of the main migrations-list.
 * This is used for interactive migrations that should not be part of the main list.
 *
 * We need to separate this since main migration list expect all migration names to have a unique path,
 * which is not the case for interactive migrations that are handled differently.
 */
export const migrationStringOverride = {
  v8: [
    {
      value: "v8-tokens",
      description: "Starts interactive token migration for v8",
    },
  ],
} as const satisfies Partial<
  Record<keyof typeof migrations, { value: string; description: string }[]>
>;

export function getMigrationString() {
  let str = "";

  Object.entries(migrations).forEach(([version, vMigrations]) => {
    str += `\n${chalk.underline(version)}\n`;

    const overrideMigrations = getOverridesForVersion(version);
    overrideMigrations.forEach((migration) => {
      str += `${chalk.blue(migration.value)}: ${migration.description}\n`;
    });

    vMigrations.forEach((migration) => {
      str += `${chalk.blue(migration.value)}: ${migration.description}\n`;
    });
  });

  str += `\n${chalk.bold(chalk.blueBright("Interactive version selection:"))}\n`;
  str += chalk.gray(
    "Run with a version key to interactively select migrations:\n",
  );
  str += chalk.blue(getVersionKeys().join(", "));

  return str;
}
