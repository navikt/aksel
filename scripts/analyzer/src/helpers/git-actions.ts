import assert from "node:assert";
import { appendFileSync } from "node:fs";

/**
 * Assumes github job:
 * - name: ...
 *    id: results  # <-- ID for the step
 *    run: ...
 */
function addToActionOutput(key: string, data: string) {
  assert(!!process.env.GITHUB_OUTPUT, "GITHUB_OUTPUT is not defined");
  const githubOutputPath = process.env.GITHUB_OUTPUT;
  const delimiter = `EOF_${process.pid}_${Date.now()}`;
  const outputBlock = `${key}<<${delimiter}\n${data}\n${delimiter}\n`;
  try {
    appendFileSync(githubOutputPath, outputBlock);
    console.info(`Successfully set GitHub Action output: ${key}`);
  } catch (err) {
    throw new Error("Error writing to GITHUB_OUTPUT:" + (err as Error).message);
  }
}

/**
 * Assumes github action output is set as environment variable RESULTS
 * job:
 *  runs-on: ubuntu-latest
 *  needs: previous-job
 *  steps:
 *    - env:
 *        RESULT: ${{needs.previous-job.outputs.<key>}}
 */
function getFromActionOutput(): string {
  assert(
    !!process.env.RESULTS,
    "RESULTS is not defined as environment variable",
  );

  return process.env.RESULTS;
}

export { addToActionOutput, getFromActionOutput };
