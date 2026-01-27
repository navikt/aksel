import { analyzeCss } from "./analyze-css.js";
import { analyzeReact } from "./analyze-react.js";

console.info("\n\nAnalyzing packages...\n");

const cssFileSize = analyzeCss("temp/local/*css-*.tgz");
console.info(`CSS index size: ${cssFileSize} bytes\n`);

const reactConfig = await analyzeReact("temp/local/*react-*.tgz");

type BundleAnalysisResult = {
  version: string;
  cssIndexSize: ReturnType<typeof analyzeCss>;
  reactExports: Awaited<ReturnType<typeof analyzeReact>>;
};

const analysisResult: BundleAnalysisResult = {
  version: "1",
  cssIndexSize: cssFileSize,
  reactExports: reactConfig,
};

console.info({ analysisResult });
