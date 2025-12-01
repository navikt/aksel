import { describe, expect, test } from "vitest";
import { sanitizeSlug } from "../../util";

describe("Testing sanitizeSlug function", () => {
  test("sanitizeSlug should return empty string if input is empty", () => {
    const result = sanitizeSlug("");
    expect(result).toBe("");
  });

  test("sanitizeSlug should convert input to lower case", () => {
    const result = sanitizeSlug("TEST");
    expect(result).toBe("test");
  });

  test("sanitizeSlug should replace spaces with hyphens", () => {
    const result = sanitizeSlug("test slug");
    expect(result).toBe("test-slug");
  });

  test("sanitizeSlug should replace multiple spaces with a single hyphen", () => {
    const result = sanitizeSlug("test   slug");
    expect(result).toBe("test-slug");
  });

  test("sanitizeSlug should replace multiple hyphens with a single hyphen", () => {
    const result = sanitizeSlug("test--slug");
    expect(result).toBe("test-slug");
  });

  test("sanitizeSlug should replace special characters æ, å, ø", () => {
    const result = sanitizeSlug("tæst å slug ø");
    expect(result).toBe("taest-a-slug-o");
  });

  test("sanitizeSlug should remove special characters", () => {
    const result = sanitizeSlug("test!slug#");
    expect(result).toBe("testslug");
  });

  test("sanitizeSlug should replace accented characters with non-accented equivalents", () => {
    const result = sanitizeSlug("tést slüg ñ");
    expect(result).toBe("test-slug-n");
  });
});
