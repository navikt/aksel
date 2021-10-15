import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import cl from "classnames";

export interface HeaderType
  extends ForwardRefExoticComponent<
    HTMLAttributes<HTMLTableSectionElement> &
      RefAttributes<HTMLTableSectionElement>
  > {}

const Header = forwardRef(({ className, children, ...rest }, ref) => {
  return (
    <thead className={cl("navdsi-table__header", className)}>{children}</thead>
  );
}) as HeaderType;

export default Header;
