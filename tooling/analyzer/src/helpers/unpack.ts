import fastGlob from "fast-glob";
import { readFileSync, renameSync } from "node:fs";
import { dirname } from "node:path";
import { extract } from "tar";

/**
 * Unpacks tarball matching the provided glob
 * @param tarballGlob Glob describing tarball location
 * @returns unpacked tarball dir-location
 */
function unpackTar(tarballGlob: string): string {
  const tarballPath = fastGlob.sync(tarballGlob)[0];
  if (!tarballPath) {
    throw new Error(`Tarball not found for glob: ${tarballGlob}`);
  }

  extract({
    file: tarballPath,
    cwd: dirname(tarballPath),
    sync: true,
  });

  /**
   * navikt-ds-react-3.5.0.tgz -> ds-react
   */
  const outDir = tarballPath.split("-").slice(1, 3).join("-");

  /**
   * Npm packages are always packed into a folder named "package"
   * temp/local/package -> temp/local/ds-react
   */
  renameSync(
    `${dirname(tarballPath)}/package`,
    `${dirname(tarballPath)}/${outDir}`,
  );

  return `${dirname(tarballPath)}/${outDir}`;
}

type PackageJsonExportKey =
  | "."
  | "import"
  | "require"
  | "types"
  | "default"
  | (string & {});

type PackageJsonExportsObject = {
  [P in PackageJsonExportKey]?: string | PackageJsonExportsObject;
};

/**
 * Loads and returns the package.json exports field
 * @returns package.json exports field
 */
function getPackageExports(packageDir: string): PackageJsonExportsObject {
  const packageJson = JSON.parse(
    readFileSync(`${packageDir}/package.json`, "utf-8"),
  );

  return packageJson.exports;
}

export { unpackTar, getPackageExports };
