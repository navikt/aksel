import React, { forwardRef } from "react";
import cl from "classnames";

export interface DetailProps
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
  /**
   * Adds margins to typo
   */
  spacing?: boolean;
}

const Detail = forwardRef<HTMLParagraphElement, DetailProps>(
  ({ className, size = "m", spacing, ...rest }, ref) => (
    <p
      {...rest}
      ref={ref}
      className={cl(className, "navds-detail", {
        "navds-detail--s": size === "s",
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default Detail;
