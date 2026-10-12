import { afterEach, describe, expect, test, vi } from "vitest";
import { z } from "zod";
import {
  maxSearchQueryLength,
  maxSearchQueryWords,
} from "../helpers/input-limits.js";
import { metadata } from "../resources/icons-catalog.js";
import { findDocsTool } from "./find-docs.js";
import { findIconsTool } from "./find-icons.js";
import { getComponentInfoTool } from "./get-component-info.js";
import { getDocTool } from "./get-doc.js";
import { getTokenDetailsTool } from "./get-token-details.js";

const tooLong = "a".repeat(maxSearchQueryLength + 1);
const tooLongPath = "a".repeat(201);
const tooManyWords = Array.from(
  { length: maxSearchQueryWords + 1 },
  (_, i) => `w${i}`,
).join(" ");

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Tools", () => {
  describe("input limits", () => {
    test("should reject oversized free-text inputs", () => {
      const cases = [
        [findDocsTool.inputSchema, { query: tooLong }],
        [findDocsTool.inputSchema, { query: tooManyWords }],
        [findIconsTool.inputSchema, { keyword: tooLong }],
        [findIconsTool.inputSchema, { keyword: tooManyWords }],
        [getTokenDetailsTool.inputSchema, { tokenName: tooLong }],
        [getComponentInfoTool.inputSchema, { component: tooLongPath }],
        [getDocTool.inputSchema, { path: `/${tooLongPath}.md` }],
      ] as const;

      for (const [schema, input] of cases) {
        expect(z.object(schema).safeParse(input).success).toBe(false);
      }
    });

    test("should accept normal multi-word queries", () => {
      expect(
        z
          .object(findDocsTool.inputSchema)
          .safeParse({ query: "hvordan lage et skjema med datovelger" })
          .success,
      ).toBe(true);
      expect(
        z.object(findIconsTool.inputSchema).safeParse({ keyword: "arrow left" })
          .success,
      ).toBe(true);
    });
  });

  describe("getDocTool", () => {
    test.each([
      "/../../api/llm/docs?.md",
      "/komponenter/core/button.md?a=1.md",
      "/komponenter/core/button#.md",
      "/komponenter/%2e%2e/button.md",
      "//evil.example/x.md",
      "/Komponenter/core/button.md",
      "/.md",
    ])("should reject path %s", (path) => {
      const result = z.object(getDocTool.inputSchema).safeParse({ path });
      expect(result.success).toBe(false);
    });

    test("should not cache or return non-markdown responses", async () => {
      const fetchMock = vi.fn(
        async () =>
          new Response("<html></html>", {
            status: 200,
            headers: { "content-type": "text/html; charset=utf-8" },
          }),
      );
      vi.stubGlobal("fetch", fetchMock);

      const path = "/test/not-markdown.md";
      const first = JSON.parse(await getDocTool.callback({ path }));
      const second = JSON.parse(await getDocTool.callback({ path }));

      expect(first.error).toBe("NOT_FOUND");
      expect(second.error).toBe("NOT_FOUND");
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test("should return and cache markdown responses", async () => {
      const fetchMock = vi.fn(
        async () =>
          new Response("# Button", {
            status: 200,
            headers: { "content-type": "text/markdown; charset=utf-8" },
          }),
      );
      vi.stubGlobal("fetch", fetchMock);

      const path = "/test/markdown.md";
      expect(await getDocTool.callback({ path })).toBe("# Button");
      expect(await getDocTool.callback({ path })).toBe("# Button");
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    test("should require path to end with .md", () => {
      const strictSchema = z.object(getDocTool.inputSchema).strict();

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

  describe("getTokenDetailsTool", () => {
    test("should accept unknown tokenName values in schema", () => {
      const strictSchema = z.object(getTokenDetailsTool.inputSchema).strict();

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
      const strictSchema = z.object(getTokenDetailsTool.inputSchema).strict();

      const parseResult = strictSchema.safeParse({
        tokenName: "shadow-dialog",
        extraField: "unexpected",
      });

      expect(parseResult.success).toBe(false);
    });

    test("should fetch details for valid token", async () => {
      const result = await getTokenDetailsTool.callback({
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
      const result = await getTokenDetailsTool.callback({
        tokenName: "shadow",
      });

      const response = JSON.parse(result);
      expect(response).toHaveProperty("error");
      expect(response).toHaveProperty("similarTokens");
      expect(Array.isArray(response.similarTokens)).toBe(true);
    });

    test("should return error for non-existent token", async () => {
      const result = await getTokenDetailsTool.callback({
        tokenName: "nonexistent-token-xyz",
      });

      const response = JSON.parse(result);
      expect(response).toHaveProperty("error");
      expect(response.error).toContain("not found");
    });

    test("should have proper metadata", () => {
      expect(getTokenDetailsTool.name).toBe("aksel_get_token_details");
      expect(getTokenDetailsTool.description).toContain(
        "Look up an Aksel design token by name",
      );
      expect(getTokenDetailsTool.inputSchema).toHaveProperty("tokenName");
    });
  });

  describe("getComponentInfoTool", () => {
    test("should accept slug/docs path and include options", () => {
      const strictSchema = z.object(getComponentInfoTool.inputSchema).strict();

      const slug = strictSchema.safeParse({
        component: "komponenter/core/button",
      });
      const docsPath = strictSchema.safeParse({
        component: "/komponenter/core/button.md",
      });
      const empty = strictSchema.safeParse({
        component: "",
      });

      expect(slug.success).toBe(true);
      expect(docsPath.success).toBe(true);
      expect(empty.success).toBe(false);
    });

    test.each(["button", "komponenter/core/button?x=1", "komponenter/../x/y"])(
      "should reject invalid component %s without fetching",
      async (component) => {
        const fetchMock = vi.fn();
        vi.stubGlobal("fetch", fetchMock);

        const response = JSON.parse(
          await getComponentInfoTool.callback({ component }),
        );

        expect(response.error).toBe("INVALID_COMPONENT");
        expect(fetchMock).not.toHaveBeenCalled();
      },
    );
  });

  describe("findDocsTool", () => {
    test("should validate kind and limit", () => {
      const strictSchema = z.object(findDocsTool.inputSchema).strict();

      const valid = strictSchema.safeParse({
        query: "button",
        limit: 5,
      });
      const validMigrations = strictSchema.safeParse({
        kind: "migrations",
      });
      const invalidKind = strictSchema.safeParse({
        kind: "everything",
      });
      const invalidLimit = strictSchema.safeParse({
        query: "button",
        limit: 0,
      });

      expect(valid.success).toBe(true);
      expect(validMigrations.success).toBe(true);
      expect(invalidKind.success).toBe(false);
      expect(invalidLimit.success).toBe(false);
    });

    test("should default kind to docs", () => {
      const parsed = z.object(findDocsTool.inputSchema).parse({
        query: "button",
      });

      expect(parsed.kind).toBe("docs");
    });

    test("should reject too-short docs query in callback", async () => {
      const result = await findDocsTool.callback({
        kind: "docs",
        query: "ab",
        limit: 8,
      });

      const response = JSON.parse(result);
      expect(response.kind).toBe("docs");
      expect(response.message).toContain("at least");
    });

    test("should route short version-like docs query to migrations", async () => {
      const result = await findDocsTool.callback({
        kind: "docs",
        query: "v8",
        limit: 8,
      });

      const response = JSON.parse(result);
      expect(response.kind).toBe("docs");
      expect(response.hint).toContain("kind='migrations'");
    });

    test("should list migrations with run command", async () => {
      const result = await findDocsTool.callback({
        kind: "migrations",
        query: undefined,
        limit: 8,
      });

      const response = JSON.parse(result);
      expect(response.kind).toBe("migrations");
      expect(response).toHaveProperty("cliVersion");
      expect(response.runCommand).toContain("@navikt/aksel codemod");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]).toHaveProperty("name");
      expect(response.results[0]).toHaveProperty("description");
      expect(response.results[0]).toHaveProperty("version");
    });

    test("should filter migrations by version", async () => {
      const result = await findDocsTool.callback({
        kind: "migrations",
        query: "v8",
        limit: 8,
      });

      const response = JSON.parse(result);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results.every((m: any) => m.version === "v8")).toBe(true);
    });

    test("should report available versions for unknown migration query", async () => {
      const result = await findDocsTool.callback({
        kind: "migrations",
        query: "v99",
        limit: 8,
      });

      const response = JSON.parse(result);
      expect(response.kind).toBe("migrations");
      expect(response).toHaveProperty("message");
      expect(Array.isArray(response.availableVersions)).toBe(true);
    });

    test("should browse tokens", async () => {
      const result = await findDocsTool.callback({
        kind: "tokens",
        query: undefined,
        limit: 5,
      });

      const response = JSON.parse(result);
      expect(response.kind).toBe("tokens");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBe(5);
      expect(response.results[0]).toHaveProperty("name");
      expect(response.results[0]).toHaveProperty("category");
      expect(response.results[0]).not.toHaveProperty("rawValue");
    });
  });

  describe("findIconsTool", () => {
    test("should reject invalid enum inputs", () => {
      const strictSchema = z.object(findIconsTool.inputSchema).strict();

      const invalidCategory = strictSchema.safeParse({
        category: "NotARealCategory",
      });
      const invalidVariant = strictSchema.safeParse({
        variant: "outline",
      });

      expect(invalidCategory.success).toBe(false);
      expect(invalidVariant.success).toBe(false);
    });

    test("should search icons by keyword", async () => {
      const firstKeyword = Object.values(metadata)[0]?.keywords?.[0];

      expect(firstKeyword).toBeDefined();

      const result = await findIconsTool.callback({
        keyword: firstKeyword,
        limit: 10,
        category: undefined,
        variant: "both",
      });

      const response = JSON.parse(result);
      expect(response).toHaveProperty("icons");
      expect(Array.isArray(response.icons)).toBe(true);
      expect(response.totalMatches).toBeGreaterThan(0);
      expect(response.icons[0]).toHaveProperty("name");
      expect(response.icons[0]).toHaveProperty("category");
      expect(response.icons[0]).toHaveProperty("variant");
      expect(response.icons[0]).not.toHaveProperty("keywords");
      expect(response).not.toHaveProperty("searchCriteria");
    });

    test("should filter icons by category", async () => {
      const result = await findIconsTool.callback({
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
      const result = await findIconsTool.callback({
        category: undefined,
        variant: "both",
        limit: 20,
        keyword: "nonexistent-icon-xyz-123",
      });

      const response = JSON.parse(result);
      expect(response).toHaveProperty("message");
      expect(response.message).toContain("No icons found");
      expect(response).not.toHaveProperty("searchCriteria");
    });

    test("should have proper metadata", () => {
      expect(findIconsTool.name).toBe("aksel_find_icons");
      expect(findIconsTool.description).toContain(
        "Find and filter Aksel icons",
      );
      expect(findIconsTool.inputSchema).toHaveProperty("keyword");
      expect(findIconsTool.inputSchema).toHaveProperty("category");
    });
  });
});
