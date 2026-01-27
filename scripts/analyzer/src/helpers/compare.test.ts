import { describe, expect, test } from "vitest";
import type { BundleAnalysisResult } from "../analyze.js";
import { compareResults } from "./compare.js";

function getDummyResultForTesting(): BundleAnalysisResult {
  return {
    version: "1",
    cssIndexSize: 1234,
    reactExports: {
      ".": {
        jsFile: "index.js",
        typesFile: "index.d.ts",
        exportedTypes: ["TypeA", "TypeB"],
        exportedComponents: ["ComponentA", "ComponentB"],
        bundleSize: {
          gzip: 4567,
          minified: 7890,
        },
      },
    },
  };
}

describe("compareResults", () => {
  test("returns no diffs when trunk and branch are identical", () => {
    const dummy = getDummyResultForTesting();
    const result = compareResults({ trunk: dummy, branch: dummy });

    expect(result.cssSizeDiff).toBe(0);
    expect(result.reactConfigDiff.exportsAdded).toEqual([]);
    expect(result.reactConfigDiff.exportsRemoved).toEqual([]);
    expect(result.reactConfigDiff.paths["."].types.added).toEqual([]);
    expect(result.reactConfigDiff.paths["."].types.removed).toEqual([]);
    expect(result.reactConfigDiff.paths["."].components.added).toEqual([]);
    expect(result.reactConfigDiff.paths["."].components.removed).toEqual([]);
    expect(result.reactConfigDiff.paths["."].bundleSize.gzip).toBe(0);
    expect(result.reactConfigDiff.paths["."].bundleSize.minified).toBe(0);
  });

  test("detects added top-level export keys", () => {
    const dummy = getDummyResultForTesting();

    const branch = {
      ...dummy,
      reactExports: {
        ...dummy.reactExports,
        "./button": {
          jsFile: "button.js",
          typesFile: "button.d.ts",
          exportedTypes: [],
          exportedComponents: ["Button"],
          bundleSize: { gzip: 1000, minified: 2000 },
        },
      },
    };

    const result = compareResults({ trunk: dummy, branch });

    expect(result.reactConfigDiff.exportsAdded).toEqual(["./button"]);
    expect(result.reactConfigDiff.exportsRemoved).toEqual([]);
  });

  test("detects removed top-level export keys", () => {
    const dummy = getDummyResultForTesting();

    const branch = {
      ...dummy,
      reactExports: {
        ".": dummy.reactExports["."],
      },
    };

    const result = compareResults({ trunk: dummy, branch });

    expect(result.reactConfigDiff.exportsAdded).toEqual([]);
    expect(result.reactConfigDiff.exportsRemoved).toEqual([]);
  });

  test("detects top-level export keys bundle-size change", () => {
    const dummy = getDummyResultForTesting();

    const branch = {
      ...dummy,
      reactExports: {
        ...dummy.reactExports,
        "./button": {
          jsFile: "button.js",
          typesFile: "button.d.ts",
          exportedTypes: [],
          exportedComponents: ["Button"],
          bundleSize: { gzip: 1000, minified: 2000 },
        },
      },
    };

    const result = compareResults({ trunk: dummy, branch });

    expect(result.reactConfigDiff.paths["./button"].bundleSize.gzip).toEqual(
      1000,
    );
    expect(
      result.reactConfigDiff.paths["./button"].bundleSize.minified,
    ).toEqual(2000);
  });

  test("detects added types and components in a path", () => {
    const dummy = getDummyResultForTesting();

    const branch = {
      ...dummy,
      reactExports: {
        ".": {
          ...dummy.reactExports["."],
          exportedTypes: [...dummy.reactExports["."].exportedTypes, "TypeC"],
          exportedComponents: [
            ...dummy.reactExports["."].exportedComponents,
            "ComponentC",
          ],
        },
      },
    };

    const result = compareResults({ trunk: dummy, branch });

    expect(result.reactConfigDiff.paths["."].types.added).toEqual(["TypeC"]);
    expect(result.reactConfigDiff.paths["."].components.added).toEqual([
      "ComponentC",
    ]);
  });

  test("detects removed types and components in a path", () => {
    const dummy = getDummyResultForTesting();

    const branch = {
      ...dummy,
      reactExports: {
        ".": {
          ...dummy.reactExports["."],
          exportedTypes: ["TypeA"],
          exportedComponents: ["ComponentA"],
        },
      },
    };

    const result = compareResults({ trunk: dummy, branch });

    expect(result.reactConfigDiff.paths["."].types.removed).toEqual(["TypeB"]);
    expect(result.reactConfigDiff.paths["."].components.removed).toEqual([
      "ComponentB",
    ]);
  });

  test("calculates bundle size increase", () => {
    const dummy = getDummyResultForTesting();

    const branch = {
      ...dummy,
      reactExports: {
        ".": {
          ...dummy.reactExports["."],
          bundleSize: { gzip: 5000, minified: 8500 },
        },
      },
    };

    const result = compareResults({ trunk: dummy, branch });

    expect(result.reactConfigDiff.paths["."].bundleSize.gzip).toBe(433);
    expect(result.reactConfigDiff.paths["."].bundleSize.minified).toBe(610);
  });

  test("calculates bundle size decrease", () => {
    const dummy = getDummyResultForTesting();

    const branch = {
      ...dummy,
      reactExports: {
        ".": {
          ...dummy.reactExports["."],
          bundleSize: { gzip: 4000, minified: 7000 },
        },
      },
    };

    const result = compareResults({ trunk: dummy, branch });

    expect(result.reactConfigDiff.paths["."].bundleSize.gzip).toBe(-567);
    expect(result.reactConfigDiff.paths["."].bundleSize.minified).toBe(-890);
  });

  test("handles path with removed bundle size", () => {
    const dummy = getDummyResultForTesting();

    const branch = {
      ...dummy,
      reactExports: {
        ".": {
          ...dummy.reactExports["."],
          bundleSize: undefined,
        },
      },
    };

    const result = compareResults({
      trunk: dummy,
      branch: branch as unknown as BundleAnalysisResult,
    });

    expect(result.reactConfigDiff.paths["."].bundleSize.gzip).toBe(-4567);
    expect(result.reactConfigDiff.paths["."].bundleSize.minified).toBe(-7890);
  });

  test("handles path with added bundle size", () => {
    const dummy = getDummyResultForTesting();

    const trunk = {
      ...dummy,
      reactExports: {
        ".": {
          ...dummy.reactExports["."],
          bundleSize: undefined,
        },
      },
    };

    const result = compareResults({
      trunk: trunk as unknown as BundleAnalysisResult,
      branch: dummy,
    });

    expect(result.reactConfigDiff.paths["."].bundleSize.gzip).toBe(4567);
    expect(result.reactConfigDiff.paths["."].bundleSize.minified).toBe(7890);
  });

  test("calculates CSS size diff", () => {
    const dummy = getDummyResultForTesting();

    const branch = {
      ...dummy,
      cssIndexSize: 2000,
    };

    const result = compareResults({ trunk: dummy, branch });

    expect(result.cssSizeDiff).toBe(766);
  });

  test("handles multiple export paths with mixed changes", () => {
    const dummy = getDummyResultForTesting();

    const branch: BundleAnalysisResult = {
      version: "1",
      cssIndexSize: 1500,
      reactExports: {
        ".": {
          jsFile: "index.js",
          typesFile: "index.d.ts",
          exportedTypes: ["TypeA"],
          exportedComponents: ["ComponentA", "ComponentD"],
          bundleSize: { gzip: 5000, minified: 8000 },
        },
        "./button": {
          jsFile: "button.js",
          typesFile: "button.d.ts",
          exportedTypes: ["ButtonType"],
          exportedComponents: ["Button"],
          bundleSize: { gzip: 2000, minified: 3500 },
        },
      },
    };

    const result = compareResults({ trunk: dummy, branch });

    expect(result.cssSizeDiff).toBe(266);
    expect(result.reactConfigDiff.exportsAdded).toEqual(["./button"]);
    expect(result.reactConfigDiff.exportsRemoved).toEqual([]);
    expect(result.reactConfigDiff.paths["."].types.removed).toEqual(["TypeB"]);
    expect(result.reactConfigDiff.paths["."].components.added).toEqual([
      "ComponentD",
    ]);
    expect(result.reactConfigDiff.paths["./button"].components.added).toEqual([
      "Button",
    ]);
  });
});
