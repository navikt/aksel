import { describe, expect, test } from "vitest";
import { getCharacterPositionInFile, getLineStarts } from "../status";

describe("getCharacterPositionInFile", () => {
  test("should return row 1, column 1 for the start of the file", () => {
    const content = "const foo = 'bar';";
    const lineStarts = getLineStarts(content);
    expect(getCharacterPositionInFile(0, lineStarts)).toEqual({
      row: 1,
      column: 1,
    });
  });

  test("should return correct column for position within the first line", () => {
    const content = "const foo = 'bar';";
    const lineStarts = getLineStarts(content);
    // Index 6 is 'f' in 'foo'
    expect(getCharacterPositionInFile(6, lineStarts)).toEqual({
      row: 1,
      column: 7,
    });
  });

  test("should return correct row and column for start of second line", () => {
    const content = "line1\nline2";
    const lineStarts = getLineStarts(content);
    // Index 6 is 'l' in 'line2' (5 chars + 1 newline)
    expect(getCharacterPositionInFile(6, lineStarts)).toEqual({
      row: 2,
      column: 1,
    });
  });

  test("should return correct row and column for position within second line", () => {
    const content = "line1\nline2";
    const lineStarts = getLineStarts(content);
    // Index 10 is '2' in 'line2'
    expect(getCharacterPositionInFile(10, lineStarts)).toEqual({
      row: 2,
      column: 5,
    });
  });

  test("should handle multiple consecutive newlines", () => {
    const content = "a\n\nb";
    const lineStarts = getLineStarts(content);
    // Index 3 is 'b' (a=0, \n=1, \n=2, b=3)
    expect(getCharacterPositionInFile(3, lineStarts)).toEqual({
      row: 3,
      column: 1,
    });
  });

  test("should handle index pointing to a newline character itself", () => {
    const content = "a\nb";
    const lineStarts = getLineStarts(content);
    // Index 1 is the newline character
    expect(getCharacterPositionInFile(1, lineStarts)).toEqual({
      row: 1,
      column: 2,
    });
  });

  test("should handle empty string input", () => {
    const content = "";
    const lineStarts = getLineStarts(content);
    expect(getCharacterPositionInFile(0, lineStarts)).toEqual({
      row: 1,
      column: 1,
    });
  });
});

describe("getLineStarts", () => {
  test("should return [0] for an empty string", () => {
    expect(getLineStarts("")).toEqual([0]);
  });

  test("should return [0] for a string with no newlines", () => {
    const content = "const foo = 'bar';";
    expect(getLineStarts(content)).toEqual([0]);
  });

  test("should identify start indices for multiple lines", () => {
    const content = "line1\nline2\nline3";
    // line1 starts at 0
    // line2 starts at 6 (5 chars + \n)
    // line3 starts at 12 (5 chars + \n)
    expect(getLineStarts(content)).toEqual([0, 6, 12]);
  });

  test("should handle leading newline", () => {
    const content = "\nline2";
    // line1 (empty) starts at 0
    // line2 starts at 1
    expect(getLineStarts(content)).toEqual([0, 1]);
  });

  test("should handle trailing newline", () => {
    const content = "line1\n";
    // line1 starts at 0
    // line2 (empty) starts at 6
    expect(getLineStarts(content)).toEqual([0, 6]);
  });

  test("should handle consecutive newlines", () => {
    const content = "a\n\nb";
    // line1 starts at 0
    // line2 (empty) starts at 2
    // line3 starts at 3
    expect(getLineStarts(content)).toEqual([0, 2, 3]);
  });
});
