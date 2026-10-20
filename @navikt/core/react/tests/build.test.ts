import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

const sourceDir = resolve(__dirname, "../src");
const serverSafeEntrypoints = new Set(["./utils-external"]);

/**
 * Makes sure every public component entrypoint is marked as a client module with "use client"
 */
describe("public entrypoint client boundaries", () => {
  test("marks every public component entrypoint as a client module", () => {
    const rootSource = readFileSync(resolve(sourceDir, "index.ts"), "utf8");
    const exportSources = [
      ...rootSource.matchAll(/\bfrom\s+["'](\.[^"']+)["']/g),
    ];

    expect(exportSources.length).toBeGreaterThan(0);

    for (const [, specifier] of exportSources) {
      if (serverSafeEntrypoints.has(specifier)) {
        continue;
      }

      const entrypoint = readFileSync(
        resolve(sourceDir, specifier, "index.ts"),
        "utf8",
      );

      expect(entrypoint, `${specifier}/index.ts`).toMatch(
        /^\s*["']use client["'];/,
      );
    }
  });
});
