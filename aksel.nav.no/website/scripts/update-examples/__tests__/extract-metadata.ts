import fs from "fs";
import { extractMetadata } from "../parts/extract-metadata";

jest.mock("fs");

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
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const metadata = extractMetadata("nonexistent", "templates");

    expect(metadata).toBeUndefined();
  });

  test("extractMetadata should read meta.json from /pages/templates directory", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readdirSync as jest.Mock).mockReturnValue(["file1.tsx", "meta.json"]);
    (fs.readFileSync as jest.Mock).mockReturnValue(sampleString);

    const metadata = extractMetadata("eksempler", "templates");

    expect(metadata).toEqual(sampleObj);
  });
});
