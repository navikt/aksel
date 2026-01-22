import fastGlob from "fast-glob";
import { flatten } from "flat";
import { resolve as resolvePackagePath } from "mlly";
import { readFileSync, renameSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { extract } from "tar";
import { extractTypesFromDts } from "./helpers/extract-types.js";

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
  getIndexSize(): number {
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

    return Buffer.byteLength(cssIndexContent, "utf-8");
  }
}

class ReactAnalyzer extends Analyzer {
  exportPaths: Record<
    string,
    {
      jsFile?: string;
      typesFile?: string;
      expotedTypes?: string[];
      expotedComponents?: string[];
    }
  > = {};

  constructor(tarballGlob: string) {
    super(tarballGlob);
    this.resolveExportPaths();
    this.resolveExportedTypes();
  }

  async init() {
    await this.resolveExportedComponents();
  }

  private resolveExportPaths() {
    const exportsField = this.getPackageExports();

    const flattenedExports: Record<string, string> = flatten(exportsField);
    for (const [key, value] of Object.entries(flattenedExports)) {
      /* Skip CJS files */
      if (key.includes(".require.")) {
        continue;
      }

      let name: string;
      /* Assume root */
      if (key.startsWith("..")) {
        name = ".";
      } else {
        const parts = key.split(".");
        name = parts[1];
      }

      if (!this.exportPaths[name]) {
        this.exportPaths[name] = {};
      }

      if (key.endsWith(".types")) {
        this.exportPaths[name].typesFile = value;
      } else if (key.endsWith(".default")) {
        this.exportPaths[name].jsFile = value;
      }
    }
  }

  private resolveExportedTypes() {
    console.info("Resolving exported types...");
    for (const [name, paths] of Object.entries(this.exportPaths)) {
      if (!paths.typesFile) {
        this.exportPaths[name].expotedTypes = [];
        continue;
      }
      const types = extractTypesFromDts(
        `${this.packageDir}/${paths.typesFile}`,
      );
      this.exportPaths[name].expotedTypes = types;
    }

    console.info("Done resolving exported types.");
  }

  private async resolveExportedComponents() {
    console.info("Resolving exported components...");
    for (const [name, paths] of Object.entries(this.exportPaths)) {
      if (!paths.jsFile) {
        this.exportPaths[name].expotedComponents = [];
        continue;
      }

      const path = await resolvePackagePath(
        resolve(this.packageDir, paths.jsFile),
      );
      const components = await import(path);
      const keys = Object.keys(components);

      this.exportPaths[name].expotedComponents = keys;
    }

    console.info("Done resolving exported types.");
  }
}

export { Analyzer, CSSAnalyzer, ReactAnalyzer };
