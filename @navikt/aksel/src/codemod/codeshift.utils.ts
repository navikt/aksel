const GLOB_IGNORE_PATTERNS = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/lib/**",
  "**/.next/**",
  "**/__snapshots__/**",
  "**/public/**",
];

type SupportedCodemodExtensions =
  | "js"
  | "ts"
  | "jsx"
  | "tsx"
  | "css"
  | "scss"
  | "less";

/**
 * Utility function to generate the default glob pattern
 */
function getDefaultGlob(ext: string): string {
  const defaultExt = "js,ts,jsx,tsx,css,scss,less";
  const extensions = cleanExtensions(ext ?? defaultExt);

  /**
   * Single-item braces are treated as a literal string by some globbing libraries,
   * so we only use them when there are multiple extensions
   */
  if (extensions.length > 1) {
    return `**/*.{${extensions.join(",")}}`;
  }

  return `**/*.${extensions[0]}`;
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

export type { SupportedCodemodExtensions };
