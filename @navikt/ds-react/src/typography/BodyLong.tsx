import React, { forwardRef } from "react";
import cl from "classnames";

export interface BodyLongProps
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
  /**
   * Adds margins to typo
   */
  spacing?: boolean;
}

const BodyLong = forwardRef<HTMLParagraphElement, BodyLongProps>(
  ({ className, size = "m", spacing, ...rest }, ref) => (
    <p
      {...rest}
      ref={ref}
      className={cl(className, "navds-body-long", {
        "navds-body--s": size === "s",
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default BodyLong;
