import React, { forwardRef } from "react";
import { cl } from "../util/className";

export type HeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type HeaderType = React.ForwardRefExoticComponent<
  HeaderProps & React.RefAttributes<HTMLTableSectionElement>
>;

export const Header: HeaderType = forwardRef(({ className, ...rest }, ref) => {
  return (
    <thead
      {...rest}
      ref={ref}
      className={cl("aksel-table__header", className)}
    />
  );
});

export default Header;
