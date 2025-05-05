import ProgressBar from "cli-progress";
import fs from "fs";
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

  files.forEach((fileName, index) => {
    const fileSrc = fs.readFileSync(fileName, "utf8");

    /**
     * We first parse trough all legacy tokens (--a-) prefixed tokens
     */
    for (const [legacyToken, config] of Object.entries(legacyTokenConfig)) {
      if (!getTokenRegex(legacyToken, "css").test(fileSrc)) {
        continue;
      }

      for (const [regexKey, regex] of Object.entries(config.regexes)) {
        if (!regex) {
          continue;
        }

        let match: RegExpExecArray | null;

        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        while ((match = regex.exec(fileSrc))) {
          const { row, column } = getWordPositionInFile(fileSrc, match.index);

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
        }
      }
    }

    const legacyRegex = new RegExp(
      `(${legacyComponentTokenList.map((t) => `${t}:`).join("|")})`,
      "gm",
    );

    let legacyMatch: RegExpExecArray | null;
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    while ((legacyMatch = legacyRegex.exec(fileSrc)) !== null) {
      const { row, column } = getWordPositionInFile(fileSrc, legacyMatch.index);

      StatusStore.add({
        isLegacy: true,
        type: "component",
        columnNumber: column,
        lineNumber: row,
        canAutoMigrate: false,
        fileName,
        name: legacyMatch[0],
      });
    }

    for (const [newTokenName, config] of Object.entries(darksideTokenConfig)) {
      if (!getTokenRegex(newTokenName, "css").test(fileSrc)) {
        continue;
      }

      for (const [regexKey, regex] of Object.entries(config.regexes)) {
        if (!regex) {
          continue;
        }
        let match: RegExpExecArray | null;
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        while ((match = regex.exec(fileSrc))) {
          const { row, column } = getWordPositionInFile(fileSrc, match.index);

          StatusStore.add({
            isLegacy: false,
            type: regexKey as keyof typeof config.regexes,
            columnNumber: column,
            lineNumber: row,
            fileName,
            name: match[0],
          });
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

function getWordPositionInFile(
  fileContent: string,
  index: number,
): { row: number; column: number } {
  const lines = fileContent.split("\n");
  let lineNumber = 1;
  let charCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineLength = lines[i].length + 1; // +1 to account for the newline character that was removed by split

    if (charCount + lineLength > index) {
      return { row: lineNumber, column: index - charCount + 1 };
    }

    charCount += lineLength;
    lineNumber++;
  }

  return { row: lineNumber, column: 0 }; // Should not reach here if the index is within the file content range
}

export { getStatus };
