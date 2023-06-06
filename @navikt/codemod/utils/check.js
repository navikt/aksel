"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
exports.check = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const prettier_1 = __importDefault(require("prettier"));
const applyTransform = require("jscodeshift/dist/testUtils").applyTransform;
function check(
  dirName,
  { fixture, migration, extension = "js", options = {} }
) {
  describe(migration, () => {
    it(fixture, () =>
      __awaiter(this, void 0, void 0, function* () {
        var _a;
        const fixtureDir = node_path_1.default.join(dirName);
        const inputPath = node_path_1.default.join(
          fixtureDir,
          `${fixture}.input.${extension}`
        );
        const parser = extension;
        const source = node_fs_1.default.readFileSync(inputPath, "utf8");
        const expected = node_fs_1.default.readFileSync(
          node_path_1.default.join(
            fixtureDir,
            `${fixture}.output.${extension}`
          ),
          "utf8"
        );
        // Assumes transform is one level up from tests directory
        const module = yield ((_a = node_path_1.default.join(
          dirName,
          "..",
          migration
        )),
        Promise.resolve().then(() => __importStar(require(_a))));
        const output = applyTransform(
          Object.assign(Object.assign({}, module), { parser: "tsx" }),
          options,
          {
            source,
          }
        );
        // Format output and expected with prettier for white spaces and line breaks consistency
        expect(
          prettier_1.default.format(output, {
            parser: parser === "js" ? "typescript" : parser,
          })
        ).toBe(
          prettier_1.default.format(expected, {
            parser: parser === "js" ? "typescript" : parser,
          })
        );
      })
    );
  });
}
exports.check = check;
