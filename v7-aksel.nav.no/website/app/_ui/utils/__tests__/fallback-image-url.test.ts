import { describe, expect, test } from "vitest";
import { fallbackImageUrl } from "../fallback-image-url";

describe("fallbackImageUrl", () => {
  test("should return OG image URL with correct format", () => {
    const result = fallbackImageUrl("test-key", "OG");
    expect(result).toMatch(
      /^https:\/\/aksel\.nav\.no\/images\/og\/blogg\/image-[1-9]\.png$/,
    );
  });

  test("should return thumbnail image URL with correct format", () => {
    const result = fallbackImageUrl("test-key", "thumbnail");
    expect(result).toMatch(/^\/images\/thumbnail\/blogg\/image-[1-9]\.svg$/);
  });

  test("should return consistent image for same key", () => {
    const key = "same-blog-post";
    const result1 = fallbackImageUrl(key, "OG");
    const result2 = fallbackImageUrl(key, "OG");
    expect(result1).toBe(result2);
  });

  test("should return consistent image for same key across variants", () => {
    const key = "same-blog-post";
    const ogResult = fallbackImageUrl(key, "OG");
    const thumbnailResult = fallbackImageUrl(key, "thumbnail");

    // Extract image numbers from URLs
    const ogImageNum = ogResult.match(/image-(\d+)\.png$/)?.[1];
    const thumbnailImageNum = thumbnailResult.match(/image-(\d+)\.svg$/)?.[1];

    expect(ogImageNum).toBe(thumbnailImageNum);
  });

  test("should handle empty string key", () => {
    const result = fallbackImageUrl("", "OG");
    expect(result).toMatch(
      /^https:\/\/aksel\.nav\.no\/images\/og\/blogg\/image-[1-9]\.png$/,
    );
  });

  test("should handle special characters in key", () => {
    const result = fallbackImageUrl(
      "test-key-with-special-chars!@#$%",
      "thumbnail",
    );
    expect(result).toMatch(/^\/images\/thumbnail\/blogg\/image-[1-9]\.svg$/);
  });

  test("should return different images for different keys", () => {
    const results = new Set();
    // Test multiple keys to increase chance of getting different images
    for (let i = 0; i < 20; i++) {
      results.add(fallbackImageUrl(`test-key-${i}`, "OG"));
    }
    // Should have more than 1 unique result with 20 different keys
    expect(results.size).toBeGreaterThan(1);
  });

  test("should return image numbers within valid range (1-9)", () => {
    const keys = ["test1", "test2", "test3", "test4", "test5"];

    keys.forEach((key) => {
      const result = fallbackImageUrl(key, "OG");
      const imageNum = result.match(/image-(\d+)\.png$/)?.[1];
      const num = parseInt(imageNum || "0", 10);
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(9);
    });
  });

  test("should use correct base URLs for each variant", () => {
    const key = "test-key";
    const ogResult = fallbackImageUrl(key, "OG");
    const thumbnailResult = fallbackImageUrl(key, "thumbnail");

    expect(ogResult).toContain("https://aksel.nav.no/images/og/blogg/");
    expect(thumbnailResult).toContain("/images/thumbnail/blogg/");
  });
});
