export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * HTML list element to render.
   * @default "ul"
   */
  as?: "ul" | "ol";
  /**
   * List heading title.
   */
  title?: string;
  /**
   * List heading description.
   */
  description?: string;
  /**
   * Allows setting a different HTML h-tag.
   * @default "h3"
   */
  headingTag?: React.ElementType<any>;
  /**
   * Changes padding, height and font-size.
   * @default "medium"
   */
  size?: "medium" | "small";
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
