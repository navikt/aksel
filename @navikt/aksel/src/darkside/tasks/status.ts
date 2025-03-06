import ProgressBar from "cli-progress";
import fs from "fs";
import {
  newTokens,
  updatedTokens,
} from "../../codemod/transforms/darkside/darkside.tokens";
import { translateToken } from "../../codemod/utils/translate-token";

type StatusData = {
  legacy: {
    name: string;
    canAutoMigrate: boolean;
    fileName: string;
    lineNumber: number;
    columnNumber: number;
  }[];
  updated: {
    name: string;
  }[];
};

type Status = {
  css: StatusData;
  scss: StatusData;
  less: StatusData;
  js: StatusData;
  tailwind: StatusData;
};

function status(files: string[]) {
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

  for (let i = 0; i < files.length; i++) {
    const readFile = fs.readFileSync(files[i], "utf8");

    updateLegacyStatus({ src: readFile, name: files[i] }, statusStore);
    updateUpdatedStatus(readFile, statusStore);

    progressBar.update(i + 1, { filename: files[i] });
  }

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

  showStatusResults(statusStore.css, "CSS");

  showStatusResults(statusStore.scss, "SCSS");

  showStatusResults(statusStore.less, "Less");

  showStatusResults(statusStore.js, "JS");

  showStatusResults(statusStore.tailwind, "Tailwind");

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

  /* Create a const for the completed % */
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

function updateLegacyStatus(
  file: { src: string; name: string },
  statusObj: Status,
) {
  const lines = file.src.split("\n");

  for (const [legacyToken, config] of Object.entries(updatedTokens)) {
    const legacyCSSVariable = `--a-${legacyToken}`;
    const canAutoMigrate = config.replacement.length > 0;

    const regexes = [
      new RegExp(`(${legacyCSSVariable})`, "gm"),
      new RegExp(`(\\${translateToken(legacyCSSVariable, "scss")})`, "gm"),
      new RegExp(`(${translateToken(legacyCSSVariable, "less")})`, "gm"),
      new RegExp(`(${translateToken(legacyCSSVariable, "js")})`, "gm"),
      new RegExp(
        `(?<![-])\\b${legacyCSSVariable.replace("--a-", "")}\\b`,
        "gm",
      ),
    ];

    lines.forEach((line, lineNumber) => {
      regexes.forEach((regex, index) => {
        let match: RegExpExecArray | null;

        while ((match = regex.exec(line)) !== null) {
          const columnNumber = match.index + 1;
          const hit = {
            name: match[0],
            canAutoMigrate,
            fileName: file.name,
            lineNumber: lineNumber + 1,
            columnNumber,
          };

          switch (index) {
            case 0:
              statusObj.css.legacy.push(hit);
              break;
            case 1:
              statusObj.scss.legacy.push(hit);
              break;
            case 2:
              statusObj.less.legacy.push(hit);
              break;
            case 3:
              statusObj.js.legacy.push(hit);
              break;
            case 4:
              statusObj.tailwind.legacy.push(hit);
              break;
          }
        }
      });
    });
  }
}

function updateUpdatedStatus(file: string, statusObj: Status) {
  for (const newToken of newTokens) {
    const updatedCSSVariable = `--ax-${newToken}`;

    const CSShits = new RegExp("(" + updatedCSSVariable + ")", "gm").exec(file);
    if (CSShits) {
      statusObj.css.updated.push(
        ...CSShits.map((hit) => ({
          name: hit,
        })),
      );
    }

    const SCSShits = new RegExp(
      "(\\" + translateToken(updatedCSSVariable, "scss") + ")",
      "gm",
    ).exec(file);

    if (SCSShits) {
      statusObj.scss.updated.push(
        ...SCSShits.map((hit) => ({
          name: hit,
        })),
      );
    }

    const LESShits = new RegExp(
      "(" + translateToken(updatedCSSVariable, "less") + ")",
      "gm",
    ).exec(file);

    if (LESShits) {
      statusObj.less.updated.push(
        ...LESShits.map((hit) => ({
          name: hit,
        })),
      );
    }

    const JShits = new RegExp(
      "(" + translateToken(updatedCSSVariable, "js") + ")",
      "gm",
    ).exec(file);

    if (JShits) {
      /* We remove one instance since we "ignore" the import hit */
      statusObj.js.updated.push(
        ...JShits.map((hit) => ({
          name: hit,
        })).slice(1),
      );
    }

    /* TODO: Account for breakpoint usage? md:, lg: etc */
    const Tailwindhits = new RegExp(
      "(?<![-])\b" + updatedCSSVariable.replace("--ax-", "") + "\b",
      "gm",
    ).exec(file);

    if (Tailwindhits) {
      statusObj.tailwind.updated.push(
        ...Tailwindhits.map((hit) => ({
          name: hit,
        })),
      );
    }
  }
}

function initStatus(): Status {
  return {
    css: {
      legacy: [],
      updated: [],
    },
    scss: {
      legacy: [],
      updated: [],
    },
    less: {
      legacy: [],
      updated: [],
    },
    js: {
      legacy: [],
      updated: [],
    },
    tailwind: {
      legacy: [],
      updated: [],
    },
  };
}

export { status };
