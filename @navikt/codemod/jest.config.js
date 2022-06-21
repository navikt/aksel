const customJestConfig = {
  testMatch: ["**/__tests__/**/*.js"],
  verbose: true,
  rootDir: "./dist",
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js config which is async
module.exports = customJestConfig;
