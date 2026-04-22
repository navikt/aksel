import { describe, expect, test } from "vitest";
import { tokenDetailsTool } from "./token-details.js";

describe("Tools", () => {
  describe("tokenDetailsTool", () => {
    test("should fetch details for valid token", async () => {
      const result = await tokenDetailsTool.callback({
        tokenName: "shadow-dialog",
      });

      const token = JSON.parse(result);
      expect(token).toHaveProperty("name", "shadow-dialog");
      expect(token).toHaveProperty("value");
      expect(token).toHaveProperty("rawValue");
      expect(token).toHaveProperty("comment");
      expect(token).toHaveProperty("cssValue");
      expect(token).toHaveProperty("jsValue");
    });

    test("should return error with suggestions for similar tokens", async () => {
      const result = await tokenDetailsTool.callback({
        tokenName: "shadow",
      });

      const response = JSON.parse(result);
      expect(response).toHaveProperty("error");
      expect(response).toHaveProperty("similarTokens");
      expect(Array.isArray(response.similarTokens)).toBe(true);
    });

    test("should return error for non-existent token", async () => {
      const result = await tokenDetailsTool.callback({
        tokenName: "nonexistent-token-xyz",
      });

      const response = JSON.parse(result);
      expect(response).toHaveProperty("error");
      expect(response.error).toContain("not found");
    });

    test("should have proper metadata", () => {
      expect(tokenDetailsTool.name).toBe("aksel_token_details");
      expect(tokenDetailsTool.description).toContain(
        "Fetch complete details for a specific Aksel design token",
      );
      expect(tokenDetailsTool.inputSchema).toHaveProperty("tokenName");
    });
  });
});
