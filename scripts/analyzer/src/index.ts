import { CSSAnalyzer, ReactAnalyzer } from "./Analyzer.js";
import { unpack } from "./unpack.js";

const manager = {
  react: {
    local: new ReactAnalyzer("temp/local/*react-*.tgz"),
    remote: new ReactAnalyzer("temp/remote/*react-*.tgz"),
  },
  css: {
    local: new CSSAnalyzer("temp/local/*css-*.tgz"),
    remote: new CSSAnalyzer("temp/remote/*css-*.tgz"),
  },
};
