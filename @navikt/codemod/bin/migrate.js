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
exports.checkGitStatus = exports.migrate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jscodeshift = __importStar(require("jscodeshift/src/Runner"));
const chalk_1 = __importDefault(require("chalk"));
const is_git_clean_1 = __importDefault(require("is-git-clean"));
const globby_1 = __importDefault(require("globby"));
const migrationsMap = [
  {
    name: "v1/preset: Runs all codemods for beta to v1 migration",
    value: "v1/preset",
    path: "v1.0.0/preset",
  },
  {
    name: "v1/pagination: Fixes breaking API-changes from <Pagination /> component",
    value: "v1/pagination",
    path: "v1.0.0/pagination",
  },
  {
    name: "v1/tabs: Fixes breaking API-changes from <Tabs /> component",
    value: "v1/tabs",
    path: "v1.0.0/tabs",
  },
  {
    name: "v1/chat: Fixes breaking API-changes from <SpeechBubble /> (now <Chat/>) component",
    value: "v1/chat",
    path: "v1.0.0/chat",
  },
  {
    name: "v2/css: Fixes css-variables",
    value: "v2/css",
    path: "v2.0.0/update-css-tokens/update-css-tokens",
  },
  {
    name: "v2/js: Fixes js-variables",
    value: "v2/js",
    path: "v2.0.0/update-js-tokens/update-js-tokens",
  },
  {
    name: "v2/sass: Fixes sass-variables",
    value: "v2/sass",
    path: "v2.0.0/update-sass-tokens/update-sass-tokens",
  },
  {
    name: "v2/less: Fixes less-variables",
    value: "v2/less",
    path: "v2.0.0/update-less-tokens/update-less-tokens",
  },
];
function migrate(migration, files, options = {}) {
  return __awaiter(this, void 0, void 0, function* () {
    const foundMigration = migrationsMap.find((x) => x.value === migration);
    const migrationFile = path_1.default.join(
      __dirname,
      `../transforms/${foundMigration.path}.js`
    );
    try {
      if (!fs_1.default.existsSync(migrationFile)) {
        throw new Error(`No migration found for ${migration}`);
      }
      if (!files) throw new Error(`No path provided for migration`);
      if (!options.dry) {
        checkGitStatus(options.force);
      }
      const filepaths = globby_1.default.sync(files, { cwd: process.cwd() });
      if (filepaths.length === 0) {
        throw new Error(`No files found for ${files}`);
      }
      // eslint-disable-next-line no-console
      console.log(chalk_1.default.green("Running migration:"), migration);
      yield jscodeshift.run(
        migrationFile,
        filepaths,
        Object.assign(
          {
            babel: true,
            ignorePattern: [
              "**/node_modules/**",
              "**/.next/**",
              "**/build/**",
              "**/dist/**",
            ],
            extensions: "tsx,ts,jsx,js",
            parser: "tsx",
            verbose: 2,
            runInBand: true,
            silent: false,
            stdin: false,
          },
          options
        )
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
}
exports.migrate = migrate;
function checkGitStatus(force) {
  let clean = false;
  let errorMessage = "Unable to determine if git directory is clean";
  try {
    clean = is_git_clean_1.default.sync(process.cwd());
    errorMessage = "Git directory is not clean";
  } catch (err) {
    if (err && err.stderr && err.stderr.indexOf("Not a git repository") >= 0) {
      clean = true;
    }
  }
  if (!clean) {
    /* eslint-disable no-console */
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log("Thank you for using @navikt/ds-codemod!");
      console.log(
        chalk_1.default.yellow(
          "\nBut before we continue, please stash or commit your git changes."
        )
      );
      console.log(
        "\nYou may use the --force flag to override this safety check."
      );
      process.exit(1);
    }
  }
}
exports.checkGitStatus = checkGitStatus;
