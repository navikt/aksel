export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * HTML list element to render.
   * @default "ul"
   */
  as?: "ul" | "ol";
  /**
   * List heading title.
   * @deprecated Use a "plain" <Heading> instead of `title`, Composition of smaller components preferred over smarter components.
   */
  title?: string;
  /**
   * List heading description.
   * @deprecated Use a "plain" <BodyShort> instead of `description`, Composition of smaller components preferred over smarter components.
   */
  description?: string;
  /**
   * Allows setting a different HTML h-tag.
   * @default "h3"
   * @deprecated The `title` prop gets deprecated, so this one follows suit, as it was a supplementary prop to the title.
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
