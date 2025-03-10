import ProgressBar from "cli-progress";

type TokenDataT = {
  name: string;
  canAutoMigrate?: boolean;
  fileName: string;
  lineNumber: number;
  columnNumber: number;
};

type StatusDataT = {
  legacy: TokenDataT[];
  updated: TokenDataT[];
};

type StatusT = {
  css: StatusDataT;
  scss: StatusDataT;
  less: StatusDataT;
  js: StatusDataT;
  tailwind: StatusDataT;
  component: StatusDataT;
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
      component: { legacy: [], updated: [] },
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

  printStatusForAll() {
    Object.keys(this.status).forEach((type) => {
      this.printStatus(type as keyof StatusT);
    });

    console.info("\n");
  }

  printStatus(type: keyof StatusT | "summary") {
    let statusDataObj: StatusDataT;
    if (type === "summary") {
      statusDataObj = {
        legacy: [].concat(
          ...Object.values(this.status).map((_status) => _status.legacy),
        ),
        updated: [].concat(
          ...Object.values(this.status).map((_status) => _status.updated),
        ),
      };
    } else {
      statusDataObj = this.status[type];
    }

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
      totalTokens === 0
        ? 100
        : (statusDataObj.updated.length / totalTokens) * 100
    ).toFixed(0);

    console.info(`\n${type.toUpperCase()} (${completedPercentage}%)`);

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
}

export { TokenStatus };
export type { StatusT, StatusDataT };
