import { describe, expect, test } from "vitest";
import { iconsCatalogResource } from "./icons-catalog.js";
import { migrationsCatalogResource } from "./migrations-catalog.js";
import { tokensCatalogResource } from "./tokens-catalog.js";

describe("Resources", () => {
  describe("tokensCatalogResource", () => {
    test("should return lightweight token list", async () => {
      const result = await tokensCatalogResource.callback(
        new URL("aksel-tokens://catalog"),
      );

      expect(result.contents).toHaveLength(1);
      expect(result.contents[0].uri).toBe("aksel-tokens://catalog");
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
      expect(tokensCatalogResource.name).toBe("Aksel Tokens Catalog");
      expect(tokensCatalogResource.uri).toBe("aksel-tokens://catalog");
      expect(tokensCatalogResource.mimeType).toBe("application/json");
      expect(tokensCatalogResource.description).toContain(
        "Lightweight catalog of Aksel design tokens",
      );
    });
  });

  describe("iconsCatalogResource", () => {
    test("should return categories with subcategories", async () => {
      const result = await iconsCatalogResource.callback(
        new URL("aksel-icons://category-catalog"),
      );

      expect(result.contents).toHaveLength(1);
      expect(result.contents[0].uri).toBe("aksel-icons://category-catalog");
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
      expect(iconsCatalogResource.name).toBe("Aksel Icons Catalog");
      expect(iconsCatalogResource.uri).toBe("aksel-icons://category-catalog");
      expect(iconsCatalogResource.mimeType).toBe("application/json");
      expect(iconsCatalogResource.description).toContain(
        "Catalog of Aksel icon categories",
      );
    });
  });

  describe("migrationsCatalogResource", () => {
    test("should return all migrations", async () => {
      const result = await migrationsCatalogResource.callback(
        new URL("aksel-migrations://catalog"),
      );

      expect(result.contents).toHaveLength(1);
      expect(result.contents[0].uri).toBe("aksel-migrations://catalog");
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
      const result = await migrationsCatalogResource.callback(
        new URL("aksel-migrations://catalog"),
      );
      const response = JSON.parse(result.contents[0].text);

      const v8Box = response.migrations.v8.find(
        (m: any) => m.name === "v8-box",
      );
      expect(v8Box).toBeDefined();
      expect(v8Box).toHaveProperty("warning");
    });

    test("should omit warning field when not present", async () => {
      const result = await migrationsCatalogResource.callback(
        new URL("aksel-migrations://catalog"),
      );
      const response = JSON.parse(result.contents[0].text);

      const v8BoxNew = response.migrations.v8.find(
        (m: any) => m.name === "v8-box-new",
      );
      expect(v8BoxNew).toBeDefined();
      expect(v8BoxNew).not.toHaveProperty("warning");
    });

    test("should have proper metadata", () => {
      expect(migrationsCatalogResource.name).toBe("Aksel Migrations Catalog");
      expect(migrationsCatalogResource.uri).toBe("aksel-migrations://catalog");
      expect(migrationsCatalogResource.mimeType).toBe("application/json");
      expect(migrationsCatalogResource.description).toContain(
        "Catalog of available Aksel codemods",
      );
    });
  });
});
