import ProgressBar from "cli-progress";
import fs from "fs";
import { updatedTokens } from "../../codemod/transforms/darkside/darkside.tokens";
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
  console.info("Generating status...");
  const progressBar = new ProgressBar.SingleBar(
    {
      clearOnComplete: false,
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
    /* Add a sleep function here */
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    progressBar.update(i + 1, { filename: files[i] });
  }

  progressBar.stop();

  console.info(statusStore);
  return;
}

/**
 * Return an array of tokens that is found in the file with possible migration option.
 * If no migration is found, return null instead
 * @param framework Token framework to update
 * @returns {token: string, migration: string | null}[]
 */
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
