import { CSSAnalyzer } from "./Analyzer.js";

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

/* const reactLocal = new ReactAnalyzer("temp/local/*react-*.tgz");
const reactRemote = new ReactAnalyzer("temp/remote/*react-*.tgz"); */
