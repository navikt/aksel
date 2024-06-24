/**
 * Cleans up strings to be used as URLs
 * @param input
 * @returns cleaned input
 */
export function sanitizeSlug(input: string) {
  if (!input) {
    return "";
  }

  return (
    input
      .toLowerCase()
      .trim()
      /* Space */
      .replace(/\s+/g, "-")
      /* multiple - converted to single - */
      .replace(/-+/gm, "-")
      /* Special-characters */
      .replace(/[æåø]/g, (char) => {
        switch (char) {
          case "æ":
            return "ae";
          case "å":
            return "a";
          case "ø":
            return "o";
          default:
            return "";
        }
      })
      // Replace accented characters with non-accented equivalents
      .normalize("NFD")
      // biome-ignore lint/suspicious/noMisleadingCharacterClass: Nextjs-loader (webpack/loaders/next-swc-loader.js) does not support the `v` flag in regex expressions
      .replace(/[\u0300-\u036f]/g, "")
      // Replace any non [a-zA-Z0-9_]
      .replace(/[^\w-]+/g, "")
  );
}
