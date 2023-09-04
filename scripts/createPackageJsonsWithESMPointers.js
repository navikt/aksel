const path = require("path");
const fse = require("fs-extra");
const glob = require("fast-glob");

/**
 * https://github.com/mui-org/material-ui/blob/next/scripts/copy-files.js
 */
const createPackageJsonsWithESMPointers = async () => {
  const source = "./src";
  const buildDir = "./cjs";

  const packageIndexes = glob
    .sync("**/index.{ts,tsx}", { cwd: source })
    .map(path.dirname);
  console.log("packageIndexes:", packageIndexes);
  await Promise.all(
    packageIndexes.map(async (directoryPackage) => {
      const packageJsonPath = path.join(
        buildDir,
        directoryPackage,
        "package.json"
      );

      const depth = (packageJsonPath.match(/\//g) || []).length;
      const esmDir = `../`.repeat(depth) + "esm";

      const packageJson = {
        sideEffects: false,
        main: "./index.js",
        module: path.posix.join(esmDir, directoryPackage, "index.js"),
        types: path.posix.join(esmDir, directoryPackage, "index.d.ts"),
      };

      await checkPaths(packageJsonPath, packageJson);

      return packageJsonPath;
    })
  ).catch((e) => console.error(e));
};

const checkPaths = async (packageJsonPath, packageJson) => {
  console.log(
    "---",
    packageJsonPath,
    packageJson,
    path.resolve(path.dirname(packageJsonPath), packageJson.types)
  );
  const [typingsEntryExist, moduleEntryExists, mainEntryExists] =
    await Promise.all([
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
    ]).catch((error) => {
      console.log("HALVOR", error);
    });

  const errorMessages = [];
  !typingsEntryExist &&
    errorMessages.push(`'types' entry '${packageJson.types}' does not exist`);
  !moduleEntryExists &&
    errorMessages.push(`'module' entry '${packageJson.module}' does not exist`);
  !mainEntryExists &&
    errorMessages.push(`'main' entry '${packageJson.main}' does not exist`);

  if (errorMessages.length > 0) {
    console.log(`${packageJsonPath}:\n${errorMessages.join("\n")}`);
    //throw new Error(`${packageJsonPath}:\n${errorMessages.join("\n")}`);
  }
};

createPackageJsonsWithESMPointers();
