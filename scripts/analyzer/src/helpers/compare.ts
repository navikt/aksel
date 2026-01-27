import type { BundleAnalysisResult } from "../analyze.js";

type ExportDiff = {
  added: string[];
  removed: string[];
};

type ExportConfigDiff = {
  types: ExportDiff;
  components: ExportDiff;
  bundleSize: {
    gzip: number;
    minified: number;
  };
};

type ReactConfigDiff = {
  exportsAdded: string[];
  exportsRemoved: string[];
  paths: Record<string, ExportConfigDiff>;
};

type CompareResults = {
  cssSizeDiff: number;
  reactConfigDiff: ReactConfigDiff;
};

function compareArrays({
  trunk = [],
  branch = [],
}: {
  trunk?: string[];
  branch?: string[];
}): ExportDiff {
  const trunkSet = new Set(trunk);
  const branchSet = new Set(branch);

  const added = branch.filter((item) => !trunkSet.has(item));
  const removed = trunk.filter((item) => !branchSet.has(item));

  return { added, removed };
}

function compareResults({
  trunk,
  branch,
}: {
  trunk: BundleAnalysisResult;
  branch: BundleAnalysisResult;
}): CompareResults {
  const trunkExports = trunk.reactExports;
  const branchExports = branch.reactExports;

  /* Compare top-level exports (keys) */
  const trunkKeys = Object.keys(trunkExports);
  const branchKeys = Object.keys(branchExports);
  const keysAdded = branchKeys.filter((key) => !trunkKeys.includes(key));
  const keysRemoved = trunkKeys.filter((key) => !branchKeys.includes(key));

  /* Compare individual export paths */
  const allKeys = new Set([...trunkKeys, ...branchKeys]);
  const pathDiffs: Record<string, ExportConfigDiff> = {};

  for (const pathKey of allKeys) {
    const trunkConfig = trunkExports[pathKey];
    const branchConfig = branchExports[pathKey];

    const typesDiff = compareArrays({
      trunk: trunkConfig.expotedTypes,
      branch: branchConfig.expotedTypes,
    });

    const componentsDiff = compareArrays({
      trunk: trunkConfig.expotedComponents,
      branch: branchConfig.expotedComponents,
    });

    const sizeDiff: ExportConfigDiff["bundleSize"] = {
      gzip: 0,
      minified: 0,
    };

    if (trunkConfig.bundleSize && !branchConfig.bundleSize) {
      sizeDiff.gzip = -(trunkConfig.bundleSize.gzip ?? 0);
      sizeDiff.minified = -(trunkConfig.bundleSize.minified ?? 0);
    } else if (!trunkConfig.bundleSize && branchConfig.bundleSize) {
      sizeDiff.gzip = branchConfig.bundleSize.gzip ?? 0;
      sizeDiff.minified = branchConfig.bundleSize.minified ?? 0;
    } else if (trunkConfig.bundleSize && branchConfig.bundleSize) {
      sizeDiff.gzip =
        (branchConfig.bundleSize.gzip ?? 0) -
        (trunkConfig.bundleSize.gzip ?? 0);
      sizeDiff.minified =
        (branchConfig.bundleSize.minified ?? 0) -
        (trunkConfig.bundleSize.minified ?? 0);
    }

    pathDiffs[pathKey] = {
      types: typesDiff,
      components: componentsDiff,
      bundleSize: sizeDiff,
    };
  }

  return {
    cssSizeDiff: branch.cssIndexSize - trunk.cssIndexSize,
    reactConfigDiff: {
      exportsAdded: keysAdded,
      exportsRemoved: keysRemoved,
      paths: pathDiffs,
    },
  };
}

export { compareResults };
export type { CompareResults, ReactConfigDiff, ExportConfigDiff };
