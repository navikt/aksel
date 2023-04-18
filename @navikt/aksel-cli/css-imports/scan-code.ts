import path from "path";
import scanner from "react-scanner";

export async function scanCode() {
  const config = {
    rootDir: ".",
    crawlFrom: "../",
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

  return Object.keys(result);
}
