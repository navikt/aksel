import { getDirectories } from "./parts/get-directories";
import { parseCodeFiles } from "./parts/parse-code-files";
import { validateExamples } from "./parts/validate-examples";
import { RootDirectoriesT, rootDirectories } from "./types";

(async function () {
  let error = false;
  for (const directory of rootDirectories) {
    if (!(await validate(directory))) {
      error = true;
    } else {
      console.info("Everything Is A-OK\n");
    }
  }
  if (error) {
    throw new Error("TypeScript errors found, see above.");
  }
})();

export async function validate(directory: RootDirectoriesT) {
  console.info(`\n*** Checking '${directory}' ***\n`);
  const folders = getDirectories(directory);
  const exampleData = await Promise.all(
    folders.map(async (folder) => ({
      title: folder.path,
      filer: await parseCodeFiles(folder.path, directory),
    })),
  );

  return validateExamples(exampleData);
}
