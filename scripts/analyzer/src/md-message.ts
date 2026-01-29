import type { CompareResults } from "./helpers/compare.js";

function markdownMessage(compareResults: CompareResults): string {
  const lines: string[] = [];
  const { cssSizeDiff, reactConfigDiff } = compareResults;

  /* Top-level exports summary */
  if (
    reactConfigDiff.exportsAdded.length > 0 ||
    reactConfigDiff.exportsRemoved.length > 0
  ) {
    lines.push("## 📦 Exports");
    if (reactConfigDiff.exportsAdded.length > 0) {
      lines.push(`- **Added**: ${reactConfigDiff.exportsAdded.join(", ")}`);
    }
    if (reactConfigDiff.exportsRemoved.length > 0) {
      lines.push(`- **Removed**: ${reactConfigDiff.exportsRemoved.join(", ")}`);
    }
    lines.push("");
  }

  /* Per-export details */
  const paths = Object.entries(reactConfigDiff.paths);
  const pathsWithChanges = paths.filter(([, diff]) => {
    return (
      diff.types.added.length > 0 ||
      diff.types.removed.length > 0 ||
      diff.components.added.length > 0 ||
      diff.components.removed.length > 0 ||
      diff.bundleSize.gzip !== 0 ||
      diff.bundleSize.minified !== 0
    );
  });

  if (pathsWithChanges.length > 0) {
    lines.push("## 🔍 Changes by Export Path");
    lines.push("");

    for (const [pathKey, diff] of pathsWithChanges) {
      lines.push(`### \`${pathKey}\``);
      lines.push("");

      /* Types table */
      if (diff.types.added.length > 0 || diff.types.removed.length > 0) {
        lines.push("#### Types");
        lines.push("| Type | Status |");
        lines.push("|------|--------|");
        for (const type of diff.types.added) {
          lines.push(`| ${type} | ✅ Added |`);
        }
        for (const type of diff.types.removed) {
          lines.push(`| ${type} | ❌ Removed |`);
        }
        lines.push("");
      }

      /* Components table */
      if (
        diff.components.added.length > 0 ||
        diff.components.removed.length > 0
      ) {
        lines.push("#### Components");
        lines.push("| Component | Status |");
        lines.push("|-----------|--------|");
        for (const component of diff.components.added) {
          lines.push(`| ${component} | ✅ Added |`);
        }
        for (const component of diff.components.removed) {
          lines.push(`| ${component} | ❌ Removed |`);
        }
        lines.push("");
      }

      /* Bundle size table */
      if (diff.bundleSize.gzip !== 0 || diff.bundleSize.minified !== 0) {
        lines.push("#### Bundle Size");
        lines.push("| Format | Change |");
        lines.push("|--------|--------|");
        if (diff.bundleSize.minified !== 0) {
          const color = getSizeColor(diff.bundleSize.minified);
          lines.push(
            `| Minified | ${color} ${formatSize(diff.bundleSize.minified)} |`,
          );
        }
        if (diff.bundleSize.gzip !== 0) {
          const color = getSizeColor(diff.bundleSize.gzip);
          lines.push(`| Gzip | ${color} ${formatSize(diff.bundleSize.gzip)} |`);
        }
        lines.push("");
      }
    }
  }

  /* CSS size summary */
  if (cssSizeDiff !== 0) {
    lines.push("## 📄 CSS");
    const color = getSizeColor(cssSizeDiff);
    lines.push(`| Format | Change |`);
    lines.push(`|--------|--------|`);
    lines.push(`| Index | ${color} ${formatSize(cssSizeDiff)} |`);
    lines.push("");
  }

  return lines.join("\n");
}

function formatSize(bytes: number): string {
  if (bytes === 0) return "0B";
  const isNegative = bytes < 0;
  const absBytes = Math.abs(bytes);
  const size =
    absBytes < 1024 ? `${absBytes}B` : `${(absBytes / 1024).toFixed(2)}KB`;
  return isNegative ? `-${size}` : `+${size}`;
}

function getSizeColor(bytes: number): string {
  if (bytes === 0) return "";
  return bytes > 0 ? "🔴" : "🟢";
}

export { markdownMessage };
