import cl from "clsx";
import React, { forwardRef } from "react";

export type HeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type HeaderType = React.ForwardRefExoticComponent<
  HeaderProps & React.RefAttributes<HTMLTableSectionElement>
>;

export const Header: HeaderType = forwardRef(({ className, ...rest }, ref) => (
  <thead {...rest} ref={ref} className={cl("navds-table__header", className)} />
));

export default Header;
