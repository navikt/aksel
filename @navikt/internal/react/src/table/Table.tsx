import React, {
  forwardRef,
  RefAttributes,
  ForwardRefExoticComponent,
  HTMLAttributes,
} from "react";
import cl from "classnames";
import Header, { HeaderType } from "./Header";
import Body, { BodyType } from "./Body";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * Changes design and interactions
   * @default "simple"
   */
  variant?: "simple" | "zebra" | "verticalStripes";
  /**
   * Changes padding, height and font-size
   * @default "medium"
   */
  size?: "medium" | "small";
}

export interface TableType
  extends ForwardRefExoticComponent<
    TableProps & RefAttributes<HTMLTableElement>
  > {
  Header: HeaderType;
  Body: BodyType;
}

const Table = forwardRef(
  (
    { variant = "simple", className, children, size = "medium", ...rest },
    ref
  ) => (
    <table
      {...rest}
      ref={ref}
      className={cl(
        "navdsi-table",
        `navdsi-table--${variant}`,
        `navdsi-table--${size}`,
        className
      )}
    >
      {children}
    </table>
  )
) as TableType;

Table.Header = Header;
Table.Body = Body;

export default Table;
