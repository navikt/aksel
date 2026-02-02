import { writeFileSync } from "node:fs";
import { analyze } from "./analyze.js";

const args = process.argv.slice(2);

const branchResult = await analyze(
  args.includes("--remote") ? "remote" : "local",
);

writeFileSync("./trunk-results.json", JSON.stringify(branchResult));

console.info("\nCompleted trunk analysis 🎉");
