import { readFileSync, writeFileSync } from "node:fs";
import { type BundleAnalysisResult } from "../analyze.js";
import { compareResults } from "../helpers/compare.js";
import { markdownMessage } from "../md-message.js";

const trunkResults: BundleAnalysisResult = JSON.parse(
  readFileSync("./trunk-results.json", "utf-8"),
);

const branchResults: BundleAnalysisResult = JSON.parse(
  readFileSync("./branch-results.json", "utf-8"),
);

const comparison = compareResults({
  trunk: trunkResults,
  branch: branchResults,
});

writeFileSync("./compare-markdown.md", markdownMessage(comparison));

console.info("\nCompleted analysis 🎉");
