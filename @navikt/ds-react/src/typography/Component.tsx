import React, { forwardRef } from "react";
import cl from "classnames";

export interface ComponentProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * M: 18px, S: 16px
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

const Component = forwardRef<HTMLParagraphElement, ComponentProps>(
  ({ className, size = "m", ...rest }, ref) => (
    <p
      {...rest}
      ref={ref}
      className={cl(className, "navds-component", {
        "navds-component--s": size === "s",
      })}
    />
  )
);

export default Component;
