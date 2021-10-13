import React, {
  forwardRef,
  RefAttributes,
  ForwardRefExoticComponent,
  HTMLAttributes,
} from "react";
import cl from "classnames";
import Header, { HeaderType } from "./Header";
import Body, { BodyType } from "./Body";

export interface TableType
  extends ForwardRefExoticComponent<
    HTMLAttributes<HTMLTableElement> & RefAttributes<HTMLTableElement>
  > {
  Header: HeaderType;
  Body: BodyType;
}

const Table = forwardRef(({ className, children, ...rest }, ref) => (
  <table {...rest} ref={ref} className={cl("navdsi-table", className)}>
    {children}
  </table>
)) as TableType;

Table.Header = Header;
Table.Body = Body;

export default Table;
