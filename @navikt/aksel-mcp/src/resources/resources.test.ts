import { describe, expect, test } from "vitest";
import { designTokensResource } from "./design-tokens.js";
import { iconCategoriesResource } from "./icon-categories.js";
import { migrationsResource } from "./migrations.js";

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

  describe("iconCategoriesResource", () => {
    test("should return categories with subcategories", async () => {
      const result = await iconCategoriesResource.callback(
        new URL("aksel-icons://categories"),
      );

      expect(result.contents).toHaveLength(1);
      expect(result.contents[0].uri).toBe("aksel-icons://categories");
      expect(result.contents[0].mimeType).toBe("application/json");

      const data = JSON.parse(result.contents[0].text);
      expect(data).toHaveProperty("categories");
      expect(data).toHaveProperty("totalIcons");
      expect(Array.isArray(data.categories)).toBe(true);
      expect(data.categories.length).toBeGreaterThan(0);

      const firstCategory = data.categories[0];
      expect(firstCategory).toHaveProperty("category");
      expect(firstCategory).toHaveProperty("subcategories");
      expect(firstCategory).toHaveProperty("iconCount");
      expect(Array.isArray(firstCategory.subcategories)).toBe(true);
    });

    test("should have proper metadata", () => {
      expect(iconCategoriesResource.name).toBe("Aksel Icon Categories");
      expect(iconCategoriesResource.uri).toBe("aksel-icons://categories");
      expect(iconCategoriesResource.mimeType).toBe("application/json");
      expect(iconCategoriesResource.description).toContain(
        "List of all icon categories",
      );
    });
  });

  describe("migrationsResource", () => {
    test("should return all migrations", async () => {
      const result = await migrationsResource.callback(
        new URL("aksel-migrations://list"),
      );

      expect(result.contents).toHaveLength(1);
      expect(result.contents[0].uri).toBe("aksel-migrations://list");
      expect(result.contents[0].mimeType).toBe("application/json");

      const response = JSON.parse(result.contents[0].text);
      expect(response).toHaveProperty("cliVersion");
      expect(response).toHaveProperty("migrations");
      expect(response).toHaveProperty("runCommand");
      expect(response.migrations).toHaveProperty("v8");
      expect(response.migrations.v8.length).toBeGreaterThan(0);
      expect(response.migrations.v8[0]).toHaveProperty("name");
      expect(response.migrations.v8[0]).toHaveProperty("description");
    });

    test("should include warnings when present", async () => {
      const result = await migrationsResource.callback(
        new URL("aksel-migrations://list"),
      );
      const response = JSON.parse(result.contents[0].text);

      const v8Box = response.migrations.v8.find(
        (m: any) => m.name === "v8-box",
      );
      expect(v8Box).toBeDefined();
      expect(v8Box).toHaveProperty("warning");
    });

    test("should omit warning field when not present", async () => {
      const result = await migrationsResource.callback(
        new URL("aksel-migrations://list"),
      );
      const response = JSON.parse(result.contents[0].text);

      const v8BoxNew = response.migrations.v8.find(
        (m: any) => m.name === "v8-box-new",
      );
      expect(v8BoxNew).toBeDefined();
      expect(v8BoxNew).not.toHaveProperty("warning");
    });

    test("should have proper metadata", () => {
      expect(migrationsResource.name).toBe("Aksel Migrations List");
      expect(migrationsResource.uri).toBe("aksel-migrations://list");
      expect(migrationsResource.mimeType).toBe("application/json");
      expect(migrationsResource.description).toContain(
        "List all available Aksel codemods",
      );
    });
  });
});
