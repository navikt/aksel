import { describe, expect, test } from "vitest";
import { z } from "zod";
import { metadata } from "../resources/icon-categories.js";
import { getAkselDocs } from "./aksel-docs.js";
import { iconSearchTool } from "./icon-search.js";
import { tokenDetailsTool } from "./token-details.js";

describe("Tools", () => {
  describe("getAkselDocs", () => {
    test("should require path to end with .md", () => {
      const strictSchema = z.object(getAkselDocs.inputSchema).strict();

      const valid = strictSchema.safeParse({
        path: "/komponenter/core/button.md",
      });
      const invalid = strictSchema.safeParse({
        path: "/komponenter/core/button",
      });
      const empty = strictSchema.safeParse({
        path: "",
      });

      expect(valid.success).toBe(true);
      expect(invalid.success).toBe(false);
      expect(empty.success).toBe(false);
    });
  });

  describe("tokenDetailsTool", () => {
    test("should accept unknown tokenName values in schema", () => {
      const strictSchema = z.object(tokenDetailsTool.inputSchema).strict();

      const valid = strictSchema.safeParse({ tokenName: "shadow-dialog" });
      const unknown = strictSchema.safeParse({
        tokenName: "nonexistent-token-xyz",
      });
      const empty = strictSchema.safeParse({ tokenName: "" });

      expect(valid.success).toBe(true);
      expect(unknown.success).toBe(true);
      expect(empty.success).toBe(false);
    });

    test("should reject unknown fields in strict mode", () => {
      const strictSchema = z.object(tokenDetailsTool.inputSchema).strict();

      const parseResult = strictSchema.safeParse({
        tokenName: "shadow-dialog",
        extraField: "unexpected",
      });

      expect(parseResult.success).toBe(false);
    });

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

  describe("iconSearchTool", () => {
    test("should reject invalid enum inputs", () => {
      const strictSchema = z.object(iconSearchTool.inputSchema).strict();

      const invalidCategory = strictSchema.safeParse({
        category: "NotARealCategory",
      });
      const invalidSubcategory = strictSchema.safeParse({
        subcategory: "NotARealSubcategory",
      });
      const invalidVariant = strictSchema.safeParse({
        variant: "outline",
      });

      expect(invalidCategory.success).toBe(false);
      expect(invalidSubcategory.success).toBe(false);
      expect(invalidVariant.success).toBe(false);
    });

    test("should search icons by keyword", async () => {
      const firstKeyword = Object.values(metadata)[0]?.keywords?.[0];

      expect(firstKeyword).toBeDefined();

      const result = await iconSearchTool.callback({
        keyword: firstKeyword,
        limit: 10,
        category: undefined,
        subcategory: undefined,
        variant: "both",
      });

      const response = JSON.parse(result);
      expect(response).toHaveProperty("icons");
      expect(Array.isArray(response.icons)).toBe(true);
      expect(response.totalMatches).toBeGreaterThan(0);
      expect(response.icons[0]).toHaveProperty("name");
      expect(response.icons[0]).toHaveProperty("category");
      expect(response.icons[0]).toHaveProperty("variant");
    });

    test("should filter icons by category", async () => {
      const result = await iconSearchTool.callback({
        subcategory: undefined,
        variant: "both",
        keyword: undefined,
        category: "Interface",
        limit: 5,
      });

      const response = JSON.parse(result);
      expect(response).toHaveProperty("icons");
      expect(response.icons.length).toBeGreaterThan(0);
      expect(
        response.icons.every((icon: any) => icon.category === "Interface"),
      ).toBe(true);
    });

    test("should return helpful message when no results", async () => {
      const result = await iconSearchTool.callback({
        category: undefined,
        subcategory: undefined,
        variant: "both",
        limit: 20,
        keyword: "nonexistent-icon-xyz-123",
      });

      const response = JSON.parse(result);
      expect(response).toHaveProperty("message");
      expect(response.message).toContain("No icons found");
    });

    test("should have proper metadata", () => {
      expect(iconSearchTool.name).toBe("aksel_icons_search");
      expect(iconSearchTool.description).toContain(
        "Search and filter Aksel icons",
      );
      expect(iconSearchTool.inputSchema).toHaveProperty("keyword");
      expect(iconSearchTool.inputSchema).toHaveProperty("category");
    });
  });
});
