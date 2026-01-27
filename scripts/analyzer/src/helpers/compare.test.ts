import { describe } from "vitest";
import type { BundleAnalysisResult } from "../analyze.js";

function getDummyResultForTesting(): string {
  const data: BundleAnalysisResult = {
    version: "1",
    cssIndexSize: 1234,
    reactExports: {
      ".": {
        jsFile: "index.js",
        typesFile: "index.d.ts",
        expotedTypes: ["TypeA", "TypeB"],
        expotedComponents: ["ComponentA", "ComponentB"],
        bundleSize: {
          gzip: 4567,
          minified: 7890,
        },
      },
    },
  };

  return JSON.stringify(data);
}

describe("compare", () => {});
