import fs from "node:fs";
import { describe, expect, test, vi } from "vitest";
import { extractMetadata } from "../parts/extract-metadata";

vi.mock("fs");

const sampleObj = {
  version: 1,
  changelog: [
    {
      description: "Oppdaterte X Y og Z",
      date: "31.10.2023",
      version: 1,
    },
  ],
};

const sampleString = JSON.stringify(sampleObj, null, 2);

describe("Testing extractMetadata function", () => {
  test("extractMetadata should return undefined if directory does not exist", () => {
    vi.mocked(fs.existsSync).mockResolvedValue(false);
    const metadata = extractMetadata("nonexistent", "templates");

    expect(metadata).toBeUndefined();
  });

  test("extractMetadata should read meta.json from /pages/templates directory", () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readdirSync).mockReturnValue([
      "file1.tsx",
      "meta.json",
    ] as unknown as fs.Dirent[]);
    vi.mocked(fs.readFileSync).mockReturnValue(sampleString);

    const metadata = extractMetadata("eksempler", "templates");

    expect(metadata).toEqual(sampleObj);
  });
});
