import React, {
  forwardRef,
  RefAttributes,
  ForwardRefExoticComponent,
  HTMLAttributes,
} from "react";
import cl from "classnames";
import Header, { HeaderType } from "./Header";
import Body, { BodyType } from "./Body";

type TableVariant = "zebra" | "vertical";
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * Changes design and interactions
   * @default []
   */
  variants?: TableVariant[];
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

const getVariantClassNames = (variants?: TableVariant[]) => {
  return variants?.map((variant) => `navdsi-table--${variant}`).join(" ") ?? "";
};

const Table = forwardRef(
  ({ variants, className, children, size = "medium", ...rest }, ref) => {
    return (
      <table
        {...rest}
        ref={ref}
        className={cl(
          "navdsi-table",
          getVariantClassNames(variants),
          `navdsi-table--${size}`,
          className
        )}
      >
        {children}
      </table>
    );
  }
) as TableType;

Table.Header = Header;
Table.Body = Body;

export default Table;
