import React, { forwardRef } from "react";
import cl from "clsx";

export interface HeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface HeaderType
  extends React.ForwardRefExoticComponent<
    HeaderProps & React.RefAttributes<HTMLTableSectionElement>
  > {}

export const Header: HeaderType = forwardRef(({ className, ...rest }, ref) => (
  <thead {...rest} ref={ref} className={cl("navds-table__header", className)} />
));

export default Header;
