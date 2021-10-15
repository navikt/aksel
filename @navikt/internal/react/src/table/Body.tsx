import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import cl from "classnames";

export interface BodyType
  extends ForwardRefExoticComponent<
    HTMLAttributes<HTMLTableSectionElement> &
      RefAttributes<HTMLTableSectionElement>
  > {}

const Body = forwardRef(({ className, children, ...rest }, ref) => {
  return (
    <tbody className={cl("navdsi-table__body", className)}>{children}</tbody>
  );
}) as BodyType;

export default Body;
