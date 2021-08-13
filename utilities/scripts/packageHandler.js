const path = require("path");
const fse = require("fs-extra");
const glob = require("fast-glob");

/**
 * https://github.com/mui-org/material-ui/blob/next/scripts/copy-files.js
 */
const createPackages = async () => {
  const source = "./src";
  const buildDir = "./cjs";

  const packageIndexes = glob
    .sync("**/index.{ts,tsx}", { cwd: source })
    .map(path.dirname);

  await Promise.all(
    packageIndexes.map(async (directoryPackage) => {
      const packageJsonPath = path.join(
        buildDir,
        directoryPackage,
        "package.json"
      );

      const packageJson = {
        sideEffects: false,
        main: "./index.js",
        module: path.posix.join("../esm", directoryPackage, "index.js"),
        types: path.posix.join("../esm", directoryPackage, "index.d.ts"),
      };

      const [
        typingsEntryExist,
        moduleEntryExists,
        mainEntryExists,
      ] = await Promise.all([
        fse.pathExists(
          path.resolve(path.dirname(packageJsonPath), packageJson.types)
        ),
        fse.pathExists(
          path.resolve(path.dirname(packageJsonPath), packageJson.module)
        ),
        fse.pathExists(
          path.resolve(path.dirname(packageJsonPath), packageJson.main)
        ),
        fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2)),
      ]);

      const manifestErrorMessages = [];
      if (!typingsEntryExist) {
        manifestErrorMessages.push(
          `'types' entry '${packageJson.types}' does not exist`
        );
      }
      if (!moduleEntryExists) {
        manifestErrorMessages.push(
          `'module' entry '${packageJson.module}' does not exist`
        );
      }
      if (!mainEntryExists) {
        manifestErrorMessages.push(
          `'main' entry '${packageJson.main}' does not exist`
        );
      }
      if (manifestErrorMessages.length > 0) {
        throw new Error(
          `${packageJsonPath}:\n${manifestErrorMessages.join("\n")}`
        );
      }

      return packageJsonPath;
    })
  );
};

createPackages();
