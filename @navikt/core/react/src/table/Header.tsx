import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";

export type HeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type HeaderType = React.ForwardRefExoticComponent<
  HeaderProps & React.RefAttributes<HTMLTableSectionElement>
>;

export const Header: HeaderType = forwardRef(({ className, ...rest }, ref) => {
  const { cn } = useRenameCSS();
  return (
    <thead
      {...rest}
      ref={ref}
      className={cn("navds-table__header", className)}
    />
  );
});

export default Header;
