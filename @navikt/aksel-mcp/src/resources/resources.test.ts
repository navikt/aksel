import { describe, expect, test } from "vitest";
import { designTokensResource } from "./design-tokens.js";

describe("Resources", () => {
  describe("designTokensResource", () => {
    test("should return lightweight token list", async () => {
      const result = await designTokensResource.callback(
        new URL("aksel-tokens://list"),
      );

      expect(result.contents).toHaveLength(1);
      expect(result.contents[0].uri).toBe("aksel-tokens://list");
      expect(result.contents[0].mimeType).toBe("application/json");

      const tokenList = JSON.parse(result.contents[0].text);
      expect(Array.isArray(tokenList)).toBe(true);
      expect(tokenList.length).toBeGreaterThan(0);

      // Verify it's a summary (only has key fields, not verbose fields)
      const firstToken = tokenList[0];
      expect(firstToken).toHaveProperty("name");
      expect(firstToken).toHaveProperty("comment");
      expect(firstToken).toHaveProperty("category");
      expect(firstToken).toHaveProperty("type");

      // Should NOT have verbose fields like rawValue, jsValue, etc.
      expect(firstToken).not.toHaveProperty("rawValue");
      expect(firstToken).not.toHaveProperty("jsValue");
    });

    test("should have proper metadata", () => {
      expect(designTokensResource.name).toBe("Aksel Design Tokens List");
      expect(designTokensResource.uri).toBe("aksel-tokens://list");
      expect(designTokensResource.mimeType).toBe("application/json");
      expect(designTokensResource.description).toContain(
        "Lightweight list of all Aksel design tokens",
      );
    });
  });
});
