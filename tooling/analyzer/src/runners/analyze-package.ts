import assert from "node:assert";
import { writeFileSync } from "node:fs";
import { analyze } from "../analyze.js";

const args = process.argv.slice(2);

const outArg = args.indexOf("--out");

let outFile = "trunk-results.json";

if (outArg !== -1) {
  outFile = args[outArg + 1];

  assert(
    typeof args[outArg + 1] === "string",
    "Output file must be specified when using --out",
  );
}

const branchResult = await analyze(
  args.includes("--remote") ? "remote" : "local",
);

writeFileSync(`./${outFile}`, JSON.stringify(branchResult));

console.info("\nCompleted trunk analysis 🎉");
