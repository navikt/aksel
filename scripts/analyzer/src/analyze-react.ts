import { flatten } from "flat";
import { resolve as resolvePackagePath } from "mlly";
import assert from "node:assert";
import { resolve } from "node:path";
import { getBundleSize } from "./helpers/bundle-size.js";
import { extractTypesFromDts } from "./helpers/extract-types.js";
import { getPackageExports, unpackTar } from "./helpers/unpack.js";

type ExportPathConfig = {
  jsFile: string | null;
  typesFile: string | null;
  exportedTypes: string[];
  exportedComponents: string[];
  bundleSize: {
    gzip: number;
    minified: number;
  } | null;
};

type ExportPathsConfig = Record<string, ExportPathConfig>;

async function analyzeReact(tarLocation: string): Promise<ExportPathsConfig> {
  const reactConfig: ExportPathsConfig = {};

  const reactPackageDir = unpackTar(tarLocation);
  const reactPackageExports = getPackageExports(reactPackageDir);

  for (const [key, value] of Object.entries(reactPackageExports)) {
    if (key === "./package.json") {
      continue;
    }

    assert(
      value !== undefined && typeof value !== "string",
      `String or undefined exports not supported in exports at top-level: ${key}`,
    );

    let name: string;
    /* Assume root */
    if (key.startsWith("..")) {
      name = ".";
    } else {
      const parts = key.split(".");
      name = parts[1];
    }

    console.info(`analyzing ${name === "." ? "Root" : name}...`);

    /*
     * Flattens nested objects into a single-level object with dot notation keys.
     * { a: { b: 'c' } } becomes { 'a.b': 'c' }
     */
    const flattenedValue: Record<string, string> = flatten(value);
    for (const [flatKey, flatValue] of Object.entries(flattenedValue)) {
      /* Skip CJS files */
      if (flatKey.includes(".require.")) {
        continue;
      }

      if (!reactConfig[name]) {
        reactConfig[name] = createNewConfig();
      }

      if (flatKey.endsWith(".types")) {
        reactConfig[name].typesFile = flatValue;
      } else if (flatKey.endsWith(".default")) {
        reactConfig[name].jsFile = flatValue;
      }
    }

    let types: ExportPathConfig["exportedTypes"] = [];
    let components: ExportPathConfig["exportedComponents"] = [];
    let bundleSizes: ExportPathConfig["bundleSize"] = null;

    const typeFile = reactConfig[name].typesFile;
    const jsFile = reactConfig[name].jsFile;

    if (typeFile) {
      types = extractTypesFromDts(`${reactPackageDir}/${typeFile}`);
    }

    if (jsFile) {
      const path = await resolvePackagePath(resolve(reactPackageDir, jsFile));
      const imports = await import(path);
      components = Object.keys(imports);

      if (components.length > 0) {
        const code = `import * as _mod from "${path}";\nconsole.info(_mod);`;
        bundleSizes = await getBundleSize(code);
      }
    }

    reactConfig[name].exportedTypes = types;
    reactConfig[name].exportedComponents = components;
    reactConfig[name].bundleSize = bundleSizes;
  }

  return reactConfig;
}

function createNewConfig(): ExportPathConfig {
  return {
    jsFile: null,
    typesFile: null,
    exportedTypes: [],
    exportedComponents: [],
    bundleSize: null,
  };
}

export { analyzeReact };
export type { ExportPathConfig };
