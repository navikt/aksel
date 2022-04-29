import { Close } from "@navikt/ds-icons";
import cl from "classnames";
import React, { forwardRef } from "react";
import { BodyShort, Detail } from "..";

export interface TagRemovableProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Tag
   */
  children: React.ReactNode;
  /**
   * Changes sizing of tag
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Changes background and border schema
   * @default "muted"
   */
  type?: "muted" | "strong";
}

export type TagRemovableType = React.ForwardRefExoticComponent<
  TagRemovableProps & React.RefAttributes<HTMLButtonElement>
>;

export const TagRemovable: TagRemovableType = forwardRef(
  ({ className, children, size = "medium", type = "muted", ...rest }, ref) => {
    const Component = size === "medium" ? BodyShort : Detail;

    return (
      <button
        {...rest}
        ref={ref}
        className={cl(
          "navds-tag navds-tag-removable",
          className,
          `navds-tag--${size}`,
          `navds-tag-removable--${type}`
        )}
        type="button"
      >
        <Component as="span" className="navds-tag__inner" size={size}>
          {children}
          <Close aria-hidden className="navds-tag--icon" />
        </Component>
      </button>
    );
  }
);

export default TagRemovable;
