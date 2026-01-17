interface ReportData {
  packageExports: PackageExports;
  bundleAnalysis: PackageBundleAnalysis | null;
  generatedAt: string;
  analysisDuration: number;
}

interface ExportInfo {
  path: string;
  exports: string[];
  types: string[];
}

interface PackageExports {
  packageName: string;
  version: string;
  exportPaths: string[];
  details: ExportInfo[];
  summary: {
    totalExports: number;
    totalTypes: number;
    totalPaths: number;
  };
}

interface BundleSizeInfo {
  /** Raw bundle size in bytes */
  raw: number;
  /** Gzipped bundle size in bytes */
  gzip: number;
  /** Minified bundle size in bytes */
  minified: number;
  /** Minified + gzipped bundle size in bytes */
  minifiedGzip: number;
}

export interface ExportBundleInfo {
  path: string;
  /** Bundle size when importing everything from this path */
  fullImport: BundleSizeInfo | null;
  /** Bundle sizes for individual named exports */
  namedExports: Record<string, BundleSizeInfo>;
  error?: string;
}

interface PackageBundleAnalysis {
  packageName: string;
  version: string;
  details: ExportBundleInfo[];
}

export type {
  ReportData,
  ExportInfo,
  PackageExports,
  PackageBundleAnalysis,
  BundleSizeInfo,
};
