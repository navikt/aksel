import fastGlob from "fast-glob";
import { flatten } from "flat";
import { resolve as resolvePackagePath } from "mlly";
import { readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { rolldown } from "rolldown";
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

type ExportPathConfig = {
  jsFile?: string;
  typesFile?: string;
  expotedTypes?: string[];
  expotedComponents?: string[];
  bundleSizes?: {
    gzip: number;
    minified: number;
  };
};

type ExportPathsConfig = Record<string, ExportPathConfig>;

class ReactAnalyzer extends Analyzer {
  exportPaths: ExportPathsConfig = {};

  async init() {
    this.resolveExportPaths();

    for (const [name, config] of Object.entries(this.exportPaths)) {
      console.info(`analyzing ${name === "." ? "Root" : name}...`);
      config.expotedTypes = this.exportedTypes(config.typesFile);
      config.expotedComponents = await this.exportedComponents(config.jsFile);

      if (config.expotedComponents.length > 0 && config.jsFile) {
        /* const importPath =
          name === "."
            ? packageName
            : `${packageName}/${name.replace("./", "")}`; */

        const importPath = await resolvePackagePath(
          resolve(this.packageDir, config.jsFile),
        );
        const code = `import * as _mod from "${importPath}";\nconsole.info(_mod);`;
        config.bundleSizes = await this.getBundleSize(code);
      }
    }
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

  private exportedTypes(filePath: ExportPathConfig["typesFile"]) {
    if (!filePath) {
      return [];
    }
    return extractTypesFromDts(`${this.packageDir}/${filePath}`);
  }

  private async exportedComponents(filePath: ExportPathConfig["jsFile"]) {
    if (!filePath) {
      return [];
    }

    const path = await resolvePackagePath(resolve(this.packageDir, filePath));
    const components = await import(path);
    return Object.keys(components);
  }

  async getBundleSize(
    code: string,
  ): Promise<{ minified: number; gzip: number }> {
    const inputFile = join(process.cwd(), `.bundle-input-${Date.now()}.js`);
    writeFileSync(inputFile, code);

    /* Common externals - peer dependencies that shouldn't be bundled */
    const commonExternals: string[] = ["react", "react-dom"];

    try {
      const minBundle = await rolldown({
        input: inputFile,
        external: commonExternals,
        platform: "browser",
        treeshake: true,
        logLevel: "silent",
        resolve: {
          conditionNames: ["import", "module", "browser", "default"],
        },
      });

      const minOutput = await minBundle.generate({
        format: "esm",
        minify: true,
      });

      const minCode = minOutput.output[0].code;
      const minSize = Buffer.byteLength(minCode, "utf8");
      const minGzip = gzipSync(minCode).length;

      await minBundle.close();

      return {
        minified: minSize,
        gzip: minGzip,
      };
    } finally {
      try {
        unlinkSync(inputFile);
      } catch {
        // Ignore cleanup errors
      }
    }
  }
}

export { Analyzer, CSSAnalyzer, ReactAnalyzer };
