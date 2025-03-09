import ProgressBar from "cli-progress";
import fs from "fs";
import {
  newTokens,
  updatedTokens,
} from "../../codemod/transforms/darkside/darkside.tokens";
import { StatusDataT, TokenStatus } from "../config/TokenStatus";
import { legacyComponentTokens } from "../config/legacy-component-tokens";
import { generateLegacyRegexes, generateNewRegexes } from "../token-regex";

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
    const lines = fileSrc.split("\n");

    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
      const line = lines[lineNumber];

      for (const [legacyToken, config] of Object.entries(updatedTokens)) {
        const legacyCSSVariable = `--a-${legacyToken}`;
        let canAutoMigrate = config.replacement.length > 0;

        const regexes = generateLegacyRegexes(legacyCSSVariable, config);

        for (const [regexKey, regexList] of Object.entries(regexes)) {
          if (regexKey === "tailwind") {
            canAutoMigrate = !!config.twNew;
          }

          for (const regex of regexList) {
            let match: RegExpExecArray | null;
            while ((match = regex.exec(line)) !== null) {
              const columnNumber = match.index + 1;

              StatusStore.add({
                isLegacy: true,
                type: regexKey as keyof typeof regexes,
                columnNumber,
                lineNumber: lineNumber + 1,
                canAutoMigrate,
                fileName,
                name: match[0],
              });
            }
          }
        }
      }

      for (const legacyComponentToken of legacyComponentTokens) {
        const regex = new RegExp(`(${legacyComponentToken}:)`, "g");

        let match: RegExpExecArray | null;
        while ((match = regex.exec(line)) !== null) {
          const columnNumber = match.index + 1;

          StatusStore.add({
            isLegacy: true,
            type: "component",
            columnNumber,
            lineNumber: lineNumber + 1,
            canAutoMigrate: false,
            fileName,
            name: match[0],
          });
        }
      }

      for (const [newTokenName, tailwindName] of Object.entries(newTokens)) {
        const newCSSVariable = `--ax-${newTokenName}`;
        const regexes = generateNewRegexes(newCSSVariable, tailwindName);

        for (const [regexKey, regexList] of Object.entries(regexes)) {
          for (const regex of regexList) {
            let match: RegExpExecArray | null;
            while ((match = regex.exec(line)) !== null) {
              const columnNumber = match.index + 1;

              StatusStore.add({
                isLegacy: false,
                type: regexKey as keyof typeof regexes,
                columnNumber,
                lineNumber: lineNumber + 1,
                fileName,
                name: match[0],
              });
            }
          }
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
