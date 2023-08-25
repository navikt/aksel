export const typoColors = ["default", "subtle", "on-inverted"];

export type TypoProps = {
  /**
   * Truncate text overflow with ellipsis.
   */
  truncate?: boolean;
  /**
   * Adjusts font-weight.
   */
  weight?: "regular" | "semibold";
  /**
   * Adjust text-align.
   */
  align?: "start" | "center" | "end";
  /**
   * Visually hide text. Text will still be accessible for screenreaders
   */
  visuallyHidden?: boolean;
  /**
   * Adds spacing below text
   */
  spacing?: boolean;
  /**
   * Adjusts color
   */
  color?: "default" | "subtle" | "on-inverted" | string;
};
