import cl from "clsx";
import React, { forwardRef } from "react";

export type BodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type BodyType = React.ForwardRefExoticComponent<
  BodyProps & React.RefAttributes<HTMLTableSectionElement>
>;

export const Body: BodyType = forwardRef(({ className, ...rest }, ref) => (
  <tbody {...rest} ref={ref} className={cl("navds-table__body", className)} />
));

export default Body;
