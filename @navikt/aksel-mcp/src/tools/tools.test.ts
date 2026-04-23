import { describe, expect, test } from "vitest";
import { iconSearchTool } from "./icon-search.js";
import { akselMigrationsTool } from "./migrations.js";
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

  describe("iconSearchTool", () => {
    test("should search icons by keyword", async () => {
      const result = await iconSearchTool.callback({
        keyword: "chat",
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

  describe("akselMigrationsTool", () => {
    test("should return all migrations", async () => {
      const result = await akselMigrationsTool.callback({});
      const response = JSON.parse(result);

      expect(response).toHaveProperty("cliVersion");
      expect(response).toHaveProperty("migrations");
      expect(response).toHaveProperty("runCommand");
      expect(response.migrations).toHaveProperty("v8");
      expect(response.migrations.v8.length).toBeGreaterThan(0);
      expect(response.migrations.v8[0]).toHaveProperty("name");
      expect(response.migrations.v8[0]).toHaveProperty("description");
    });

    test("should include warnings when present", async () => {
      const result = await akselMigrationsTool.callback({});
      const response = JSON.parse(result);

      const v8Box = response.migrations.v8.find(
        (m: any) => m.name === "v8-box",
      );
      expect(v8Box).toBeDefined();
      expect(v8Box).toHaveProperty("warning");
    });

    test("should omit warning field when not present", async () => {
      const result = await akselMigrationsTool.callback({});
      const response = JSON.parse(result);

      const v8BoxNew = response.migrations.v8.find(
        (m: any) => m.name === "v8-box-new",
      );
      expect(v8BoxNew).toBeDefined();
      expect(v8BoxNew).not.toHaveProperty("warning");
    });

    test("should have proper metadata", () => {
      expect(akselMigrationsTool.name).toBe("aksel_migrations");
      expect(akselMigrationsTool.description).toContain(
        "List all available Aksel codemods",
      );
    });
  });
});
