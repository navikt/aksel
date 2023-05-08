const config = {
  transform: { "^.+\\.js?$": "ts-jest", "^.+\\.ts?$": "ts-jest" },
  testMatch: ["**/tests/*.test.ts"],
  verbose: true,
  rootDir: ".",
};

module.exports = config;
