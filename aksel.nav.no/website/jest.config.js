/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// jest.config.js
const nextJest = require("next/jest");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  rootDir: "../",
  moduleDirectories: [
    "node_modules",
    "<rootDir>/website/node_modules",
    "<rootDir>/website/",
  ],
  testEnvironment: "node",
  modulePathIgnorePatterns: ["cypress", "mockdata.ts"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/website/",
    }),
    jose: "<rootDir>/node_modules/jose/dist/node/cjs",
    uuid: "<rootDir>/node_modules/uuid/dist",
  },
  setupFilesAfterEnv: ["<rootDir>/website/jest.setup.js"],
  /* testPathIgnorePatterns: ["<rootDir>/node_modules/jose/*"], */
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
