/**
 * Checks if search field values match the given filter text.
 *
 * @param searchFieldValues - Array of strings to search within (e.g., labels, tags, descriptions)
 * @param filterText - The search text to match against
 * @returns true if all space-separated parts of filterText are found in at least one searchFieldValue
 *
 * @example
 * matchesFilterText(['Hello World', 'foo'], 'hello') // true
 * matchesFilterText(['Hello World', 'foo'], 'hello bar') // false
 * matchesFilterText(['Hello World', 'bar'], 'hello bar') // true
 * matchesFilterText([], 'test') // false
 * matchesFilterText(['test'], '') // true (empty filter matches all)
 */
function matchesFilterText(
  searchFieldValues: string[],
  filterText: string,
): boolean {
  /* Guard against null/undefined inputs */
  if (!searchFieldValues || !Array.isArray(searchFieldValues)) {
    return false;
  }

  if (filterText === null || filterText === undefined) {
    return true;
  }

  const normalizedFilter = filterText.trim().toLowerCase();

  /* Empty filter matches everything */
  if (!normalizedFilter) {
    return true;
  }

  /* Split filter into parts ("nord land" -> ["nord", "land"]) */
  const parts = normalizedFilter.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return true;
  }

  /* Normalize and filter out nullish values */
  const normalizedFields = searchFieldValues
    .map((value) => value?.toLowerCase())
    .filter(Boolean);

  /* If no valid fields to search, no match */
  if (normalizedFields.length === 0) {
    return false;
  }

  /* Every part of the filter must be found in at least one field */
  return parts.every((part) =>
    normalizedFields.some((field) => field.includes(part)),
  );
}

export { matchesFilterText };
