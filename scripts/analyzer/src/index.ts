import assert from "node:assert";
import { exit } from "node:process";
import { type BundleAnalysisResult, analyze } from "./analyze.js";
import { compareResults } from "./helpers/compare.js";
import {
  addToActionOutput,
  getFromActionOutput,
} from "./helpers/git-actions.js";
import { markdownMessage } from "./md-message.js";

const args = process.argv.slice(2);

const branchResult = await analyze(
  args.includes("--remote") ? "remote" : "local",
);

if (args.includes("--remote")) {
  assert(
    args.includes("--action-output"),
    "When analyzing remote, --action-output must be provided",
  );
}

if (args.includes("--action-output")) {
  addToActionOutput("analysis-result", JSON.stringify(branchResult));
  exit(0);
}

const trunkResults: BundleAnalysisResult = JSON.parse(getFromActionOutput());

const comparison = compareResults({
  trunk: trunkResults,
  branch: branchResult,
});

addToActionOutput("markdown-result", markdownMessage(comparison));

console.info("\nCompleted analysis 🎉");
