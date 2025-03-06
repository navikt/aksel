import path from "path";
import { status } from "./status";

function printRemaining(files: string[]) {
  process.stdout.write("\nAnalyzing...");
  const statusObj = status(files, "no-print");

  Object.entries(statusObj).forEach(([tokenType, data]) => {
    console.group(`\n${tokenType.toUpperCase()}:`);
    const fileLinks: string[] = [];

    data.legacy.forEach((tokenData) => {
      fileLinks.push(
        `${tokenData.fileName}:${tokenData.lineNumber}:${tokenData.columnNumber}`,
      );
    });

    // Ensure every string is unique
    const uniqueFileLinks = Array.from(new Set(fileLinks));

    // Sort the unique fileLinks based on fileName first, lineNumber second, and columnNumber third
    uniqueFileLinks.sort((a, b) => {
      const [fileA, lineA, columnA] = a.split(":");
      const [fileB, lineB, columnB] = b.split(":");

      if (fileA !== fileB) {
        return fileA.localeCompare(fileB);
      }
      if (Number(lineA) !== Number(lineB)) {
        return Number(lineA) - Number(lineB);
      }
      return Number(columnA) - Number(columnB);
    });

    // Print the unique and sorted fileLinks as clickable links with full path
    uniqueFileLinks.forEach((link) => {
      const [fileName, lineNumber, columnNumber] = link.split(":");
      const fullPath = path.resolve(process.cwd(), fileName);

      console.info(`file://${fullPath}:${lineNumber}:${columnNumber}`);
    });

    console.groupEnd();
  });
  console.info("\n");
}

export { printRemaining };
