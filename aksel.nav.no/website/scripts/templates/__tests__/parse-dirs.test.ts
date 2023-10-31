import fs from "fs";
import { parseCodeFiles } from "../parse-code-files";
import { codeAfter, codeBefore } from "./mockdata";

jest.mock("fs");

describe("Testing parseCodeFiles function", () => {
  test("parseCodeFiles should return an empty array if directory does not exist", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const files = parseCodeFiles("nonexistent", "eksempler");

    expect(files).toEqual([]);
  });

  test("parseCodeFiles should read files from /pages/eksempler directory", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readdirSync as jest.Mock).mockReturnValue(["file1.tsx", "file2.tsx"]);
    (fs.readFileSync as jest.Mock).mockReturnValue(codeBefore);

    const files = parseCodeFiles("eksempler", "eksempler");

    expect(files.length).toBeGreaterThan(0);
    expect(files[0].innhold).toEqual(codeAfter);
  });

  test("parseCodeFiles should read files from /pages/templates directory", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readdirSync as jest.Mock).mockReturnValue(["file1.tsx", "file2.tsx"]);
    (fs.readFileSync as jest.Mock).mockReturnValue(codeBefore);

    const files = parseCodeFiles("templates", "templates");

    expect(files.length).toBeGreaterThan(0);
    expect(files[0].innhold).toEqual(codeAfter);
  });
});
