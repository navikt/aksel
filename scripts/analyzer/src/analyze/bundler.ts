import { unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { rolldown } from "rolldown";
import type {
  BundleSizeInfo,
  ExportBundleInfo,
  PackageBundleAnalysis,
  PackageExports,
} from "../types.js";
import { formatBytes } from "../utilities/format.utils.js";

interface BundleAnalyzeOptions {
  /** Specific export paths to analyze (defaults to all) */
  paths: string[];
}

/**
 * Analyze bundle sizes for all exports in a package
 */
async function analyzeBundleSizes(
  packageExports: PackageExports,
  options: BundleAnalyzeOptions = { paths: [] },
): Promise<PackageBundleAnalysis> {
  const { paths } = options;

  console.info(`\n📦 Analyzing bundle sizes: ${packageExports.packageName}`);

  const details: ExportBundleInfo[] = [];

  const pathsToAnalyze = packageExports.details.filter((d) =>
    paths.includes(d.path),
  );

  for (const detail of pathsToAnalyze) {
    /* Skip type-only exports */
    if (detail.exports.length === 0) {
      continue;
    }

    console.info(`  📊 Analyzing: ${detail.path}`);

    const bundleInfo = await analyzeExportPath(
      packageExports.packageName,
      detail.path,
    );

    details.push(bundleInfo);

    if (bundleInfo.fullImport) {
      console.info(
        `     Full import: ${formatBytes(
          bundleInfo.fullImport.minifiedGzip,
        )} (gzip)`,
      );
    }
  }

  return {
    packageName: packageExports.packageName,
    version: packageExports.version,
    details,
  };
}

/**
 * Bundle code and return size information using rolldown
 */
async function getBundleSize(code: string): Promise<BundleSizeInfo> {
  const inputFile = join(process.cwd(), `.bundle-input-${Date.now()}.js`);
  writeFileSync(inputFile, code);

  /* Common externals - peer dependencies that shouldn't be bundled */
  const commonExternals: string[] = ["react", "react-dom"];

  try {
    /* Non-minified build */
    const rawBundle = await rolldown({
      input: inputFile,
      external: commonExternals,
      platform: "browser",
      treeshake: true,
      logLevel: "silent",
      resolve: {
        conditionNames: ["import", "module", "browser", "default"],
      },
    });

    const rawOutput = await rawBundle.generate({
      format: "esm",
    });

    const rawCode = rawOutput.output[0].code;

    const rawSize = Buffer.byteLength(rawCode, "utf8");
    const rawGzip = gzipSync(rawCode).length;

    await rawBundle.close();

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
      raw: rawSize,
      gzip: rawGzip,
      minified: minSize,
      minifiedGzip: minGzip,
    };
  } finally {
    try {
      unlinkSync(inputFile);
    } catch {
      // Ignore cleanup errors
    }
  }
}

/**
 * Analyze bundle size for a single export path
 */
async function analyzeExportPath(
  packageName: string,
  exportPath: string,
): Promise<ExportBundleInfo> {
  const importPath =
    exportPath === "."
      ? packageName
      : `${packageName}/${exportPath.replace(/^\.\//, "")}`;

  const result: ExportBundleInfo = {
    path: exportPath,
    fullImport: null,
    namedExports: {},
  };

  /* Analyze full import (import * as X from 'path') */
  try {
    const fullImportCode = `import * as _mod from "${importPath}";\nconsole.info(_mod);`;
    result.fullImport = await getBundleSize(fullImportCode);
  } catch (error) {
    result.error = `Failed to analyze full import: ${error}`;
  }

  return result;
}

/**
 * Compare bundle sizes between two analyses
 */
interface BundleSizeComparison {
  path: string;
  base: BundleSizeInfo | null;
  head: BundleSizeInfo | null;
  diff: {
    raw: number;
    gzip: number;
    minified: number;
    minifiedGzip: number;
    percentChange: number;
  } | null;
}

export function compareBundleSizes(
  base: PackageBundleAnalysis,
  head: PackageBundleAnalysis,
): BundleSizeComparison[] {
  const baseMap = new Map(base.details.map((d) => [d.path, d]));
  const headMap = new Map(head.details.map((d) => [d.path, d]));

  const allPaths = new Set([...baseMap.keys(), ...headMap.keys()]);
  const comparisons: BundleSizeComparison[] = [];

  for (const path of allPaths) {
    const baseInfo = baseMap.get(path)?.fullImport || null;
    const headInfo = headMap.get(path)?.fullImport || null;

    let diff = null;
    if (baseInfo && headInfo) {
      const percentChange =
        baseInfo.minifiedGzip > 0
          ? ((headInfo.minifiedGzip - baseInfo.minifiedGzip) /
              baseInfo.minifiedGzip) *
            100
          : 0;

      diff = {
        raw: headInfo.raw - baseInfo.raw,
        gzip: headInfo.gzip - baseInfo.gzip,
        minified: headInfo.minified - baseInfo.minified,
        minifiedGzip: headInfo.minifiedGzip - baseInfo.minifiedGzip,
        percentChange,
      };
    }

    comparisons.push({
      path,
      base: baseInfo,
      head: headInfo,
      diff,
    });
  }

  return comparisons.sort((a, b) => {
    const aDiff = Math.abs(a.diff?.minifiedGzip || 0);
    const bDiff = Math.abs(b.diff?.minifiedGzip || 0);
    return bDiff - aDiff;
  });
}

export { analyzeBundleSizes };
