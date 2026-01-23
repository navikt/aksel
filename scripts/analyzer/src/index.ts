import { gzipSync } from "node:zlib";
import { CSSAnalyzer, ReactAnalyzer } from "./Analyzer.js";

console.info("\n\nAnalyzing packages...\n");

const cssLocal = new CSSAnalyzer("temp/local/*css-*.tgz");
const cssRemote = new CSSAnalyzer("temp/remote/*css-*.tgz");

const cssDiff = cssLocal.getIndexSize() - cssRemote.getIndexSize();

if (cssDiff > 0) {
  console.info(`CSS index size increased by ${cssDiff} bytes`);
} else if (cssDiff < 0) {
  console.info(`CSS index size decreased by ${-cssDiff} bytes`);
} else {
  console.info("No change in CSS index size");
}

export const reactLocal = new ReactAnalyzer("temp/local/*react-*.tgz");
await reactLocal.init();

console.info(reactLocal.exportPaths);
const str = JSON.stringify(reactLocal.exportPaths, null);
console.info(Buffer.byteLength(str, "utf8"));
console.info(gzipSync(str).length);

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
