import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import cl from "classnames";
import Row, { RowType } from "./Row";

export interface HeaderType
  extends ForwardRefExoticComponent<
    HTMLAttributes<HTMLTableSectionElement> &
      RefAttributes<HTMLTableSectionElement>
  > {
  Row: RowType;
}

const Header = forwardRef(({ className, children, ...rest }, ref) => {
  return (
    <thead className={cl("navdsi-table__header", className)}>{children}</thead>
  );
}) as HeaderType;

Header.Row = Row;

export default Header;
