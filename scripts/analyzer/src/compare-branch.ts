import { readFileSync, writeFileSync } from "node:fs";
import { type BundleAnalysisResult, analyze } from "./analyze.js";
import { compareResults } from "./helpers/compare.js";
import { markdownMessage } from "./md-message.js";

const branchResult = await analyze("local");

const trunkResults: BundleAnalysisResult = JSON.parse(
  readFileSync("./trunk-results.json", "utf-8"),
);

const comparison = compareResults({
  trunk: trunkResults,
  branch: branchResult,
});

writeFileSync("./compare-markdown.md", markdownMessage(comparison));

console.info("\nCompleted analysis 🎉");
