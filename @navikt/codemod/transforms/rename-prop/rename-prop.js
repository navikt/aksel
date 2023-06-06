"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const rename_props_1 = __importDefault(require("../../utils/rename-props"));
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;
  return (0, rename_props_1.default)({
    root,
    componentName: options.component,
    props: { [options.from]: options.to },
  }).toSource(printOptions);
}
exports.default = transformer;
