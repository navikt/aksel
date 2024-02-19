import { describe, expect, test } from "vitest";
import { getDirectories } from "../parts/get-directories";

describe("Testing getDirectories function", () => {
  test("getDirectories should list directories in /pages/eksempler", () => {
    const folders = getDirectories("eksempler");

    expect(folders.length).toBeGreaterThan(0);
  });

  test("getDirectories should list directories in /pages/templates", () => {
    const folders = getDirectories("templates");

    expect(folders.length).toBeGreaterThan(0);
  });
});
