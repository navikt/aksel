import { migrations } from "./migrations";

type MigrationEntry = {
  name: string;
  description: string;
  warning?: string;
  ignoredExtensions: string[];
};

function migrationDocs() {
  let docs: string = "";

  const entries: Record<string, MigrationEntry[]> = {};

  for (const [version, migrationList] of Object.entries(migrations)) {
    const localDocs: MigrationEntry[] = [];

    for (const migration of migrationList) {
      localDocs.push({
        name: migration.value,
        description: migration.description,
        warning: migration.warning,
        ignoredExtensions: migration.ignoredExtensions,
      });
    }

    entries[version] = localDocs;
  }

  docs += `Aksel Codemods and Migration Guides\n\n`;
  docs += `How to use \`migration-scripts\` data:\n\n`;
  docs += `- Each key in the \`migration-scripts\` object represents a target Aksel version (e.g. v2 are scripts to migrate to major version "2.0").\n`;
  docs += `- Each entry in the array for a version includes the migration name (to be used in the migration command), a description of what the migration does, any warnings about potential breaking changes or manual steps needed, and a list of file extensions that the migration will ignore.\n\n`;

  docs += `How to run migrations: \n\n`;
  docs += `- To run a migration, use the command: \`npx @navikt/aksel codemod <migration-name>\` (or the equivalent pnpm/yarn commands). Replace <migration-name> with the name of the migration you want to run.\n`;
  docs += `- If you have \`@navikt/aksel\` installed locally, you can also run migrations with \`npm exec aksel codemod <migration-name>\`\n\n`;

  docs += `Available CLI args:`;
  docs += `
-e, --ext [extension]  default: js,ts,jsx,tsx,css,scss,less
-g, --glob [glob]      Globbing pattern, overrides --ext! Run with 'noglob' if using zsh-terminal.
-d, --dry-run          Dry run, no changes will be made
-p, --print            Print transformed files
-f, --force            Forcibly run migrations without checking git-changes
-h, --help             display help for command`;

  docs += `<migration-scripts>\n${JSON.stringify(entries, null, 2)}\n</migration-scripts>\n`;

  return docs;
}

export { migrationDocs };
