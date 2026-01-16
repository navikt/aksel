/**
 * Filters out nullish values from an array and returns the result,
 * or null if the input is invalid or the resulting array is empty.
 *
 * Useful for validating Sanity data where arrays may contain null entries.
 */
function getValidRenderArray<T>(
  input: T[] | undefined | null,
): NonNullable<T>[] | null {
  if (!Array.isArray(input)) {
    return null;
  }

  const validItems = input.filter(
    (item): item is NonNullable<T> => item != null,
  );

  return validItems.length > 0 ? validItems : null;
}

export { getValidRenderArray };
