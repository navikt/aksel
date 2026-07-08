import { describe, expect, test } from "vitest";
import { readMetaNames } from "./component-names";
import { type ParsedMeta, parseMetaFiles } from "./parse-meta";
import { validateMetas } from "./validate-meta";

describe("component metadata files", () => {
  test("all meta files satisfy the metadata spec", () => {
    const metas = parseMetaFiles();
    expect(validateMetas(metas)).toEqual([]);
  });

  test("readMetaNames (dynamic import) agrees with the full TS parse", async () => {
    const sort = (names: string[]) =>
      [...names].sort((a, b) => a.localeCompare(b));
    const dynamicNames = sort(await readMetaNames());
    const parsedNames = sort(parseMetaFiles().map((meta) => meta.name));
    expect(dynamicNames).toEqual(parsedNames);
  });
});

describe("validateMetas", () => {
  const meta = (overrides: Partial<ParsedMeta> = {}): ParsedMeta => ({
    name: "Example",
    dir: "src/example",
    metaFile: "src/example/Example.meta.ts",
    keywords: ["example"],
    related: [],
    components: [
      {
        label: "Example",
        realName: "Example",
        fileName: "src/example/Example.tsx",
        overridable: false,
      },
    ],
    utils: [],
    ...overrides,
  });

  test("accepts a valid meta file", () => {
    expect(validateMetas([meta()])).toEqual([]);
  });

  test("flags a non Sanity-id-safe name", () => {
    const errors = validateMetas([meta({ name: "Has Space" })]);
    expect(errors.some((error) => error.includes("valid Sanity id"))).toBe(
      true,
    );
  });

  test("flags duplicate names", () => {
    const errors = validateMetas([
      meta(),
      meta({ metaFile: "src/other/Example.meta.ts" }),
    ]);
    expect(errors.some((error) => error.includes("Duplicate"))).toBe(true);
  });

  test("flags empty keywords", () => {
    const errors = validateMetas([meta({ keywords: [] })]);
    expect(errors.some((error) => error.includes("keywords"))).toBe(true);
  });

  test("flags empty components", () => {
    const errors = validateMetas([meta({ components: [] })]);
    expect(errors.some((error) => error.includes("components"))).toBe(true);
  });

  test("flags related referencing an unknown component", () => {
    const errors = validateMetas([meta({ related: ["DoesNotExist"] })]);
    expect(errors.some((error) => error.includes("DoesNotExist"))).toBe(true);
  });

  test("accepts related referencing a known component", () => {
    const errors = validateMetas([
      meta({ related: ["Other"] }),
      meta({ name: "Other", metaFile: "src/other/Other.meta.ts" }),
    ]);
    expect(errors).toEqual([]);
  });
});
