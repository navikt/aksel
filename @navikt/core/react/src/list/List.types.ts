export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * HTML list element to render.
   * @default "ul"
   */
  as?: "ul" | "ol";
  /**
   * @deprecated Use <Heading> instead of `title`.
   */
  title?: string;
  /**
   * Changes margin-block on list and font size on items.
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
}

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * List item content.
   */
  children: React.ReactNode;
  /**
   * List item title.
   */
  title?: string;
  /**
   * Icon to be used instead of bullet (unordered lists only).
   */
  icon?: React.ReactNode;
}
