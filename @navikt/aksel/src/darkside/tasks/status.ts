import ProgressBar from "cli-progress";
import fs from "fs";
import {
  newTokens,
  updatedTokens,
} from "../../codemod/transforms/darkside/darkside.tokens";
import { StatusDataT, TokenStatus } from "../config/TokenStatus";
import { getWordPositionInFile } from "../config/findWordPosition";
import { legacyComponentTokens } from "../config/legacyComponentTokens";
import { getFrameworkRegexes, getTokenRegex } from "../config/tokenRegex";

const StatusStore = new TokenStatus();

/**
 * Get the status of the tokens in the files
 */
function getStatus(
  files: string[],
  action: "no-print" | "print" = "print",
): TokenStatus {
  const totalStart = performance.now();
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

    for (const [legacyToken, config] of Object.entries(updatedTokens)) {
      const legacyCSSVariable = `--a-${legacyToken}`;

      const regexes = getFrameworkRegexes({
        legacy: true,
        token: legacyCSSVariable,
        twString: config.twOld,
      });

      if (!getTokenRegex(legacyToken, "css").test(fileSrc)) {
        continue;
      }

      for (const [regexKey, regex] of Object.entries(regexes)) {
        if (!regex) {
          continue;
        }

        let match: RegExpExecArray | null;

        /* TODO: Handle tw-regexes with : */
        while ((match = regex.exec(fileSrc))) {
          const { row, column } = getWordPositionInFile(fileSrc, match.index);

          StatusStore.add({
            isLegacy: true,
            type: regexKey as keyof typeof regexes,
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
      `(${legacyComponentTokens.map((t) => `${t}:`).join("|")})`,
      "gm",
    );

    let legacyMatch: RegExpExecArray | null;
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

    for (const [newTokenName, tailwindName] of Object.entries(newTokens)) {
      const newCSSVariable = `--ax-${newTokenName}`;

      const regexes = getFrameworkRegexes({
        legacy: false,
        token: newCSSVariable,
        twString: tailwindName,
      });

      if (!getTokenRegex(newTokenName, "css").test(fileSrc)) {
        continue;
      }

      for (const [regexKey, regex] of Object.entries(regexes)) {
        if (!regex) {
          continue;
        }
        let match: RegExpExecArray | null;
        while ((match = regex.exec(fileSrc))) {
          const { row, column } = getWordPositionInFile(fileSrc, match.index);

          StatusStore.add({
            isLegacy: false,
            type: regexKey as keyof typeof regexes,
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

  showStatusResults(
    {
      legacy: [].concat(
        ...Object.values(StatusStore.status).map((_status) => _status.legacy),
      ),
      updated: [].concat(
        ...Object.values(StatusStore.status).map((_status) => _status.updated),
      ),
    },
    "Total",
  );

  Object.keys(StatusStore.status).forEach((type) => {
    showStatusResults(StatusStore.status[type], type.toUpperCase());
  });

  console.info("\n");

  const totalEnd = performance.now();

  console.info(
    `Total execution time is ${(totalEnd - totalStart).toFixed(2)} ms`,
  );

  return StatusStore;
}

/**
 * Show the results of the status
 */
function showStatusResults(statusDataObj: StatusDataT, type: string) {
  const multibar = new ProgressBar.MultiBar(
    {
      clearOnComplete: false,
      hideCursor: true,
      format: "{bar} {type} | {count} | {value}/{total}",
    },
    ProgressBar.Presets.shades_grey,
  );

  const totalTokens =
    statusDataObj.legacy.length + statusDataObj.updated.length;

  const completedPercentage = (
    totalTokens === 0 ? 100 : (statusDataObj.updated.length / totalTokens) * 100
  ).toFixed(0);

  console.info(`\n${type} (${completedPercentage}%)`);

  multibar.create(totalTokens, statusDataObj.updated.length, {
    type: "Tokens left to update",
    count: statusDataObj.legacy.length,
  });

  const canBeAutomigratedN = statusDataObj.legacy.filter(
    (legacy) => legacy.canAutoMigrate,
  ).length;

  multibar.create(statusDataObj.legacy.length, canBeAutomigratedN, {
    type: "Can be auto-migrated ",
    count: canBeAutomigratedN,
  });

  multibar.stop();
}

export { getStatus };
