import React, { forwardRef } from "react";
import cl from "clsx";

export interface BodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface BodyType
  extends React.ForwardRefExoticComponent<
    BodyProps & React.RefAttributes<HTMLTableSectionElement>
  > {}

export const Body: BodyType = forwardRef(({ className, ...rest }, ref) => (
  <tbody {...rest} ref={ref} className={cl("navds-table__body", className)} />
));

export default Body;
