import { CSSAnalyzer, ReactAnalyzer } from "./Analyzer.js";

export const manager = {
  react: {
    local: new ReactAnalyzer("temp/local/*react-*.tgz"),
    remote: new ReactAnalyzer("temp/remote/*react-*.tgz"),
  },
  css: {
    local: new CSSAnalyzer("temp/local/*css-*.tgz"),
    remote: new CSSAnalyzer("temp/remote/*css-*.tgz"),
  },
};

/* console.log("Analyzing package sizes...");

console.log(
  manager.css.local.compareIndexSize(manager.css.remote.getIndexSize()),
); */
