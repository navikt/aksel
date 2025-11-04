import fastglob from "fast-glob";
import path from "node:path";
import { describe, expect, test } from "vitest";

/**
 * Darkside config might have some new files added. We can skip these when checking for equality.
 */
const newFiles = ["theme"];
const deprecatedFiles: string[] = [];

describe("Check that old and new (darkside) bundle matches", () => {
  test("Darkside includes the same files as old bundle", () => {
    const oldBundleDir = path.join(__dirname, "../../dist");
    const darksideDir = path.join(__dirname, "../../dist/darkside");

    const oldFiles = fastglob.sync("**/*.css", {
      cwd: oldBundleDir,
      ignore: ["**/version/**", "**/darkside/**"],
    });

    const darksideFiles = fastglob.sync("**/*.css", {
      cwd: darksideDir,
      ignore: ["**/version/**"],
    });

    expect(oldFiles.length).toBeGreaterThan(0);
    expect(darksideFiles.length).toBeGreaterThan(0);

    // Compare file names
    oldFiles.forEach((file) => {
      if (deprecatedFiles.find((oldFile) => file.includes(oldFile))) {
        return;
      }
      expect(darksideFiles).toContain(file);
    });

    darksideFiles.forEach((file) => {
      if (newFiles.find((newFile) => file.includes(newFile))) {
        return;
      }
      expect(oldFiles).toContain(file);
    });

    /**
     * Check that darkside has the same amount of files as old bundle
     */
    expect(
      darksideFiles.length - newFiles.length * 2 + deprecatedFiles.length * 2,
    ).toBe(oldFiles.length);
  });
});
