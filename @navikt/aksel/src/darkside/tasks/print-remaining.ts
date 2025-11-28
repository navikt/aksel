import clipboardy from "clipboardy";
import Enquirer from "enquirer";
import path from "node:path";
import { TokenStatus } from "../config/TokenStatus";
import { getStatus } from "./status";

async function printRemaining(files: string[], status?: TokenStatus["status"]) {
  process.stdout.write("\nAnalyzing...");

  /**
   * Skip re-calculating status if already provided
   */
  const statusObj = status ?? getStatus(files, "no-print").status;

  /* Flatten all legacy tokens */
  const allTokens = Object.values(statusObj).flatMap((data) => data.legacy);

  if (allTokens.length === 0) {
    console.info("\nNo legacy tokens found!");
    return;
  }

  const response = await Enquirer.prompt<{
    groupBy: "file" | "token";
    copy: boolean;
  }>([
    {
      type: "select",
      name: "groupBy",
      message: "How would you like to group the remaining tokens?",
      choices: [
        { message: "By File", name: "file" },
        { message: "By Token", name: "token" },
      ],
    },
    {
      type: "confirm",
      name: "copy",
      message: "Copy report to clipboard?",
      initial: true,
    },
  ]);

  const { groupBy, copy } = response;

  console.info("\n");

  const log = (str: string, indent = 0) => {
    const prefix = "  ".repeat(indent);
    console.info(prefix + str);
  };

  let jsonOutput: unknown;

  /**
   * Group by filename
   */
  if (groupBy === "file") {
    const byFile = new Map<string, typeof allTokens>();

    allTokens.forEach((token) => {
      if (!byFile.has(token.fileName)) {
        byFile.set(token.fileName, []);
      }
      byFile.get(token.fileName)!.push(token);
    });

    /* Sort files by number of tokens (descending) */
    const sortedFiles = Array.from(byFile.entries()).sort(
      (a, b) => b[1].length - a[1].length,
    );

    const fileOutput: {
      file: string;
      fullPath: string;
      count: number;
      tokens: {
        name: string;
        line: number;
        column: number;
        comment?: string;
        link: string;
      }[];
    }[] = [];

    sortedFiles.forEach(([fileName, tokens]) => {
      const fullPath = path.resolve(process.cwd(), fileName);
      log(`${fileName} (${tokens.length} tokens)`);

      /* Sort tokens in file by line number */
      tokens.sort((a, b) => a.lineNumber - b.lineNumber);

      const fileEntry = {
        file: fileName,
        fullPath,
        count: tokens.length,
        tokens: [] as (typeof fileOutput)[0]["tokens"],
      };

      tokens.forEach((token) => {
        if (token.comment) {
          log(`/* ${token.comment} */`, 1);
        }
        log(
          `${token.name}: ${fullPath}:${token.lineNumber}:${token.columnNumber}`,
          1,
        );
        fileEntry.tokens.push({
          name: token.name,
          line: token.lineNumber,
          column: token.columnNumber,
          comment: token.comment,
          link: `file://${fullPath}`,
        });
      });
      /* Empty line */
      log("");
      fileOutput.push(fileEntry);
    });
    jsonOutput = fileOutput;
  } else {
    /* Group by token name */
    const byToken = new Map<string, typeof allTokens>();

    allTokens.forEach((token) => {
      if (!byToken.has(token.name)) {
        byToken.set(token.name, []);
      }
      byToken.get(token.name)!.push(token);
    });

    /* Sort tokens by frequency (descending) */
    const sortedTokens = Array.from(byToken.entries()).sort(
      (a, b) => b[1].length - a[1].length,
    );

    const tokenOutput: {
      token: string;
      count: number;
      occurrences: {
        file: string;
        fullPath: string;
        line: number;
        column: number;
        comment?: string;
        link: string;
      }[];
    }[] = [];

    sortedTokens.forEach(([tokenName, tokens]) => {
      log(`${tokenName} (${tokens.length} occurrences)`);

      const tokenEntry = {
        token: tokenName,
        count: tokens.length,
        occurrences: [] as (typeof tokenOutput)[0]["occurrences"],
      };

      tokens.forEach((token) => {
        const fullPath = path.resolve(process.cwd(), token.fileName);
        if (token.comment) {
          log(`/* ${token.comment} */`, 1);
        }
        log(`${fullPath}:${token.lineNumber}:${token.columnNumber}`, 1);

        tokenEntry.occurrences.push({
          file: token.fileName,
          fullPath,
          line: token.lineNumber,
          column: token.columnNumber,
          comment: token.comment,
          link: `file://${fullPath}`,
        });
      });

      /* Empty line */
      log("");
      tokenOutput.push(tokenEntry);
    });
    jsonOutput = tokenOutput;
  }

  if (copy) {
    try {
      clipboardy.writeSync(JSON.stringify(jsonOutput, null, 2));
      console.info("✅ Report (JSON) copied to clipboard!");
    } catch (error) {
      console.error("❌ Failed to copy to clipboard:", error.message);
    }
  }
}

export { printRemaining };
