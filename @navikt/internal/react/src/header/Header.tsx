import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
}

const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ children, className, ...rest }, ref) => (
    <header ref={ref} className={cl("navdsi-header", className)} {...rest}>
      {children}
    </header>
  )
);

export default Header;
