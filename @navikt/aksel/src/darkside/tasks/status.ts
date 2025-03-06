import ProgressBar from "cli-progress";
import fs from "fs";
import {
  newTokens,
  updatedTokens,
} from "../../codemod/transforms/darkside/darkside.tokens";
import { translateToken } from "../../codemod/utils/translate-token";

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

type Status = {
  css: StatusData;
  scss: StatusData;
  less: StatusData;
  js: StatusData;
  tailwind: StatusData;
};

function status(files: string[]): Status {
  const progressBar = new ProgressBar.SingleBar(
    {
      clearOnComplete: true,
      hideCursor: true,
      format: "{bar} | {value}/{total} | {filename}",
    },
    ProgressBar.Presets.shades_classic,
  );

  progressBar.start(files.length, 0);

  const statusStore = initStatus();

  files.forEach((file, index) => {
    const readFile = fs.readFileSync(file, "utf8");

    updateStatus({ src: readFile, name: file }, statusStore);

    progressBar.update(index + 1, { filename: file });
  });

  progressBar.stop();

  showStatusResults(
    {
      legacy: [].concat(
        ...Object.values(statusStore).map((_status) => _status.legacy),
      ),
      updated: [].concat(
        ...Object.values(statusStore).map((_status) => _status.updated),
      ),
    },
    "Total",
  );

  ["css", "scss", "less", "js", "tailwind"].forEach((type) => {
    showStatusResults(statusStore[type], type.toUpperCase());
  });

  return statusStore;
}

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

function updateStatus(file: { src: string; name: string }, statusObj: Status) {
  const lines = file.src.split("\n");

  Object.entries(updatedTokens).forEach(([legacyToken, config]) => {
    const legacyCSSVariable = `--a-${legacyToken}`;
    const canAutoMigrate = config.replacement.length > 0;

    const regexes = createRegexes(legacyCSSVariable);

    lines.forEach((line, lineNumber) => {
      regexes.forEach((regex, index) => {
        let match: RegExpExecArray | null;

        while ((match = regex.exec(line)) !== null) {
          const columnNumber = match.index + 1;
          const hit = createTokenData(
            match[0],
            file.name,
            lineNumber + 1,
            columnNumber,
            canAutoMigrate,
          );

          addTokenToStatus(hit, statusObj, index, true);
        }
      });
    });
  });

  newTokens.forEach((newToken) => {
    const updatedCSSVariable = `--ax-${newToken}`;
    const regexes = createRegexes(updatedCSSVariable);

    lines.forEach((line, lineNumber) => {
      regexes.forEach((regex, index) => {
        let match: RegExpExecArray | null;

        while ((match = regex.exec(line)) !== null) {
          const columnNumber = match.index + 1;
          const hit = createTokenData(
            match[0],
            file.name,
            lineNumber + 1,
            columnNumber,
          );

          addTokenToStatus(hit, statusObj, index, false);
        }
      });
    });
  });
}

function createRegexes(variable: string): RegExp[] {
  return [
    new RegExp(`(${variable})`, "gm"),
    new RegExp(`(\\${translateToken(variable, "scss")})`, "gm"),
    new RegExp(`(${translateToken(variable, "less")})`, "gm"),
    new RegExp(`(${translateToken(variable, "js")})`, "gm"),
    new RegExp(
      `(?<![-])\\b${variable.replace("--a-", "").replace("--ax-", "")}\\b`,
      "gm",
    ),
  ];
}

function createTokenData(
  name: string,
  fileName: string,
  lineNumber: number,
  columnNumber: number,
  canAutoMigrate?: boolean,
): TokenData {
  return { name, fileName, lineNumber, columnNumber, canAutoMigrate };
}

function addTokenToStatus(
  hit: TokenData,
  statusObj: Status,
  index: number,
  isLegacy: boolean,
) {
  const statusType = isLegacy ? "legacy" : "updated";
  switch (index) {
    case 0:
      statusObj.css[statusType].push(hit);
      break;
    case 1:
      statusObj.scss[statusType].push(hit);
      break;
    case 2:
      statusObj.less[statusType].push(hit);
      break;
    case 3:
      statusObj.js[statusType].push(hit);
      break;
    case 4:
      statusObj.tailwind[statusType].push(hit);
      break;
  }
}

function initStatus(): Status {
  return {
    css: { legacy: [], updated: [] },
    scss: { legacy: [], updated: [] },
    less: { legacy: [], updated: [] },
    js: { legacy: [], updated: [] },
    tailwind: { legacy: [], updated: [] },
  };
}

export { status };
