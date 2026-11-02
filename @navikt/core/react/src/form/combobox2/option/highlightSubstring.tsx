import React from "react";

function highlightSubstring(text: string, substring: string) {
  const range = getHighlightRange(text, substring);
  if (!range) {
    // This can happen if the consumer has implemented their own filtering logic
    return text;
  }
  const [rangeStart, rangeEnd] = range;
  return (
    // Aria-label is used to fix testing-library wrongly evaluating the accessible name of the option when highlighting text
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: Doesn't matter if it doesn't work in normal browsers
    <span aria-label={text}>
      {text.substring(0, rangeStart)}
      <mark>{text.substring(rangeStart, rangeEnd)}</mark>
      {text.substring(rangeEnd)}
    </span>
  );
}

/**
 * Finds the first case-insensitive occurrence of `substring` in `text`.
 * Handles characters whose lowercase form has a different length than the original (e.g. "İ").
 * @returns The `[start, end]` range of the match in `text`, or `undefined` if there is no match.
 */
function getHighlightRange(text: string, substring: string) {
  const lowerSubstring = substring.toLocaleLowerCase();
  const matchIndex = text.toLocaleLowerCase().indexOf(lowerSubstring);
  if (matchIndex === -1) {
    return;
  }

  const matchEnd = matchIndex + lowerSubstring.length;
  let start = 0;
  let origPos = 0;
  let lowerPos = 0;

  for (const char of text) {
    if (lowerPos <= matchIndex) {
      start = origPos;
    }
    origPos += char.length;
    lowerPos += char.toLocaleLowerCase().length;
    if (lowerPos >= matchEnd) {
      return [start, origPos] as const;
    }
  }
}

export { highlightSubstring, getHighlightRange };
