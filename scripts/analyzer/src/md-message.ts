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

  const pathsWithTypeChanges = paths.filter(([, diff]) => {
    return diff.types.added.length > 0 || diff.types.removed.length > 0;
  });

  const pathsWithComponentChanges = paths.filter(([, diff]) => {
    return (
      diff.components.added.length > 0 || diff.components.removed.length > 0
    );
  });

  const pathsWithBundleSizeChanges = paths.filter(([, diff]) => {
    return diff.bundleSize.gzip !== 0 || diff.bundleSize.minified !== 0;
  });

  if (
    pathsWithTypeChanges.length > 0 ||
    pathsWithComponentChanges.length > 0 ||
    pathsWithBundleSizeChanges.length > 0
  ) {
    lines.push("## React bundle");
  }

  if (pathsWithTypeChanges.length > 0) {
    lines.push("### Types");
    lines.push("");

    lines.push("| Name | Added | Removed |");
    lines.push("|:-----|:------|:--------|");

    for (const [pathKey, diff] of pathsWithTypeChanges) {
      const name = parseName(pathKey);

      lines.push(
        `|${name}|${(diff.types.added ?? []).join(", ")}|${(diff.types.removed ?? []).join(", ")}|`,
      );
    }
  }

  if (pathsWithComponentChanges.length > 0) {
    lines.push("### Components");
    lines.push("");

    lines.push("| Name | Added | Removed |");
    lines.push("|:-----|:------|:--------|");

    for (const [pathKey, diff] of pathsWithComponentChanges) {
      const name = parseName(pathKey);

      lines.push(
        `|${name}|${(diff.types.added ?? []).join(", ")}|${(diff.types.removed ?? []).join(", ")}|`,
      );
    }
  }

  if (pathsWithBundleSizeChanges.length > 0) {
    lines.push("### Bundle Size");
    lines.push("");

    lines.push("| Name | Minified | Gzip |");
    lines.push("|:-----|---------:|-----:|");

    for (const [pathKey, diff] of pathsWithBundleSizeChanges) {
      const name = parseName(pathKey);

      lines.push(
        `|${name}|${formatSize(diff.bundleSize.minified)}|${formatSize(diff.bundleSize.gzip)}|`,
      );
    }
  }

  /* CSS size summary */
  if (cssSizeDiff !== 0) {
    lines.push("## CSS bundle");

    lines.push(`| Name | Change |`);
    lines.push(`|--------|--------|`);
    lines.push(`| Index |  ${formatSize(cssSizeDiff)} |`);
    lines.push("");
  }

  const message = lines.join("\n");

  const header = "# Bundle Analysis Result\n\n";

  if (message.length > 0) {
    return header + message;
  }

  return header + "No changes detected to bundle 🎉";
}

function formatSize(bytes: number): string {
  if (bytes === 0) return "0B";
  const isNegative = bytes < 0;
  const absBytes = Math.abs(bytes);
  const size =
    absBytes < 1024 ? `${absBytes}B` : `${(absBytes / 1024).toFixed(2)}KB`;
  return isNegative ? `-${size}` : `+${size}`;
}

function parseName(pathKey: string): string {
  return pathKey === "" ? "Root" : pathKey.replace("/", "");
}

export { markdownMessage };
