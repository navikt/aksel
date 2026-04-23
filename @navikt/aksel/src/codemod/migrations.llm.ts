import { migrations } from "./migrations";

type MigrationEntry = {
  name: string;
  version: string;
  description: string;
  npmCommand: string;
  pnpmCommand: string;
  yarnCommand: string;
  warning?: string;
  ignoredExtensions: string[];
};

function migrationDocs() {
  const docs: MigrationEntry[] = [];
  for (const [version, migrationList] of Object.entries(migrations)) {
    for (const migration of migrationList) {
      docs.push({
        name: migration.value,
        version,
        description: migration.description,
        npmCommand: `npx aksel-migrate ${migration.value}`,
        pnpmCommand: `pnpm dlx aksel-migrate ${migration.value}`,
        yarnCommand: `yarn dlx aksel-migrate ${migration.value}`,
        warning: migration.warning,
        ignoredExtensions: migration.ignoredExtensions,
      });
    }
  }

  return docs;
}

export { migrationDocs };
