import { describe, expect, it } from "vitest";
import { sortHeadings } from "../sort-headings";

describe("sortHeadings", () => {
  it("should sort plain text headings", () => {
    const headings = ["Bare lyd og video", "Alfabetisk", "Zebra"];
    const sortedHeadings = headings.sort(sortHeadings);
    expect(sortedHeadings).toEqual([
      "Alfabetisk",
      "Bare lyd og video",
      "Zebra",
    ]);
  });

  it("should sort headings with numbers correctly", () => {
    const headings = [
      "1.2.10 Bare lyd og video",
      "1.2.11 Bare lyd og video",
      "1.2.9 Bare lyd og video",
    ];
    const sortedHeadings = headings.sort(sortHeadings);
    expect(sortedHeadings).toEqual([
      "1.2.9 Bare lyd og video",
      "1.2.10 Bare lyd og video",
      "1.2.11 Bare lyd og video",
    ]);
  });

  it("should handle mixed plain text and numbered headings", () => {
    const headings = [
      "Bare lyd og video",
      "1.2.10 Bare lyd og video",
      "Alfabetisk",
      "1.2.9 Bare lyd og video",
    ];
    const sortedHeadings = headings.sort(sortHeadings);
    expect(sortedHeadings).toEqual([
      "1.2.9 Bare lyd og video",
      "1.2.10 Bare lyd og video",
      "Alfabetisk",
      "Bare lyd og video",
    ]);
  });

  it("should handle headings with different number of parts", () => {
    const headings = [
      "1.10 Bare lyd og video",
      "1.2.10 Bare lyd og video",
      "1.2 Bare lyd og video",
    ];
    const sortedHeadings = headings.sort(sortHeadings);
    expect(sortedHeadings).toEqual([
      "1.2 Bare lyd og video",
      "1.2.10 Bare lyd og video",
      "1.10 Bare lyd og video",
    ]);
  });

  it("should handle headings with non-numeric parts", () => {
    const headings = [
      "1.2a Bare lyd og video",
      "1.b2 Bare lyd og video",
      "1.2 Bare lyd og video",
    ];
    const sortedHeadings = headings.sort(sortHeadings);
    expect(sortedHeadings).toEqual([
      "1.2 Bare lyd og video",
      "1.2a Bare lyd og video",
      "1.b2 Bare lyd og video",
    ]);
  });
});
