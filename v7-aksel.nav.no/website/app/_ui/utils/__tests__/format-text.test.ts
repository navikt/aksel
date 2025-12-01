import { describe, expect, test } from "vitest";
import { formatDateString } from "../format-date";
import { abbrName, removeEmojiesFromText } from "../format-text";

describe("Format text utilities", () => {
  describe("formatDateString", () => {
    test("should update date to corrent format", () => {
      const date = "2022-06-09T11:05:48Z";
      const date2 = "2021-03-02T12:05:48Z";

      expect(formatDateString(date)).toEqual("9. juni 2022");
      expect(formatDateString(date2)).toEqual("2. mars 2021");
    });
  });

  describe("abbrName", () => {
    test("should return single name unchanged", () => {
      expect(abbrName("Erik")).toBe("Erik");
    });

    test("should return two names unchanged", () => {
      expect(abbrName("Erik Hansen")).toBe("Erik Hansen");
    });

    test("should abbreviate middle name in three names", () => {
      expect(abbrName("Erik Magnus Hansen")).toBe("Erik M. Hansen");
    });

    test("should abbreviate multiple middle names", () => {
      expect(abbrName("Erik Magnus Ole Hansen")).toBe("Erik M. O. Hansen");
    });

    test("should handle empty string", () => {
      expect(abbrName("")).toBe("");
    });

    test("should handle names with extra spaces", () => {
      expect(abbrName("Erik  Magnus  Hansen")).toBe("Erik M. Hansen");
    });
  });
  describe("removeEmojiesFromText", () => {
    test("should remove common emojis from text", () => {
      expect(removeEmojiesFromText("Hello 😀 world 🎉")).toBe("Hello world");
    });

    test("should remove heart emoji", () => {
      expect(removeEmojiesFromText("Hello world ❤️")).toBe("Hello world");
    });

    test("should return text unchanged when no emojis present", () => {
      expect(removeEmojiesFromText("Hello world")).toBe("Hello world");
    });

    test("should handle empty string", () => {
      expect(removeEmojiesFromText("")).toBe("");
    });

    test("should remove all emojis from text with only emojis", () => {
      expect(removeEmojiesFromText("😀🎉❤️🔥")).toBe("");
    });

    test("should remove multiple consecutive emojis", () => {
      expect(removeEmojiesFromText("Hello world 🎉🎊🥳")).toBe("Hello world");
    });

    test("should normalize multiple spaces after removing emojis", () => {
      expect(removeEmojiesFromText("Hello 😀 😀 world")).toBe("Hello world");
    });

    test("should trim whitespace from result", () => {
      expect(removeEmojiesFromText("  Hello world 🎉  ")).toBe("Hello world");
    });
  });
});
