import fastGlob from "fast-glob";
import assert from "node:assert";
import { analyzeCss } from "./analyze-css.js";
import { analyzeReact } from "./analyze-react.js";

type BundleAnalysisResult = {
  cssIndexSize: ReturnType<typeof analyzeCss>;
  reactExports: Awaited<ReturnType<typeof analyzeReact>>;
};

async function analyze(directory: "local" | "remote" = "local") {
  console.info(`Analyzing bundles from ${directory} directory...\n`);

  const dirs = fastGlob.sync([
    `temp/${directory}/*css-*.tgz`,
    `temp/${directory}/*react-*.tgz`,
  ]);

  assert(
    dirs.length === 2,
    `Expected to find 2 tarballs in temp/${directory}, found ${dirs.length}`,
  );

  const cssFileSize = analyzeCss(`temp/${directory}/*css-*.tgz`);

  const reactConfig = await analyzeReact(`temp/${directory}/*react-*.tgz`);

  const analysisResult: BundleAnalysisResult = {
    cssIndexSize: cssFileSize,
    reactExports: reactConfig,
  };

  console.info("Finished analysis\n");

  return analysisResult;
}

export { analyze };
export type { BundleAnalysisResult };
