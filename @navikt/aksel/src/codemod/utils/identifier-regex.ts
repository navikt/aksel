/**
 * Matches a JS identifier as a whole word.
 * Lookarounds are zero-width, so replacing the match never removes surrounding whitespace,
 * and longer identifiers containing the name (`MyToken`, `Token2`, `$Token`) are left untouched.
 */
function createIdentifierRegex(identifier: string) {
  const escaped = identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![\\w$])${escaped}(?![\\w$])`, "gm");
}

export { createIdentifierRegex };
