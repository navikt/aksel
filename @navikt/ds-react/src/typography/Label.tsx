import React, { forwardRef } from "react";
import cl from "classnames";

export interface LabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * M: 18px, S: 16px
   * @default "m"
   */
  size?: "m" | "s";
  /**
   * Heading to render
   */
  children: React.ReactNode;
  /**
   * Custom styling on element
   */
  className?: string;
}

const Label = forwardRef<HTMLParagraphElement, LabelProps>(
  ({ className, size = "m", ...rest }, ref) => (
    <p
      {...rest}
      ref={ref}
      className={cl(className, "navds-label", `navds-label--${size}`)}
    />
  )
);

export default Label;
