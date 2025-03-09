/* eslint-disable no-useless-escape */
import ProgressBar from "cli-progress";
import fs from "fs";
import {
  newTokens,
  updatedTokens,
} from "../../codemod/transforms/darkside/darkside.tokens";
import { getAllTokenRegexes } from "../token-regex";

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

  action === "print" && progressBar.start(files.length, 0);

  StatusStore.initStatus();

  files.forEach((file, index) => {
    const readFile = fs.readFileSync(file, "utf8");

    updateStatus({ src: readFile, name: file });

    action === "print" && progressBar.update(index + 1, { filename: file });
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

  ["css", "scss", "less", "js", "tailwind"].forEach((type) => {
    showStatusResults(StatusStore.status[type], type.toUpperCase());
  });

  console.info("\n");

  return StatusStore;
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

function updateStatus(file: { src: string; name: string }) {
  const lines = file.src.split("\n");

  Object.entries(updatedTokens).forEach(([legacyToken, config]) => {
    const legacyCSSVariable = `--a-${legacyToken}`;
    const canAutoMigrate = config.replacement.length > 0;

    const regexes = getAllTokenRegexes(legacyCSSVariable);

    lines.forEach((line, lineNumber) => {
      Object.keys(regexes).forEach((regexKey) => {
        let match: RegExpExecArray | null;

        while ((match = regexes[regexKey].exec(line)) !== null) {
          const columnNumber = match.index + 1;

          StatusStore.add({
            isLegacy: true,
            type: regexKey as any /* TODO: Fix */,
            columnNumber,
            lineNumber: lineNumber + 1,
            canAutoMigrate,
            fileName: file.name,
            name: match[0],
          });
        }
      });

      if (!config.twOld) {
        return;
      }

      const createTwRegex = (token: string) =>
        new RegExp(`(?<!:)(\s|^)?${token}(?=\s|$)`, "g");
      const createTwRegexWithPrefix = (token: string) =>
        new RegExp(`(?<!:)(\s|^)?:${token}(?=\s|$)`, "g");
      const createTwRegexForBreakpoints = (token: string) =>
        new RegExp(`(?<!:)(?<=\s|^)${token}:(?=\w)`, "g");

      config.twOld.split(",").forEach((oldTwToken) => {
        const twRegex = createTwRegex(oldTwToken);
        const twRegexWithPrefix = createTwRegexWithPrefix(oldTwToken);
        const twRegexForBreakpoints = createTwRegexForBreakpoints(oldTwToken);

        let match: RegExpExecArray | null;

        const processMatch = (regex: RegExp, offset: number) => {
          while ((match = regex.exec(line)) !== null) {
            const columnNumber = match.index + offset;

            StatusStore.add({
              isLegacy: true,
              type: "tailwind",
              columnNumber,
              lineNumber: lineNumber + 1,
              canAutoMigrate: !!config.twNew,
              fileName: file.name,
              name: match[0],
            });
          }
        };

        if (legacyToken.includes("breakpoint")) {
          processMatch(twRegexForBreakpoints, 1);
          return;
        }

        processMatch(twRegex, 1);
        processMatch(twRegexWithPrefix, 2);
      });
    });
  });

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
            fileName: file.name,
            name: match[0],
          });
        }
      });
    });
  });
}

export { getStatus };
export type { StatusT };
