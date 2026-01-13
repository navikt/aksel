import ProgressBar from "cli-progress";
import fs from "node:fs";
import { translateToken } from "../../utils/translate-token";
import { TokenStatus } from "../config/TokenStatus";
import { legacyComponentTokenList } from "../config/legacy-component.tokens";
import { legacyTokenConfig } from "../config/legacy.tokens";
import { getFrameworkRegexes } from "../config/token-regex";
import { v8TokenConfig } from "../config/v8.tokens";

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

  /**
   * Prepare search terms for legacy and v8 tokens.
   * By pre-computing these sets, we save re-calculating them for each file,
   * improving performance when processing large numbers of files.
   */
  const legacySearchTerms = getLegacySearchTerms();
  const v8TokensSearchTerms = getV8TokensSearchTerms();
  const deprecatedAxSearchTerms = getDeprecatedAxSearchTerms();

  const legacyComponentTokensSet = new Set(legacyComponentTokenList);

  /**
   * Pre-computed regex for legacy component tokens
   */
  const legacyRegex = new RegExp(
    `(${legacyComponentTokenList.map((t) => `${t}:`).join("|")})`,
    "gm",
  );

  /**
   * Pre-computed regex for legacy token definitions (--a-token:)
   * These are custom property definitions that need manual migration.
   */
  const legacyDefinitionRegex = /(--a-[a-zA-Z0-9-]+)(?=\s*:)/gm;

  /**
   * Process each file to find and record token usages
   */
  files.forEach((fileName, index) => {
    const fileSrc = fs.readFileSync(fileName, "utf8");

    /**
     * Create a set of all words in the file to quickly check for potential matches
     */
    const fileWords = new Set(fileSrc.match(/[a-zA-Z0-9_@$-]+/g) || []);

    let lineStarts: number[] | undefined;

    /**
     * Gets line-start positions for the file, caching the result.
     * We only calculate this if we actually find a token match, saving processing time.
     */
    const getLineStartsLazy = () => {
      if (!lineStarts) {
        lineStarts = getLineStarts(fileSrc);
      }
      return lineStarts;
    };

    /**
     * We first parse trough all legacy tokens (--a-) prefixed tokens
     */
    for (const [legacyToken, config] of Object.entries(legacyTokenConfig)) {
      const terms = legacySearchTerms.get(legacyToken);

      /**
       * Optimization: Check if any of the search terms exist in the file words set
       * before running expensive regex operations.
       */
      let found = false;
      if (terms) {
        for (const term of terms) {
          if (fileWords.has(term)) {
            found = true;
            break;
          }
        }
      }
      if (!found) {
        continue;
      }

      for (const [regexKey, regex] of Object.entries(config.regexes)) {
        if (!regex) {
          continue;
        }

        let match: RegExpExecArray | null = regex.exec(fileSrc);

        while (match) {
          const { row, column } = getCharacterPositionInFile(
            match.index,
            getLineStartsLazy(),
          );

          StatusStore.add({
            isLegacy: true,
            comment: config.comment,
            type: regexKey as keyof typeof config.regexes,
            columnNumber: column,
            lineNumber: row,
            canAutoMigrate:
              regexKey === "tailwind"
                ? !!config.twNew
                : config.replacement.length > 0,
            fileName,
            name: match[0],
          });

          match = regex.exec(fileSrc);
        }
      }
    }

    let hasLegacyComponentToken = false;
    for (const token of legacyComponentTokensSet) {
      if (fileWords.has(token)) {
        hasLegacyComponentToken = true;
        break;
      }
    }

    if (hasLegacyComponentToken) {
      legacyRegex.lastIndex = 0;
      let legacyMatch: RegExpExecArray | null = legacyRegex.exec(fileSrc);

      while (legacyMatch !== null) {
        const { row, column } = getCharacterPositionInFile(
          legacyMatch.index,
          getLineStartsLazy(),
        );

        StatusStore.add({
          isLegacy: true,
          type: "component",
          columnNumber: column,
          lineNumber: row,
          canAutoMigrate: false,
          fileName,
          name: legacyMatch[0],
        });

        legacyMatch = legacyRegex.exec(fileSrc);
      }
    }

    /**
     * Detect legacy token definitions (--a-token:)
     * These are custom property definitions using legacy tokens
     * that need manual intervention from the user.
     */
    legacyDefinitionRegex.lastIndex = 0;
    let definitionMatch: RegExpExecArray | null =
      legacyDefinitionRegex.exec(fileSrc);

    while (definitionMatch !== null) {
      const tokenKey = definitionMatch[1].replace("--a-", "");

      /* Only report if it's a known legacy token */
      if (legacyTokenConfig[tokenKey]) {
        const { row, column } = getCharacterPositionInFile(
          definitionMatch.index,
          getLineStartsLazy(),
        );

        StatusStore.add({
          isLegacy: true,
          type: "deprecated",
          columnNumber: column,
          lineNumber: row,
          canAutoMigrate: false,
          fileName,
          name: definitionMatch[1],
          comment:
            "Legacy token definition - requires manual migration to new v8 tokens",
        });
      }

      definitionMatch = legacyDefinitionRegex.exec(fileSrc);
    }

    for (const [newTokenName, config] of Object.entries(v8TokenConfig)) {
      const terms = v8TokensSearchTerms.get(newTokenName);

      /* Optimization: Check if any of the search terms exist in the file words set */
      let found = false;
      if (terms) {
        for (const term of terms) {
          if (fileWords.has(term)) {
            found = true;
            break;
          }
        }
      }
      if (!found) {
        continue;
      }

      for (const [regexKey, regex] of Object.entries(config.regexes)) {
        if (!regex) {
          continue;
        }
        let match: RegExpExecArray | null = regex.exec(fileSrc);

        while (match) {
          const { row, column } = getCharacterPositionInFile(
            match.index,
            getLineStartsLazy(),
          );

          StatusStore.add({
            isLegacy: false,
            type: regexKey as keyof typeof config.regexes,
            columnNumber: column,
            lineNumber: row,
            fileName,
            name: match[0],
          });

          match = regex.exec(fileSrc);
        }
      }
    }

    /**
     * Detect deprecated --ax-border-radius-* tokens that should be migrated to --ax-radius-*
     */
    for (const [deprecatedToken, config] of Object.entries(
      deprecatedAxTokenConfig,
    )) {
      const terms = deprecatedAxSearchTerms.get(deprecatedToken);

      let found = false;
      if (terms) {
        for (const term of terms) {
          if (fileWords.has(term)) {
            found = true;
            break;
          }
        }
      }
      if (!found) {
        continue;
      }

      for (const [regexKey, regex] of Object.entries(config.regexes)) {
        if (!regex) {
          continue;
        }
        let match: RegExpExecArray | null = regex.exec(fileSrc);

        while (match) {
          const { row, column } = getCharacterPositionInFile(
            match.index,
            getLineStartsLazy(),
          );

          StatusStore.add({
            isLegacy: true,
            type: regexKey as keyof typeof config.regexes,
            columnNumber: column,
            lineNumber: row,
            canAutoMigrate: true,
            fileName,
            name: match[0],
            comment: `Deprecated token - migrate to ${config.replacement}`,
          });

          match = regex.exec(fileSrc);
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
  StatusStore.printMigrationHelp();
  console.info("\n");

  return StatusStore;
}

function getLegacySearchTerms() {
  const legacySearchTerms = new Map<string, Set<string>>();
  for (const [legacyToken, config] of Object.entries(legacyTokenConfig)) {
    const terms = new Set<string>();
    const tokenName = `--a-${legacyToken}`;
    terms.add(tokenName);
    terms.add(translateToken(tokenName, "scss"));
    terms.add(translateToken(tokenName, "less"));
    terms.add(translateToken(tokenName, "js"));

    if (config.twOld) {
      config.twOld.split(",").forEach((t) => {
        terms.add(t.trim());
      });
    }
    legacySearchTerms.set(legacyToken, terms);
  }
  return legacySearchTerms;
}

function getV8TokensSearchTerms() {
  const v8TokensSearchTerms = new Map<string, Set<string>>();
  for (const [newTokenName, config] of Object.entries(v8TokenConfig)) {
    const terms = new Set<string>();
    const tokenName = `--ax-${newTokenName}`;
    terms.add(tokenName);
    terms.add(translateToken(tokenName, "scss"));
    terms.add(translateToken(tokenName, "less"));
    terms.add(translateToken(newTokenName, "js"));
    terms.add(newTokenName);

    if (config.tw) {
      config.tw.split(",").forEach((t) => {
        terms.add(t.trim());
      });
    }
    v8TokensSearchTerms.set(newTokenName, terms);
  }
  return v8TokensSearchTerms;
}

/**
 * Configuration for deprecated --ax-* tokens that should be migrated
 */
const deprecatedAxTokenConfig = {
  "border-radius-full": {
    replacement: "--ax-radius-full",
    regexes: getFrameworkRegexes({
      legacy: false,
      token: "--ax-border-radius-full",
      twString: null,
    }),
  },
  "border-radius-small": {
    replacement: "--ax-radius-2",
    regexes: getFrameworkRegexes({
      legacy: false,
      token: "--ax-border-radius-small",
      twString: null,
    }),
  },
  "border-radius-medium": {
    replacement: "--ax-radius-4",
    regexes: getFrameworkRegexes({
      legacy: false,
      token: "--ax-border-radius-medium",
      twString: null,
    }),
  },
  "border-radius-large": {
    replacement: "--ax-radius-8",
    regexes: getFrameworkRegexes({
      legacy: false,
      token: "--ax-border-radius-large",
      twString: null,
    }),
  },
  "border-radius-xlarge": {
    replacement: "--ax-radius-12",
    regexes: getFrameworkRegexes({
      legacy: false,
      token: "--ax-border-radius-xlarge",
      twString: null,
    }),
  },
};

function getDeprecatedAxSearchTerms() {
  const deprecatedAxSearchTerms = new Map<string, Set<string>>();
  for (const deprecatedToken of Object.keys(deprecatedAxTokenConfig)) {
    const terms = new Set<string>();
    const tokenName = `--ax-${deprecatedToken}`;
    terms.add(tokenName);
    terms.add(translateToken(tokenName, "scss"));
    terms.add(translateToken(tokenName, "less"));
    /* JS tokens use Ax prefix */
    const jsToken = translateToken(tokenName, "js");
    terms.add(jsToken);
    deprecatedAxSearchTerms.set(deprecatedToken, terms);
  }
  return deprecatedAxSearchTerms;
}

/**
 * Given the content of a file, returns an array of line start positions.
 */
function getLineStarts(content: string): number[] {
  const starts = [0];
  let lineIndex = content.indexOf("\n", 0);
  while (lineIndex !== -1) {
    starts.push(lineIndex + 1);
    lineIndex = content.indexOf("\n", lineIndex + 1);
  }
  return starts;
}

/**
 * Given a character index and an array of line start positions,
 * returns the corresponding row and column numbers.
 */
function getCharacterPositionInFile(
  index: number,
  lineStarts: number[],
): { row: number; column: number } {
  let low = 0;
  let high = lineStarts.length - 1;
  let lineIndex = 0;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    if (lineStarts[mid] <= index) {
      lineIndex = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return { row: lineIndex + 1, column: index - lineStarts[lineIndex] + 1 };
}

export { getStatus, getCharacterPositionInFile, getLineStarts };
