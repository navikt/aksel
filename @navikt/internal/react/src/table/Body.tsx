import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import cl from "classnames";
import Row, { RowType } from "./Row";

export interface BodyType
  extends ForwardRefExoticComponent<
    HTMLAttributes<HTMLTableSectionElement> &
      RefAttributes<HTMLTableSectionElement>
  > {
  Row: RowType;
}

const Body = forwardRef(({ className, children, ...rest }, ref) => {
  return (
    <tbody className={cl("navdsi-table__body", className)}>{children}</tbody>
  );
}) as BodyType;

Body.Row = Row;

export default Body;
