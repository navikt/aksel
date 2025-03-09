import ProgressBar from "cli-progress";
import fs from "fs";
import {
  newTokens,
  updatedTokens,
} from "../../codemod/transforms/darkside/darkside.tokens";
import { generateRegexes, getAllTokenRegexes } from "../token-regex";

type TokenData = {
  name: string;
  canAutoMigrate?: boolean;
  fileName: string;
  lineNumber: number;
  columnNumber: number;
};

type StatusData = {
  legacy: TokenData[];
  updated: TokenData[];
};

type StatusT = {
  css: StatusData;
  scss: StatusData;
  less: StatusData;
  js: StatusData;
  tailwind: StatusData;
};

class TokenStatus {
  status: StatusT;

  constructor() {
    this.status = this.initStatus();
  }

  initStatus(): StatusT {
    return {
      css: { legacy: [], updated: [] },
      scss: { legacy: [], updated: [] },
      less: { legacy: [], updated: [] },
      js: { legacy: [], updated: [] },
      tailwind: { legacy: [], updated: [] },
    };
  }

  add({
    isLegacy,
    type,
    ...hit
  }: {
    type: keyof StatusT;
    isLegacy: boolean;
    name: string;
    fileName: string;
    lineNumber: number;
    columnNumber: number;
    canAutoMigrate?: boolean;
  }) {
    const statusType = isLegacy ? "legacy" : "updated";
    switch (type) {
      case "css":
        this.status.css[statusType].push(hit);
        break;
      case "scss":
        this.status.scss[statusType].push(hit);
        break;
      case "less":
        this.status.less[statusType].push(hit);
        break;
      case "js":
        this.status.js[statusType].push(hit);
        break;
      case "tailwind":
        this.status.tailwind[statusType].push(hit);
        break;
    }
  }
}

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
      format: "{bar} | {value}/{total} | {filename}",
    },
    ProgressBar.Presets.shades_classic,
  );

  if (action === "print") {
    progressBar.start(files.length, 0);
  }

  StatusStore.initStatus();

  files.forEach((file, index) => {
    updateStatus(file);

    if (action === "print") {
      progressBar.update(index + 1, { filename: file });
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
function showStatusResults(statusDataObj: StatusData, type: string) {
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

/**
 * Update the status of the tokens in the file
 */
function updateStatus(fileName: string) {
  const fileSrc = fs.readFileSync(fileName, "utf8");
  const lines = fileSrc.split("\n");

  for (const [legacyToken, config] of Object.entries(updatedTokens)) {
    const legacyCSSVariable = `--a-${legacyToken}`;
    const canAutoMigrate = config.replacement.length > 0;

    const regexes = generateRegexes(legacyCSSVariable, config);

    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
      const line = lines[lineNumber];

      for (const [regexKey, regexList] of Object.entries(regexes)) {
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
  }

  newTokens.forEach((newToken) => {
    const updatedCSSVariable = `--ax-${newToken}`;
    const regexes = getAllTokenRegexes(updatedCSSVariable);

    lines.forEach((line, lineNumber) => {
      Object.keys(regexes).forEach((regexKey) => {
        let match: RegExpExecArray | null;

        while ((match = regexes[regexKey].exec(line)) !== null) {
          const columnNumber = match.index + 1;

          StatusStore.add({
            isLegacy: false,
            type: regexKey as any /* TODO: Fix */,
            columnNumber,
            lineNumber: lineNumber + 1,
            fileName,
            name: match[0],
          });
        }
      });
    });
  });
}

export { getStatus };
export type { StatusT };
