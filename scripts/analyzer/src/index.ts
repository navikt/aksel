import assert from "node:assert";
import { appendFileSync } from "node:fs";
import { analyze } from "./analyze.js";

const args = process.argv.slice(2);

const result = analyze(args.includes("--remote") ? "remote" : "local");

if (args.includes("--action-output")) {
  const outputLine = `analysis-result=${JSON.stringify(result)}\n`;
  assert(!!process.env.GITHUB_OUTPUT, "GITHUB_OUTPUT is not defined");
  try {
    appendFileSync(process.env.GITHUB_OUTPUT, outputLine);
    console.info(`Successfully set GitHub Action output: analysis-result`);
  } catch (err) {
    throw new Error("Error writing to GITHUB_OUTPUT:" + (err as Error).message);
  }
}
