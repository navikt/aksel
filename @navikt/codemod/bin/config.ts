const createCLIConfig = (config: any) => config;

export const cliConfig = createCLIConfig({
  description: "Migrations for NAV designsystem solutions",
  args: [
    {
      name: "migration",
      description:
        "One of the choices from https://github.com/navikt/Designsystemet/blob/main/%40navikt/codemod/README.md",
    },
    {
      name: "path",
      description:
        "Files or directory to transform. Can be a glob like src/**.css",
    },
  ],
  flags: {
    dry: {
      alias: "d",
      description: "Dry run, no changes will be made to files",
      type: "boolean",
    },
    print: {
      alias: "p",
      description: "Print transformed files",
      type: "boolean",
    },
    force: {
      alias: "f",
      description: "Forcibly run migrations without checking git-changes",
      type: "boolean",
    },
  },
});

export const DS_MIGRATION_COMMENT =
  "ds-codemod: Unable to migrate the following expression. Please upgrade manually.";
