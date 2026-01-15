import chalk from "chalk";
import ProgressBar from "cli-progress";

type TokenDataT = {
  name: string;
  canAutoMigrate?: boolean;
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  comment?: string;
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
  deprecated: StatusDataT;
};

class TokenStatus {
  status: StatusT;

  constructor() {
    this.initStatus();
  }

  initStatus() {
    this.status = {
      css: { legacy: [], updated: [] },
      scss: { legacy: [], updated: [] },
      less: { legacy: [], updated: [] },
      js: { legacy: [], updated: [] },
      tailwind: { legacy: [], updated: [] },
      component: { legacy: [], updated: [] },
      deprecated: { legacy: [], updated: [] },
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
    comment?: string;
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
      case "component":
        this.status.component[statusType].push(hit);
        break;
      case "deprecated":
        this.status.deprecated[statusType].push(hit);
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

      const uniqueFiles = new Set(
        statusDataObj.legacy.map((token) => token.fileName),
      );

      const automigratedN = statusDataObj.legacy.filter(
        (legacy) => legacy.canAutoMigrate,
      ).length;

      console.info(`Files with legacy tokens: ${uniqueFiles.size}`);

      const autoMigratePercentage = statusDataObj.legacy.length
        ? Math.round((automigratedN / statusDataObj.legacy.length) * 100)
        : 0;

      console.info(
        `You have ${statusDataObj.legacy.length} total tokens that need to be updated. Of these, ${automigratedN} (${autoMigratePercentage}%) can be automatically migrated for you.`,
      );
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

  printMigrationHelp() {
    const imports = {
      css: {
        new: `@use "@navikt/ds-tokens/css";`,
        link: "https://cdn.jsdelivr.net/npm/@navikt/ds-tokens@7/dist/tokens.css",
      },
      scss: {
        new: `@use "@navikt/ds-tokens/scss" as *;`,
        link: "https://cdn.jsdelivr.net/npm/@navikt/ds-tokens@7/dist/tokens.scss",
      },
      less: {
        new: `@import "~@navikt/ds-tokens/less";`,
        link: "https://cdn.jsdelivr.net/npm/@navikt/ds-tokens@7/dist/tokens.less",
      },
      js: {
        new: `import { ... } from "@navikt/ds-tokens/js";`,
        link: "https://cdn.jsdelivr.net/npm/@navikt/ds-tokens@7/dist/tokens.js",
      },
    } as const;

    for (const _key of Object.keys(imports)) {
      const key = _key as keyof typeof imports;
      const data = this.status[key] as StatusDataT;

      const legacyNeeded = data.legacy.length > 0;
      const foundUse = legacyNeeded || data.updated.length > 0;

      if (!foundUse) {
        continue;
      }

      console.info(chalk.underline(`\n${key.toUpperCase()} Tokens Migration`));

      const importStrings = imports[key as keyof typeof imports];

      if (key !== "css") {
        console.info(
          `${chalk.blue("→")} Update import: ${chalk.green(importStrings.new)}`,
        );
      }

      if (legacyNeeded) {
        console.info(
          `${chalk.yellow("!")} Old tokens still needed until migration is finished. Finish migration now, or add old tokens to project manually:\n${chalk.blueBright(
            importStrings.link,
          )}`,
        );
      }
    }

    const componentTokens = this.status.component.legacy.length;
    if (componentTokens > 0) {
      console.info(chalk.underline(`\nCOMPONENT Tokens Migration`));
      console.info(
        `${chalk.yellow("!")} Found ${componentTokens} component token definition${componentTokens > 1 ? "s" : ""} that require manual migration.`,
      );

      console.info(
        `We no longer support component tokens. Please migrate to the new v8 tokens using theming or other methods.`,
      );
    }

    const deprecatedTokens = this.status.deprecated.legacy.length;
    if (deprecatedTokens > 0) {
      console.info(chalk.underline(`\nLEGACY TOKEN DEFINITIONS (--a-token:)`));

      console.info(
        `${chalk.yellow("!")} Found ${deprecatedTokens} legacy token definition${deprecatedTokens > 1 ? "s" : ""} that require manual migration.`,
      );
      console.info(
        `These are custom property definitions using legacy tokens that need to be updated to use new v8 tokens.`,
      );
    }
  }
}

export { TokenStatus };
export type { StatusT, StatusDataT };
