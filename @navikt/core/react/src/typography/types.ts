export const typoColors = ["default", "subtle", "on-inverted"];

export type TypoProps = {
  underline?: boolean;
  truncate?: boolean;
  weight?: "regular" | "semibold";
  align?: "start" | "center" | "end";
  visuallyHidden?: boolean;
  /**
   * Adds spacing below text
   */
  spacing?: boolean;
  color?: "default" | "subtle" | "on-inverted" | string;
};
