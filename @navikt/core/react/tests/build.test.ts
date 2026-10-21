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
    const previewSource = readFileSync(
      resolve(sourceDir, "preview.ts"),
      "utf8",
    );
    const exportSources = [
      ...rootSource.matchAll(/\bfrom\s+["'](\.[\w./-]+)["']/g),
      ...previewSource.matchAll(/\bfrom\s+["'](\.[\w./-]+)["']/g),
    ];

    expect(exportSources.length).toBeGreaterThan(0);

    for (const [, specifier] of exportSources) {
      if (serverSafeEntrypoints.has(specifier)) {
        continue;
      }

      const isPreviewOverride = specifier.includes("index-deprecated");

      const fileToCheck = isPreviewOverride
        ? "index-deprecated.ts"
        : "index.ts";

      const entrypoint = readFileSync(
        resolve(
          sourceDir,
          specifier.replace("/index-deprecated", ""),
          fileToCheck,
        ),
        "utf8",
      );

      expect(
        entrypoint,
        `${specifier.replace("/index-deprecated", "")}/${fileToCheck}`,
      ).toMatch(/^\s*["']use client["'];/);
    }
  });
});
