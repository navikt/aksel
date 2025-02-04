export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * HTML list element to render.
   * @default "ul"
   */
  as?: "ul" | "ol";
  /**
   * List heading title.
   * @deprecated Prop will be removed in future versions.
   */
  title?: string;
  /**
   * List heading description.
   * @deprecated Prop will be removed in future versions.
   */
  description?: string;
  /**
   * Allows setting a different HTML h-tag.
   * @default "h3"
   * @deprecated Prop will be removed in future versions.
   */
  headingTag?: React.ElementType<any>;
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
