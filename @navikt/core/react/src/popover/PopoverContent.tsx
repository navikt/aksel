import React, { forwardRef } from "react";
import cl from "clsx";

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type PopoverContentType = React.ForwardRefExoticComponent<
  PopoverContentProps & React.RefAttributes<HTMLDivElement>
>;

const PopoverContent: PopoverContentType = forwardRef(
  ({ className, ...rest }, ref) => (
    <div
      {...rest}
      ref={ref}
      className={cl("navds-popover__content", className)}
    />
  )
);

export default PopoverContent;
