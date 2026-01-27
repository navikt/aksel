import assert from "node:assert";
import { readFileSync } from "node:fs";
import { getPackageExports, unpackTar } from "./helpers/unpack.js";

/**
 * Analyzes the CSS package located at the given tarball location and returns the size of its index file in bytes.
 * @param tarLocation - location of the css package tarball
 */
function analyzeCss(tarLocation: string): number {
  const { packageDir: cssPackageDir } = unpackTar(tarLocation);
  const { packageExports: cssPackageExports } =
    getPackageExports(cssPackageDir);

  const exportPath = cssPackageExports["."];

  /**
   * We assume key-value to be string for css-package
   */
  assert(
    exportPath && typeof exportPath === "string",
    "Package export '.' not found for css-package",
  );

  const cssIndexContent = readFileSync(
    `${cssPackageDir}/${exportPath}`,
    "utf-8",
  );

  return Buffer.byteLength(cssIndexContent, "utf-8");
}

export { analyzeCss };
