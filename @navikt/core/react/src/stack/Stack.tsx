import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Tag label
   */
  children: React.ReactNode;
  /**
   * Changes background and border color
   */
  variant: "warning" | "error" | "info" | "success";
  /**
   * Changes padding and font-sizes
   * @default "medium"
   */
  size?: "medium" | "small";
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, ...rest }, ref) => {
    return <div {...rest} ref={ref} className={cl("navds-tag", className)} />;
  }
);

export default Stack;
