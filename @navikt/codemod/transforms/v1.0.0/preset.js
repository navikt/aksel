"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const tabs_1 = __importDefault(require("./tabs"));
const chat_1 = __importDefault(require("./chat"));
const pagination_1 = __importDefault(require("./pagination"));
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
function transformer(file, api, options) {
  file.source = (0, tabs_1.default)(file, api, options);
  file.source = (0, chat_1.default)(file, api, options);
  file.source = (0, pagination_1.default)(file, api, options);
  return file.source;
}
exports.default = transformer;
