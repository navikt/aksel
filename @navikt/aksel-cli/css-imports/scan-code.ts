import path from "path";
import scanner from "react-scanner";

run();
async function run() {
  await scanCode();
}

async function scanCode() {
  const cwd = process.cwd();

  const config = {
    rootDir: cwd,
    crawlFrom: `${process.argv[2] ?? ""}`,

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

  await scanner
    .run({
      ...config,
      importedFrom: /@navikt\/ds-react/,
      processors: [
        "count-components",
        ({ report }) => {
          result = report;
        },
      ],
    })
    .catch(() => null);

  console.log(JSON.stringify(Object.keys(result)));
}
