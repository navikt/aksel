import cl from "classnames";
import React, { forwardRef } from "react";

export interface TagWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tags
   */
  children: React.ReactNode;
  /**
   * Changes spacing
   * @default "medium"
   */
  size?: "medium" | "small";
}

export type TagWrapperType = React.ForwardRefExoticComponent<
  TagWrapperProps & React.RefAttributes<HTMLDivElement>
>;

export const TagWrapper: TagWrapperType = forwardRef(
  ({ className, size = "medium", ...rest }, ref) => (
    <div
      {...rest}
      ref={ref}
      className={cl(
        "navds-tag-wrapper",
        className,
        `navds-tag-wrapper--${size}`
      )}
    />
  )
);

export default TagWrapper;
