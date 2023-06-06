"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateToken = void 0;
const lodash_1 = __importDefault(require("lodash"));
const translateToken = (token, type) => {
  switch (type) {
    case "scss":
      return token.replace("--", "$");
    case "less":
      return token.replace("--", "@");
    case "js":
      return lodash_1.default.startCase(token).split(" ").join("");
    default:
      return token;
  }
};
exports.translateToken = translateToken;
