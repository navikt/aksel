import React from "react";

// Før vi ev. eksponerer denne, vurder følgende:
// - Bør man kunne slå av aria-label? (Ev. kan vi kun sette på aria-label hvis process.env.NODE_ENV === "test")
// - Navngivning. Bør ikke bruke kun Highlight fordi det er allerede noe som heter det i JS.

interface HighlightTextProps {
  /** Text to be highlighted */
  text: string;
  children: string;
}

const HighlightText = ({ text, children }: HighlightTextProps) => {
  const textIndex = children
    .toLocaleLowerCase()
    .indexOf(text.toLocaleLowerCase());
  if (textIndex === -1) {
    return children;
  }
  const start = children.substring(0, textIndex);
  const match = children.substring(textIndex, textIndex + text.length);
  const end = children.substring(textIndex + text.length);
  return (
    // aria-label is used to fix testing-library wrongly evaluating the accessible name of the option when highlighting text
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: Doesn't matter if it doesn't work in the browser
    <span aria-label={children}>
      {start}
      {match && <mark>{match}</mark>}
      {end}
    </span>
  );
};

export { HighlightText };
