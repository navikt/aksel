import type { BundleAnalysisResult } from "../analyze.js";

type CompareResults = {
  cssSizeDiff: number;
};

function compareResults({
  trunk,
  branch,
}: {
  trunk: BundleAnalysisResult;
  branch: BundleAnalysisResult;
}): CompareResults {
  return {
    cssSizeDiff: branch.cssIndexSize - trunk.cssIndexSize,
  };
}

export { compareResults };

/* type ExportPathConfig = {
  expotedTypes: string[];
  expotedComponents: string[];
  bundleSize: {
    gzip: number;
    minified: number;
  };
};
 */
