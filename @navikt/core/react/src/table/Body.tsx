import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";

export type BodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type BodyType = React.ForwardRefExoticComponent<
  BodyProps & React.RefAttributes<HTMLTableSectionElement>
>;

export const Body: BodyType = forwardRef(({ className, ...rest }, ref) => {
  const { cn } = useRenameCSS();
  return (
    <tbody {...rest} ref={ref} className={cn("navds-table__body", className)} />
  );
});

export default Body;
