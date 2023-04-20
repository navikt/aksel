import path from "path";
import scanner from "react-scanner";

export async function scanCode() {
  const cwd = process.cwd();
  const config = {
    rootDir: cwd,
    crawlFrom: cwd,
    globs: ["**/!(*.test|*.spec|*.stories|*.story).@(jsx|tsx)"],
    exclude: (dirname: string) => dirname === "node_modules",
    getComponentName: ({
      imported,
      moduleName,
    }: {
      imported: string;
      moduleName: string;
    }) => imported || path.basename(moduleName),
  };

  let result: any | null = null;

  await scanner.run({
    ...config,
    importedFrom: /@navikt\/ds-react/,
    processors: [
      "count-components",
      ({ report }) => {
        result = report;
      },
    ],
  });

  Object.keys(result).length > 0
    ? console.log(`\nFound components!\n${Object.keys(result).join(", ")}\n`)
    : console.log(`\nNo components found!\n`);

  return Object.keys(result);
}
