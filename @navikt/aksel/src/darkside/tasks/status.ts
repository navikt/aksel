import ProgressBar from "cli-progress";
import fs from "fs";
import {
  newTokens,
  updatedTokens,
} from "../../codemod/transforms/darkside/darkside.tokens";
import { TokenStatus } from "../config/TokenStatus";
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

  StatusStore.printStatus("summary");
  StatusStore.printStatusForAll();

  return StatusStore;
}

export { getStatus };
