const GLOB_IGNORE_PATTERNS = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/lib/**",
  "**/.next/**",
  "**/__snapshots__/**",
];

/**
 * Utility function to generate the default glob pattern
 */
function getDefaultGlob(ext: string): string {
  const defaultExt = "js,ts,jsx,tsx,css,scss,less";
  return `**/*.{${cleanExtensions(ext ?? defaultExt).join(",")}}`;
}

/**
 * Utility function to clean file extensions
 */
function cleanExtensions(ext: string): string[] {
  return ext
    .split(",")
    .map((e) => e.trim())
    .map((e) => e.replace(".", ""));
}

export { GLOB_IGNORE_PATTERNS, getDefaultGlob, cleanExtensions };
