import { analyzeCss } from "./analyze-css.js";
import { analyzeReact } from "./analyze-react.js";

type BundleAnalysisResult = {
  version: string;
  cssIndexSize: ReturnType<typeof analyzeCss>;
  reactExports: Awaited<ReturnType<typeof analyzeReact>>;
};

async function analyze(directory: "local" | "remote" = "local") {
  console.info(`Analyzing bundles from ${directory} directory...\n`);

  const cssFileSize = analyzeCss(`temp/${directory}/*css-*.tgz`);

  const reactConfig = await analyzeReact(`temp/${directory}/*react-*.tgz`);

  const analysisResult: BundleAnalysisResult = {
    version: "1",
    cssIndexSize: cssFileSize,
    reactExports: reactConfig,
  };

  console.info("Finished analysis\n");

  return analysisResult;
}

export { analyze };
export type { BundleAnalysisResult };
