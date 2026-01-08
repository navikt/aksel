import type { ExportInfo, PackageExports } from "../types.js";

export interface ExportDiff {
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

export interface ComparisonResult {
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

function arrayDiff<T>(base: T[], head: T[]): { added: T[]; removed: T[] } {
  const baseSet = new Set(base);
  const headSet = new Set(head);

  return {
    added: head.filter((item) => !baseSet.has(item)),
    removed: base.filter((item) => !headSet.has(item)),
  };
}

/**
 * Compare two package export analyses
 */
export function compareExports(
  base: PackageExports,
  head: PackageExports,
): ComparisonResult {
  const pathDiff = arrayDiff(base.exportPaths, head.exportPaths);

  // Create maps for easy lookup
  const baseMap = new Map<string, ExportInfo>(
    base.details.map((d) => [d.path, d]),
  );
  const headMap = new Map<string, ExportInfo>(
    head.details.map((d) => [d.path, d]),
  );

  const diffs: ExportDiff[] = [];
  let addedExports = 0;
  let removedExports = 0;
  let addedTypes = 0;
  let removedTypes = 0;

  // Check all paths that exist in either version
  const allPaths = new Set([...base.exportPaths, ...head.exportPaths]);

  for (const path of allPaths) {
    const baseInfo = baseMap.get(path) || { path, exports: [], types: [] };
    const headInfo = headMap.get(path) || { path, exports: [], types: [] };

    const exportsDiff = arrayDiff(baseInfo.exports, headInfo.exports);
    const typesDiff = arrayDiff(baseInfo.types, headInfo.types);

    // Only include paths with actual changes
    if (
      exportsDiff.added.length > 0 ||
      exportsDiff.removed.length > 0 ||
      typesDiff.added.length > 0 ||
      typesDiff.removed.length > 0
    ) {
      diffs.push({
        path,
        added: {
          exports: exportsDiff.added,
          types: typesDiff.added,
        },
        removed: {
          exports: exportsDiff.removed,
          types: typesDiff.removed,
        },
      });

      addedExports += exportsDiff.added.length;
      removedExports += exportsDiff.removed.length;
      addedTypes += typesDiff.added.length;
      removedTypes += typesDiff.removed.length;
    }
  }

  const hasChanges =
    diffs.length > 0 ||
    pathDiff.added.length > 0 ||
    pathDiff.removed.length > 0;

  return {
    packageName: head.packageName,
    baseVersion: base.version,
    headVersion: head.version,
    hasChanges,
    addedPaths: pathDiff.added,
    removedPaths: pathDiff.removed,
    diffs,
    summary: {
      addedExports,
      removedExports,
      addedTypes,
      removedTypes,
      addedPaths: pathDiff.added.length,
      removedPaths: pathDiff.removed.length,
    },
  };
}

/**
 * Format comparison result as a markdown comment for GitHub PR
 */
export function formatAsMarkdown(result: ComparisonResult): string {
  if (!result.hasChanges) {
    return `## 📦 Export Analysis: ${result.packageName}

✅ **No changes detected** between main and Pull request`;
  }

  const lines: string[] = [
    `## 📦 Export Analysis: ${result.packageName}`,
    "",
    `Comparing Pull request → main`,
    "",
    "### Summary",
    "",
    "| Category | Added | Removed |",
    "|----------|-------|---------|",
    `| Export Paths | ${result.summary.addedPaths} | ${result.summary.removedPaths} |`,
    `| Exports | ${result.summary.addedExports} | ${result.summary.removedExports} |`,
    `| Types | ${result.summary.addedTypes} | ${result.summary.removedTypes} |`,
    "",
  ];

  // Added paths
  if (result.addedPaths.length > 0) {
    lines.push("### + New Export Paths", "");
    for (const path of result.addedPaths) {
      lines.push(`- \`${path}\``);
    }
    lines.push("");
  }

  // Removed paths
  if (result.removedPaths.length > 0) {
    lines.push("### - Removed Export Paths", "");
    for (const path of result.removedPaths) {
      lines.push(`- \`${path}\``);
    }
    lines.push("");
  }

  // Detailed changes
  if (result.diffs.length > 0) {
    lines.push("### Detailed Changes", "");

    for (const diff of result.diffs) {
      const hasAdditions =
        diff.added.exports.length > 0 || diff.added.types.length > 0;
      const hasRemovals =
        diff.removed.exports.length > 0 || diff.removed.types.length > 0;

      lines.push(`#### \`${diff.path}\``, "");

      if (hasAdditions) {
        if (diff.added.exports.length > 0) {
          lines.push(
            `**Added exports:** \`${diff.added.exports.join("`, `")}\``,
          );
        }
        if (diff.added.types.length > 0) {
          lines.push(`**Added types:** \`${diff.added.types.join("`, `")}\``);
        }
      }

      if (hasRemovals) {
        if (diff.removed.exports.length > 0) {
          lines.push(
            `**Removed exports:** ~~\`${diff.removed.exports.join("`, `")}\`~~`,
          );
        }
        if (diff.removed.types.length > 0) {
          lines.push(
            `**Removed types:** ~~\`${diff.removed.types.join("`, `")}\`~~`,
          );
        }
      }

      lines.push("");
    }
  }

  // Add breaking change warning
  if (
    result.summary.removedExports > 0 ||
    result.summary.removedTypes > 0 ||
    result.summary.removedPaths > 0
  ) {
    lines.push(
      "---",
      "",
      "⚠️ **Warning:** This change removes public exports or types, which may be a breaking change.",
      "",
    );
  }

  return lines.join("\n");
}
