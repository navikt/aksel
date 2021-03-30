import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface InternalHeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
}

const InternalHeader = forwardRef<HTMLElement, InternalHeaderProps>(
  ({ children, className, ...rest }, ref) => (
    <header ref={ref} className={cl("navds-header", className)} {...rest}>
      {children}
    </header>
  )
);

export default InternalHeader;
