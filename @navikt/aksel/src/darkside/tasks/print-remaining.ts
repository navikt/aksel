import path from "path";
import { getStatus } from "./status";

function printRemaining(files: string[]) {
  process.stdout.write("\nAnalyzing...");
  const statusObj = getStatus(files, "no-print").status;

  Object.entries(statusObj).forEach(([tokenType, data]) => {
    console.group(`\n${tokenType.toUpperCase()}:`);
    const fileLinks: string[] = [];

    data.legacy.forEach((tokenData) => {
      fileLinks.push(
        `${tokenData.name.replace(":", "")}:${tokenData.fileName}:${
          tokenData.lineNumber
        }:${tokenData.columnNumber}`,
      );
    });

    if (fileLinks.length === 0) {
      console.info("Nothing to update.");
      console.groupEnd();
    }

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
      const [tokenName, fileName, lineNumber, columnNumber] = link.split(":");
      const fullPath = path.resolve(process.cwd(), fileName);

      const withComment = data.legacy.find((token) => {
        return token.name === tokenName && token.comment;
      });

      if (withComment) {
        console.info(`\n/* ${withComment.comment} */`);
      }
      console.info(
        `${tokenName}: file://${fullPath}:${lineNumber}:${columnNumber}`,
      );
    });

    console.groupEnd();
  });
  console.info("\n");
}

export { printRemaining };
