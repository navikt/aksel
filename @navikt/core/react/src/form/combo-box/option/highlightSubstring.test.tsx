import { describe, expect, test } from "vitest";
import { getHighlightRange } from "./highlightSubstring";

const highlighted = (text: string, substring: string) => {
  const range = getHighlightRange(text, substring);
  return range && text.substring(...range);
};

describe("getHighlightRange", () => {
  test("matches case-insensitively", () => {
    expect(getHighlightRange("Norge", "OR")).toEqual([1, 3]);
  });

  test("returns null when there is no match", () => {
    expect(getHighlightRange("Norge", "x")).toBeUndefined();
  });

  test("handles characters that get longer when lowercased", () => {
    expect(highlighted("İstanbul", "an")).toBe("an");
    expect(highlighted("İzmir og Antalya", "an")).toBe("An");
    expect(highlighted("İzmir", "İz")).toBe("İz");
  });

  test("includes the whole original character when only part of its lowercase form matches", () => {
    expect(highlighted("İstanbul", "i")).toBe("İ");
  });
});
