import assert from "node:assert";
import { appendFileSync } from "node:fs";

/**
 * Assumes github job:
 * - name: ...
 *    id: results  # <-- ID for the step
 *    run: ...
 */
function addToActionOutput(data: string) {
  const outputLine = `analysis-result=${data}\n`;
  assert(!!process.env.GITHUB_OUTPUT, "GITHUB_OUTPUT is not defined");
  try {
    appendFileSync(process.env.GITHUB_OUTPUT, outputLine);
    console.info(`Successfully set GitHub Action output: analysis-result`);
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
 *        RESULT: ${{needs.previous-job.outputs.analysis-result}}
 */
function getFromActionOutput(): string {
  assert(
    !!process.env.RESULTS,
    "RESULTS is not defined as environment variable",
  );

  return process.env.RESULTS;
}

export { addToActionOutput, getFromActionOutput };
