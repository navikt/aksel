import { flatten } from "flat";
import { resolve as resolvePackagePath } from "mlly";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getBundleSize } from "./helpers/bundle-size.js";
import { extractTypesFromDts } from "./helpers/extract-types.js";
import { getPackageExports, unpackTar } from "./helpers/unpack.js";

console.info("\n\nAnalyzing packages...\n");

const { packageDir: cssPackageDir } = unpackTar("temp/local/*css-*.tgz");
const { packageExports: cssPackageExports } = getPackageExports(cssPackageDir);

const exportPath = cssPackageExports["."];

/**
 * We assume key-value to be string for css-package
 */
assert(
  exportPath && typeof exportPath === "string",
  "Package export '.' not found for css-package",
);

const cssIndexContent = readFileSync(`${cssPackageDir}/${exportPath}`, "utf-8");
const cssFileSize = Buffer.byteLength(cssIndexContent, "utf-8");
console.info(`CSS index size: ${cssFileSize} bytes\n`);

/**
 * Future plans:
 * - Env-switch to either fetch remote config from CDN, or generate it from remote NPM package
 * - - Two CDN-dirs: on for main, lets us just fetch latest and only upload when relevant changes and one for rest?
 * - - Or maybe just need one if we can just get latest and latest is the latest release
 *
 * - Create object that includes css and react export info
 * - - Version it with version key for future use
 * - Upload to CDN
 * - Create diff analyzer that fetches remote config from CDN and compares with local analysis
 * - - Output changes in exports, bundle sizes, index sizes, etc.
 * - Integrate with CI to run on PRs and main branch
 * - - Create GitHub Action for reusability
 *
 * - Optional: Create a dashboard to visualize changes
 */
/* export const reactRemote = new ReactAnalyzer("temp/remote/*react-*.tgz"); */

type ExportPathConfig = {
  jsFile: string | null;
  typesFile: string | null;
  expotedTypes: string[];
  expotedComponents: string[];
  bundleSize: {
    gzip: number;
    minified: number;
  } | null;
};

type ExportPathsConfig = Record<string, ExportPathConfig>;

function createNewConfig(): ExportPathConfig {
  return {
    jsFile: null,
    typesFile: null,
    expotedTypes: [],
    expotedComponents: [],
    bundleSize: null,
  };
}

const reactConfig: ExportPathsConfig = {};

const { packageDir: reactPackageDir } = unpackTar("temp/local/*react-*.tgz");
const { packageExports: reactPackageExports } =
  getPackageExports(reactPackageDir);

for (const [key, value] of Object.entries(reactPackageExports)) {
  assert(
    !value || typeof value === "string",
    `String|undefined exports not supported: ${key}`,
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

  let types: ExportPathConfig["expotedTypes"] = [];
  let components: ExportPathConfig["expotedComponents"] = [];
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

  reactConfig[name].expotedTypes = types;
  reactConfig[name].expotedComponents = components;
  reactConfig[name].bundleSize = bundleSizes;
}

console.info({ reactConfig });
