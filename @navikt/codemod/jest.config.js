const customJestConfig = {
  testMatch: ["**/*.test.js", "**/*.test.ts", "**/*.test.tsx"],
  verbose: true,
  rootDir: "test",
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js config which is async
module.exports = customJestConfig;
