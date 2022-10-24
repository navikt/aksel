const customJestConfig = {
  testMatch: ["**/__tests__/**/*.js", "**/tests/*.test.js"],
  verbose: true,
  rootDir: "./transforms",
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js config which is async
module.exports = customJestConfig;
