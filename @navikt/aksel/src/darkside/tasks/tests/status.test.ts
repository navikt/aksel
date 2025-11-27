import { describe, expect, test } from "vitest";
import { getWordPositionInFile } from "../status";

describe("getWordPositionInFile", () => {
  test("should return row 1, column 1 for the start of the file", () => {
    const content = "const foo = 'bar';";
    expect(getWordPositionInFile(content, 0)).toEqual({ row: 1, column: 1 });
  });

  test("should return correct column for position within the first line", () => {
    const content = "const foo = 'bar';";
    // Index 6 is 'f' in 'foo'
    expect(getWordPositionInFile(content, 6)).toEqual({ row: 1, column: 7 });
  });

  test("should return correct row and column for start of second line", () => {
    const content = "line1\nline2";
    // Index 6 is 'l' in 'line2' (5 chars + 1 newline)
    expect(getWordPositionInFile(content, 6)).toEqual({ row: 2, column: 1 });
  });

  test("should return correct row and column for position within second line", () => {
    const content = "line1\nline2";
    // Index 10 is '2' in 'line2'
    expect(getWordPositionInFile(content, 10)).toEqual({ row: 2, column: 5 });
  });

  test("should handle multiple consecutive newlines", () => {
    const content = "a\n\nb";
    // Index 3 is 'b' (a=0, \n=1, \n=2, b=3)
    expect(getWordPositionInFile(content, 3)).toEqual({ row: 3, column: 1 });
  });

  test("should handle index pointing to a newline character itself", () => {
    const content = "a\nb";
    // Index 1 is the newline character
    expect(getWordPositionInFile(content, 1)).toEqual({ row: 1, column: 2 });
  });

  test("should handle empty string input", () => {
    expect(getWordPositionInFile("", 0)).toEqual({ row: 1, column: 1 });
  });
});
