import type { CompareResults } from "./helpers/compare.js";

function markdownMessage(compareResults: CompareResults): string {
  const lines: string[] = [];
  const { cssSizeDiff, reactConfigDiff } = compareResults;

  /* CSS size summary */
  if (cssSizeDiff !== 0) {
    lines.push("## CSS bundle");

    lines.push(`| Name | Change |`);
    lines.push(`|--------|--------|`);
    lines.push(`| Index |  ${formatSize(cssSizeDiff)} |`);
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

  if (
    reactConfigDiff.exportsAdded.length > 0 ||
    reactConfigDiff.exportsRemoved.length > 0
  ) {
    lines.push("### Exports");
    if (reactConfigDiff.exportsAdded.length > 0) {
      lines.push(`- **Added**: ${reactConfigDiff.exportsAdded.join(", ")}`);
    }
    if (reactConfigDiff.exportsRemoved.length > 0) {
      lines.push(`- **Removed**: ${reactConfigDiff.exportsRemoved.join(", ")}`);
    }
    lines.push("");
  }

  if (pathsWithTypeChanges.length > 0) {
    const hasAdded = pathsWithTypeChanges.some(
      ([, diff]) => (diff.components.added ?? []).length > 0,
    );
    const hasRemoved = pathsWithTypeChanges.some(
      ([, diff]) => (diff.components.removed ?? []).length > 0,
    );

    lines.push("### Types");
    lines.push("");

    lines.push("| Name | Added 🔹 | Removed 🔸 |");
    lines.push(
      `|:-----|:-----${hasAdded ? "-" : ":"}|:-------${hasRemoved ? "-" : ":"}|`,
    );

    for (const [pathKey, diff] of pathsWithTypeChanges) {
      const name = parseName(pathKey);

      lines.push(
        `|${name}|${(diff.types.added ?? []).join(", ") || "-"}|${(diff.types.removed ?? []).join(", ") || "-"}|`,
      );
    }
  }

  if (pathsWithComponentChanges.length > 0) {
    const hasAdded = pathsWithComponentChanges.some(
      ([, diff]) => (diff.components.added ?? []).length > 0,
    );
    const hasRemoved = pathsWithComponentChanges.some(
      ([, diff]) => (diff.components.removed ?? []).length > 0,
    );

    lines.push("### Components");
    lines.push("");

    lines.push("| Name | Added 🔹 | Removed 🔸 |");
    lines.push(
      `|:-----|:-----${hasAdded ? "-" : ":"}|:-------${hasRemoved ? "-" : ":"}|`,
    );

    for (const [pathKey, diff] of pathsWithComponentChanges) {
      const name = parseName(pathKey);

      lines.push(
        `|${name}|${(diff.components.added ?? []).join(", ") || "-"}|${(diff.components.removed ?? []).join(", ") || "-"}|`,
      );
    }
  }

  if (pathsWithBundleSizeChanges.length > 0) {
    lines.push("### Bundle Size");
    lines.push("");

    lines.push("| Name | Min | Min % | Gzip |");
    lines.push("|:-----|---------:|---------:|-----:|");

    const sortedBySize = pathsWithBundleSizeChanges.toSorted((a, b) => {
      const aSize =
        Math.abs(a[1].bundleSize.minified) + Math.abs(a[1].bundleSize.gzip);
      const bSize =
        Math.abs(b[1].bundleSize.minified) + Math.abs(b[1].bundleSize.gzip);
      return bSize - aSize;
    });

    for (const [pathKey, diff] of sortedBySize) {
      const name = parseName(pathKey);

      lines.push(
        `|${name}|${formatSize(diff.bundleSize.minified)}|${formatPercentage(diff.bundleSize.minifiedPercent)}|${formatSize(diff.bundleSize.gzip)}|`,
      );
    }
  }

  const message = lines.join("\n");

  const header = "# Bundle Analysis Result\n\n";

  if (message.length > 0) {
    return header + message;
  }

  return header + "No changes detected to bundle 🎉";
}

function formatPercentage(percent: number): string {
  const isNegative = percent < 0;
  const absPercent = Math.abs(percent);
  const formatted = `${absPercent.toFixed(2)}%`;

  if (absPercent > 10) {
    return `⚠️ ${isNegative ? "-" : "+"}${formatted}`;
  }

  return isNegative ? `-${formatted}` : `+${formatted}`;
}

function formatSize(bytes: number): string {
  if (bytes === 0) return "0 KB";
  const isNegative = bytes < 0;
  const absBytes = Math.abs(bytes);
  const size = `${(absBytes / 1024).toFixed(2)} KB`;

  if (absBytes > 1024 * 20) {
    return `⚠️ ${isNegative ? "-" : "+"}${size}`;
  }

  return isNegative ? `-${size}` : `+${size}`;
}

function parseName(pathKey: string): string {
  return pathKey === "" ? "Root" : pathKey.replace("/", "");
}

export { markdownMessage };
