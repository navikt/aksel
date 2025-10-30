import fs from "node:fs";
import { describe, expect, test, vi } from "vitest";
import { parseCodeFiles } from "../parts/parse-code-files";
import { codeAfter, codeBefore } from "./mockdata";

vi.mock("fs");

describe("Testing parseCodeFiles function", () => {
  test("parseCodeFiles should return an empty array if directory does not exist", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    const files = await parseCodeFiles("nonexistent", "eksempler");

    expect(files).toEqual([]);
  });

  test("parseCodeFiles should read files from /pages/eksempler directory", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readdirSync).mockReturnValue([
      "file1.tsx",
      "file2.tsx",
    ] as unknown as fs.Dirent[]);
    vi.mocked(fs.readFileSync).mockReturnValue(codeBefore);

    const files = await parseCodeFiles("eksempler", "eksempler");

    expect(files.length).toBeGreaterThan(0);
    expect(files[0].innhold).toEqual(codeAfter);
  });

  test("parseCodeFiles should read files from /pages/templates directory", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readdirSync).mockReturnValue([
      "file1.tsx",
      "file2.tsx",
    ] as unknown as fs.Dirent[]);
    vi.mocked(fs.readFileSync).mockReturnValue(codeBefore);

    const files = await parseCodeFiles("templates", "templates");

    expect(files.length).toBeGreaterThan(0);
    expect(files[0].innhold).toEqual(codeAfter);
  });
});
