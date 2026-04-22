import { describe, expect, test } from "vitest";
import { designTokensResource } from "./design-tokens.js";

describe("Resources", () => {
  describe("designTokensResource", () => {
    test("should return token data as JSON", async () => {
      const result = await designTokensResource.callback(
        new URL("aksel-tokens://all"),
      );

      expect(result.contents).toHaveLength(1);
      expect(result.contents[0].uri).toBe("aksel-tokens://all");
      expect(result.contents[0].mimeType).toBe("application/json");

      const tokenData = JSON.parse(result.contents[0].text);
      expect(tokenData).toHaveProperty("breakpoints");
      expect(tokenData).toHaveProperty("font");
      expect(Array.isArray(tokenData.breakpoints)).toBe(true);
    });

    test("should have proper metadata", () => {
      expect(designTokensResource.name).toBe("Aksel Design Tokens");
      expect(designTokensResource.uri).toBe("aksel-tokens://all");
      expect(designTokensResource.mimeType).toBe("application/json");
      expect(designTokensResource.description).toContain(
        "Complete Aksel design token catalog",
      );
    });
  });
});
