import type { BundleSizeInfo } from "../types.js";

interface ExportDiff {
  path: string;
  added: {
    exports: string[];
    types: string[];
  };
  removed: {
    exports: string[];
    types: string[];
  };
}

interface BundleSizeDiff {
  /** Size difference in bytes (positive = increase, negative = decrease) */
  raw: number;
  gzip: number;
  minified: number;
  minifiedGzip: number;
}

interface ExportBundleSizeChange {
  exportName: string;
  base: BundleSizeInfo | null;
  head: BundleSizeInfo | null;
  diff: BundleSizeDiff | null;
}

export interface PathBundleSizeChange {
  path: string;
  fullImport: {
    base: BundleSizeInfo | null;
    head: BundleSizeInfo | null;
    diff: BundleSizeDiff | null;
  };
  namedExports: ExportBundleSizeChange[];
}

interface BundleSizeComparisonResult {
  packageName: string;
  baseVersion: string;
  headVersion: string;
  hasChanges: boolean;
  changes: PathBundleSizeChange[];
  summary: {
    totalMinifiedGzipDiff: number;
    increasedExports: number;
    decreasedExports: number;
    newExports: number;
    removedExports: number;
  };
}

interface ComparisonResult {
  packageName: string;
  baseVersion: string;
  headVersion: string;
  hasChanges: boolean;
  addedPaths: string[];
  removedPaths: string[];
  diffs: ExportDiff[];
  summary: {
    addedExports: number;
    removedExports: number;
    addedTypes: number;
    removedTypes: number;
    addedPaths: number;
    removedPaths: number;
  };
}

/**
 * Format bytes to a human-readable string
 */
function formatBytes(bytes: number): string {
  const absBytes = Math.abs(bytes);
  if (absBytes < 1024) {
    return `${bytes} B`;
  }
  const kb = bytes / 1024;
  if (absBytes < 1024 * 1024) {
    return `${kb.toFixed(2)} kB`;
  }
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

/**
 * Format a size diff with indicator
 */
function formatSizeDiff(diff: number): string {
  if (diff === 0) {
    return "0 B";
  }
  const sign = diff > 0 ? "+" : "";
  return `${sign}${formatBytes(diff)}`;
}

/**
 * Format combined comparison result as a markdown comment for GitHub PR
 */
export function formatAsMarkdown(
  exportResult: ComparisonResult,
  bundleResult: BundleSizeComparisonResult | null,
): string {
  const hasExportChanges = exportResult.hasChanges;
  const hasBundleChanges = bundleResult?.hasChanges ?? false;

  if (!hasExportChanges && !hasBundleChanges) {
    return `## 📦 Package Analysis: ${exportResult.packageName}

✅ **No changes detected** between main and Pull request`;
  }

  const lines: string[] = [
    `## 📦 Package Analysis: ${exportResult.packageName}`,
    "",
    `Comparing Pull request → main`,
    "",
  ];

  // Export summary table
  lines.push(
    "### Export Summary",
    "",
    "| Category | Added | Removed |",
    "|----------|-------|---------|",
    `| Export Paths | ${exportResult.summary.addedPaths} | ${exportResult.summary.removedPaths} |`,
    `| Exports | ${exportResult.summary.addedExports} | ${exportResult.summary.removedExports} |`,
    `| Types | ${exportResult.summary.addedTypes} | ${exportResult.summary.removedTypes} |`,
    "",
  );

  // Bundle size summary
  if (bundleResult) {
    lines.push(
      "### Bundle Size Summary",
      "",
      `**Total size change (minified+gzip):** ${formatSizeDiff(bundleResult.summary.totalMinifiedGzipDiff)}`,
      "",
      "| Category | Count |",
      "|----------|-------|",
      `| Exports with size increase | ${bundleResult.summary.increasedExports} |`,
      `| Exports with size decrease | ${bundleResult.summary.decreasedExports} |`,
      "",
    );
  }

  // Added paths
  if (exportResult.addedPaths.length > 0) {
    lines.push("### ➕ New Export Paths", "");
    for (const path of exportResult.addedPaths) {
      lines.push(`- \`${path}\``);
    }
    lines.push("");
  }

  // Removed paths
  if (exportResult.removedPaths.length > 0) {
    lines.push("### ➖ Removed Export Paths", "");
    for (const path of exportResult.removedPaths) {
      lines.push(`- \`${path}\``);
    }
    lines.push("");
  }

  // Detailed export changes with bundle sizes
  if (
    exportResult.diffs.length > 0 ||
    (bundleResult?.changes.length ?? 0) > 0
  ) {
    lines.push("### Detailed Changes", "");

    // Create a map of bundle changes for easy lookup
    const bundleChangeMap = new Map<string, PathBundleSizeChange>();
    if (bundleResult) {
      for (const change of bundleResult.changes) {
        bundleChangeMap.set(change.path, change);
      }
    }

    // Get all paths with changes
    const allChangedPaths = new Set([
      ...exportResult.diffs.map((d) => d.path),
      ...(bundleResult?.changes.map((c) => c.path) ?? []),
    ]);

    for (const path of allChangedPaths) {
      const exportDiff = exportResult.diffs.find((d) => d.path === path);
      const bundleChange = bundleChangeMap.get(path);

      lines.push(`#### \`${path}\``, "");

      // Show added exports with sizes
      if (exportDiff?.added.exports.length) {
        lines.push("**Added exports:**");
        for (const exp of exportDiff.added.exports) {
          const sizeInfo = bundleChange?.namedExports.find(
            (e) => e.exportName === exp,
          );
          if (sizeInfo?.head) {
            lines.push(
              `- \`${exp}\` (${formatBytes(sizeInfo.head.minifiedGzip)})`,
            );
          } else {
            lines.push(`- \`${exp}\``);
          }
        }
        lines.push("");
      }

      // Show added types
      if (exportDiff?.added.types.length) {
        lines.push(
          `**Added types:** \`${exportDiff.added.types.join("`, `")}\``,
        );
        lines.push("");
      }

      // Show removed exports with sizes
      if (exportDiff?.removed.exports.length) {
        lines.push("**Removed exports:**");
        for (const exp of exportDiff.removed.exports) {
          const sizeInfo = bundleChange?.namedExports.find(
            (e) => e.exportName === exp,
          );
          if (sizeInfo?.base) {
            lines.push(
              `- ~~\`${exp}\`~~ (was ${formatBytes(sizeInfo.base.minifiedGzip)})`,
            );
          } else {
            lines.push(`- ~~\`${exp}\`~~`);
          }
        }
        lines.push("");
      }

      // Show removed types
      if (exportDiff?.removed.types.length) {
        lines.push(
          `**Removed types:** ~~\`${exportDiff.removed.types.join("`, `")}\`~~`,
        );
        lines.push("");
      }

      // Show bundle size changes for existing exports (not new/removed)
      const sizeChangedExports =
        bundleChange?.namedExports.filter((e) => {
          const isNew = exportDiff?.added.exports.includes(e.exportName);
          const isRemoved = exportDiff?.removed.exports.includes(e.exportName);
          return !isNew && !isRemoved && e.diff && e.diff.minifiedGzip !== 0;
        }) ?? [];

      if (sizeChangedExports.length > 0) {
        lines.push("**Size changes:**");
        lines.push(
          "| Export | Before | After | Diff |",
          "|--------|--------|-------|------|",
        );
        for (const exp of sizeChangedExports.sort(
          (a, b) =>
            Math.abs(b.diff?.minifiedGzip ?? 0) -
            Math.abs(a.diff?.minifiedGzip ?? 0),
        )) {
          const icon =
            exp.diff && exp.diff.minifiedGzip > 0
              ? "📈"
              : exp.diff && exp.diff.minifiedGzip < 0
                ? "📉"
                : "";
          lines.push(
            `| \`${exp.exportName}\` | ${formatBytes(exp.base?.minifiedGzip ?? 0)} | ${formatBytes(exp.head?.minifiedGzip ?? 0)} | ${icon} ${formatSizeDiff(exp.diff?.minifiedGzip ?? 0)} |`,
          );
        }
        lines.push("");
      }
    }
  }

  // Warnings section
  const warnings: string[] = [];

  if (
    exportResult.summary.removedExports > 0 ||
    exportResult.summary.removedTypes > 0 ||
    exportResult.summary.removedPaths > 0
  ) {
    warnings.push(
      "⚠️ **Breaking change:** This change removes public exports or types.",
    );
  }

  const threshold = 5 * 1024; // 5kB
  if (bundleResult && bundleResult.summary.totalMinifiedGzipDiff > threshold) {
    warnings.push(
      `⚠️ **Size increase:** Total bundle size increased by ${formatBytes(bundleResult.summary.totalMinifiedGzipDiff)}. Consider reviewing for optimization opportunities.`,
    );
  }

  if (warnings.length > 0) {
    lines.push("---", "", ...warnings, "");
  }

  return lines.join("\n");
}
