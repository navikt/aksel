import fastGlob from "fast-glob";
import { readFileSync, renameSync } from "node:fs";
import { dirname } from "node:path";
import { extract } from "tar";

type PackageJsonExportKey =
  | "."
  | "import"
  | "require"
  | "types"
  | "node"
  | "browser"
  | "default"
  | (string & {});

type PackageJsonExportsObject = {
  [P in PackageJsonExportKey]?: string | PackageJsonExportsObject;
};

type PackageJsonExports = PackageJsonExportsObject;

class Analyzer {
  packageDir: string;
  packageExports: PackageJsonExports;

  constructor(tarballGlob: string) {
    this.packageDir = this.unpackTar(tarballGlob);
    this.packageExports = this.getPackageExports();
  }

  getPackageExport(name: string) {
    return this.packageExports[name];
  }

  /**
   * Loads and returns the package.json exports field
   * @returns package.json exports field
   */
  getPackageExports(): PackageJsonExports {
    if (this.packageExports) {
      return this.packageExports;
    }

    const packageJson = JSON.parse(
      readFileSync(`${this.packageDir}/package.json`, "utf-8"),
    );

    return packageJson.exports;
  }

  /**
   * Unpacks tarball matching the provided glob
   * @param tarballGlob Glob describing tarball location
   * @returns unpacked tarball dir-location
   */
  private unpackTar(tarballGlob: string): string {
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
}

class CSSAnalyzer extends Analyzer {
  indexSize: number = -1;

  compareIndexSize(otherSize: number): number {
    return this.getIndexSize() - otherSize;
  }

  getIndexSize(): number {
    if (this.indexSize !== -1) {
      return this.indexSize;
    }

    const exportPath = this.getPackageExport(".");

    /**
     * We assume key-value to be string for css-package
     */
    if (!exportPath || typeof exportPath !== "string") {
      throw new Error("Package export '.' not found");
    }

    const cssIndexContent = readFileSync(
      `${this.packageDir}/${exportPath}`,
      "utf-8",
    );
    this.indexSize = Buffer.byteLength(cssIndexContent, "utf-8");
    return this.indexSize;
  }
}

class ReactAnalyzer extends Analyzer {
  constructor(tarballGlob: string) {
    super(tarballGlob);
  }
}

export { Analyzer, CSSAnalyzer, ReactAnalyzer };
