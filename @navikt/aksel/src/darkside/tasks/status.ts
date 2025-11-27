import ProgressBar from "cli-progress";
import fs from "node:fs";
import { TokenStatus } from "../config/TokenStatus";
import { darksideTokenConfig } from "../config/darkside.tokens";
import { legacyComponentTokenList } from "../config/legacy-component.tokens";
import { legacyTokenConfig } from "../config/legacy.tokens";
import { getTokenRegex } from "../config/token-regex";

const StatusStore = new TokenStatus();

/**
 * Get the status of the tokens in the files
 */
function getStatus(
  files: string[],
  action: "no-print" | "print" = "print",
): TokenStatus {
  const progressBar = new ProgressBar.SingleBar(
    {
      clearOnComplete: true,
      hideCursor: true,
      format: "{bar} | {value}/{total} | {fileName}",
    },
    ProgressBar.Presets.shades_classic,
  );

  if (action === "print") {
    progressBar.start(files.length, 0);
  }

  StatusStore.initStatus();

  const legacyCheckRegexes = new Map<string, RegExp>();
  for (const legacyToken of Object.keys(legacyTokenConfig)) {
    legacyCheckRegexes.set(legacyToken, getTokenRegex(legacyToken, "css"));
  }

  const darksideCheckRegexes = new Map<string, RegExp>();
  for (const newTokenName of Object.keys(darksideTokenConfig)) {
    darksideCheckRegexes.set(newTokenName, getTokenRegex(newTokenName, "css"));
  }

  const legacyRegex = new RegExp(
    `(${legacyComponentTokenList.map((t) => `${t}:`).join("|")})`,
    "gm",
  );

  files.forEach((fileName, index) => {
    const fileSrc = fs.readFileSync(fileName, "utf8");
    const lineStarts = getLineStarts(fileSrc);

    /**
     * We first parse trough all legacy tokens (--a-) prefixed tokens
     */
    for (const [legacyToken, config] of Object.entries(legacyTokenConfig)) {
      const checkRegex = legacyCheckRegexes.get(legacyToken);
      if (checkRegex) {
        checkRegex.lastIndex = 0;
        if (!checkRegex.test(fileSrc)) {
          continue;
        }
      }

      for (const [regexKey, regex] of Object.entries(config.regexes)) {
        if (!regex) {
          continue;
        }

        let match: RegExpExecArray | null = regex.exec(fileSrc);

        while (match) {
          const { row, column } = getWordPositionInFile(
            match.index,
            lineStarts,
          );

          StatusStore.add({
            isLegacy: true,
            comment: config.comment,
            type: regexKey as keyof typeof config.regexes,
            columnNumber: column,
            lineNumber: row,
            canAutoMigrate:
              regexKey === "tailwind"
                ? !!config.twNew
                : config.replacement.length > 0,
            fileName,
            name: match[0],
          });

          match = regex.exec(fileSrc);
        }
      }
    }

    legacyRegex.lastIndex = 0;
    let legacyMatch: RegExpExecArray | null = legacyRegex.exec(fileSrc);

    while (legacyMatch !== null) {
      const { row, column } = getWordPositionInFile(
        legacyMatch.index,
        lineStarts,
      );

      StatusStore.add({
        isLegacy: true,
        type: "component",
        columnNumber: column,
        lineNumber: row,
        canAutoMigrate: false,
        fileName,
        name: legacyMatch[0],
      });

      legacyMatch = legacyRegex.exec(fileSrc);
    }

    for (const [newTokenName, config] of Object.entries(darksideTokenConfig)) {
      const checkRegex = darksideCheckRegexes.get(newTokenName);
      if (checkRegex) {
        checkRegex.lastIndex = 0;
        if (!checkRegex.test(fileSrc)) {
          continue;
        }
      }

      for (const [regexKey, regex] of Object.entries(config.regexes)) {
        if (!regex) {
          continue;
        }
        let match: RegExpExecArray | null = regex.exec(fileSrc);

        while (match) {
          const { row, column } = getWordPositionInFile(
            match.index,
            lineStarts,
          );

          StatusStore.add({
            isLegacy: false,
            type: regexKey as keyof typeof config.regexes,
            columnNumber: column,
            lineNumber: row,
            fileName,
            name: match[0],
          });

          match = regex.exec(fileSrc);
        }
      }
    }

    if (action === "print") {
      progressBar.update(index + 1, { fileName });
    }
  });

  if (action === "no-print") {
    return StatusStore;
  }

  progressBar.stop();

  StatusStore.printStatus("summary");
  StatusStore.printStatusForAll();
  StatusStore.printMigrationHelp();
  console.info("\n");

  return StatusStore;
}

function getLineStarts(content: string): number[] {
  const starts = [0];
  let i = -1;
  while ((i = content.indexOf("\n", i + 1)) !== -1) {
    starts.push(i + 1);
  }
  return starts;
}

function getWordPositionInFile(
  index: number,
  lineStarts: number[],
): { row: number; column: number } {
  let low = 0;
  let high = lineStarts.length - 1;
  let lineIndex = 0;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    if (lineStarts[mid] <= index) {
      lineIndex = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return { row: lineIndex + 1, column: index - lineStarts[lineIndex] + 1 };
}

export { getStatus, getWordPositionInFile, getLineStarts };
