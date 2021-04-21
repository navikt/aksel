import React, { forwardRef } from "react";
import cl from "classnames";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size: "large" | "medium" | "small" | "xs";
  children: React.ReactNode;
}

const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ size, className, children, ...rest }, ref) => (
    <span
      {...rest}
      ref={ref}
      className={cl(className, "navds-text", `navds-text--${size}`)}
    >
      {children}
    </span>
  )
);

export default Text;
