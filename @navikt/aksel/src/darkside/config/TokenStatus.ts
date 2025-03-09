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
}

export { TokenStatus };
export type { StatusT, StatusDataT };
