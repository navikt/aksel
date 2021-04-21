import React, { forwardRef } from "react";
import cl from "classnames";

export interface ElementProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * M: semi-bold, S: normal
   * @default "m"
   */
  size?: "m" | "s";
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * Custom styling on element
   */
  className?: string;
}

const Element = forwardRef<HTMLParagraphElement, ElementProps>(
  ({ className, size = "m", ...rest }, ref) => (
    <p
      {...rest}
      ref={ref}
      className={cl(className, "navds-element", {
        "navds-element--s": size === "s",
      })}
    />
  )
);

export default Element;
