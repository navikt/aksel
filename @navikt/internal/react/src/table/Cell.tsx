import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import cl from "classnames";

export interface CellType
  extends ForwardRefExoticComponent<
    HTMLAttributes<HTMLTableElement> & RefAttributes<HTMLTableElement>
  > {}

const Cell = forwardRef(({ className, children, ...rest }, ref) => {
  // TODO: th hvis inni en thead
  return <td className={cl("navdsi-table__cell", className)}>{children}</td>;
}) as CellType;

export default Cell;
