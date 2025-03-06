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

async function status(files: string[]) {
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

    updateLegacyStatus(readFile, statusStore);
    updateUpdatedStatus(readFile, statusStore);
    /* Add a sleep function here */
    // await new Promise((resolve) => setTimeout(resolve, 1000));

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

  return;
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

function updateLegacyStatus(file: string, statusObj: Status) {
  for (const [legacyToken, config] of Object.entries(updatedTokens)) {
    const legacyCSSVariable = `--a-${legacyToken}`;

    const canAutoMigrate = config.replacement.length > 0;

    const CSShits = new RegExp("(" + legacyCSSVariable + ")", "gm").exec(file);
    if (CSShits) {
      statusObj.css.legacy.push(
        ...CSShits.map((hit) => ({
          name: hit,
          canAutoMigrate,
        })),
      );
    }

    const SCSShits = new RegExp(
      "(\\" + translateToken(legacyCSSVariable, "scss") + ")",
      "gm",
    ).exec(file);

    if (SCSShits) {
      statusObj.scss.legacy.push(
        ...SCSShits.map((hit) => ({
          name: hit,
          canAutoMigrate,
        })),
      );
    }

    const LESShits = new RegExp(
      "(" + translateToken(legacyCSSVariable, "less") + ")",
      "gm",
    ).exec(file);

    if (LESShits) {
      statusObj.less.legacy.push(
        ...LESShits.map((hit) => ({
          name: hit,
          canAutoMigrate,
        })),
      );
    }

    const JShits = new RegExp(
      "(" + translateToken(legacyCSSVariable, "js") + ")",
      "gm",
    ).exec(file);

    if (JShits) {
      /* We remove one instance since we "ignore" the import hit */
      statusObj.js.legacy.push(
        ...JShits.map((hit) => ({
          name: hit,
          canAutoMigrate,
        })).slice(1),
      );
    }

    /* TODO: Account for breakpoint usage? md:, lg: etc */
    const Tailwindhits = new RegExp(
      "(?<![-])\b" + legacyCSSVariable.replace("--a-", "") + "\b",
      "gm",
    ).exec(file);

    if (Tailwindhits) {
      statusObj.tailwind.legacy.push(
        ...Tailwindhits.map((hit) => ({
          name: hit,
          canAutoMigrate,
        })),
      );
    }
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
