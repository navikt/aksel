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

        let match: RegExpExecArray | null = regex.exec(fileSrc);

        while (match) {
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

          match = regex.exec(fileSrc);
        }
      }
    }

    const legacyRegex = new RegExp(
      `(${legacyComponentTokenList.map((t) => `${t}:`).join("|")})`,
      "gm",
    );

    let legacyMatch: RegExpExecArray | null = legacyRegex.exec(fileSrc);

    while (legacyMatch !== null) {
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

      legacyMatch = legacyRegex.exec(fileSrc);
    }

    for (const [newTokenName, config] of Object.entries(darksideTokenConfig)) {
      if (!getTokenRegex(newTokenName, "css").test(fileSrc)) {
        continue;
      }

      for (const [regexKey, regex] of Object.entries(config.regexes)) {
        if (!regex) {
          continue;
        }
        let match: RegExpExecArray | null = regex.exec(fileSrc);

        while (match) {
          const { row, column } = getWordPositionInFile(fileSrc, match.index);

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

function getWordPositionInFile(
  fileContent: string,
  index: number,
): { row: number; column: number } {
  let row = 1;
  let lastNewLineIndex = -1;

  for (let i = 0; i < index; i++) {
    if (fileContent[i] === "\n") {
      row++;
      lastNewLineIndex = i;
    }
  }

  return { row, column: index - lastNewLineIndex };
}

export { getStatus, getWordPositionInFile };
