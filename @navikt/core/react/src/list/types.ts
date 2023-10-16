export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * HTML list element to render
   * @default "ul"
   */
  as?: "ul" | "ol";
  /**
   * List heading title
   */
  title?: string;
  /**
   * List heading description
   */
  description?: string;
  /**
   * Allows setting a different HTML h-tag
   * @default "h3"
   */
  headingTag?: React.ElementType<any>;
  /**
   * Changes padding, height and font-size
   * @default medium
   */
  size?: "medium" | "small";
}
