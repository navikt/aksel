import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyShort, Detail } from "..";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Tag
   */
  children: React.ReactNode;
  /**
   * Color schema for tag
   */
  variant:
    | "warning"
    | "danger"
    | "info"
    | "success"
    | "action"
    | "deepblue"
    | "purple"
    | "limegreen"
    | "neutral";
  /**
   * Changes sizing of tag
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Changes Tag background, border and text-color
   * @default "outline"
   */
  type?: "muted" | "outline" | "strong";
}

interface TagComponent
  extends React.ForwardRefExoticComponent<
    TagProps & React.RefAttributes<HTMLSpanElement>
  > {
  /* Item: AccordionItemType; */
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size = "medium", type = "outline", ...rest }, ref) => {
    const Component = size === "medium" ? BodyShort : Detail;

    return (
      <Component
        {...rest}
        ref={ref}
        as="span"
        size={size}
        className={cl(
          "navds-tag",
          className,
          `navds-tag--${variant}`,
          `navds-tag--${size}`,
          `navds-tag--${type}`
        )}
      />
    );
  }
) as TagComponent;

export default Tag;
