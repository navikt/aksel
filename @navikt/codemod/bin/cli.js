"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const meow_1 = __importDefault(require("meow"));
const migrate_1 = require("./migrate");
const config_1 = require("./config");
const help = `
Usage
  $ npx @navikt/ds-codemod ${config_1.cliConfig.args
    .map((arg) => `<${arg.name}>`)
    .join(" ")}
  ${config_1.cliConfig.args
    .map((arg) => `${arg.name}\t${arg.description}`)
    .join("\n  ")}
Options
  ${Object.entries(config_1.cliConfig.flags)
    .map(([name, val]) => `--${name}\t${val.description}`)
    .join("\n  ")}
`;
const { input, flags } = (0, meow_1.default)({
  description: config_1.cliConfig.description,
  flags: Object.fromEntries(
    Object.entries(config_1.cliConfig.flags).map(([name, flag]) => [
      name,
      {
        alias: flag.alias,
        type: flag.type,
      },
    ])
  ),
  help,
});
function run() {
  return __awaiter(this, void 0, void 0, function* () {
    yield (0, migrate_1.migrate)(input[0], input[1], flags);
  });
}
exports.run = run;
