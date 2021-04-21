import React, { forwardRef } from "react";
import cl from "classnames";

export interface BodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
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

const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  ({ className, size = "m", ...rest }, ref) => (
    <p
      {...rest}
      ref={ref}
      className={cl(className, "navds-body", { "navds-body--s": size === "s" })}
    />
  )
);

export default Body;
