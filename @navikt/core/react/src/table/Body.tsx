import React, { forwardRef } from "react";
import { cl } from "../util/className";

export type BodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type BodyType = React.ForwardRefExoticComponent<
  BodyProps & React.RefAttributes<HTMLTableSectionElement>
>;

export const Body: BodyType = forwardRef(({ className, ...rest }, ref) => {
  return (
    <tbody {...rest} ref={ref} className={cl("aksel-table__body", className)} />
  );
});

export default Body;
