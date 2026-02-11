import React, { forwardRef } from "react";
import { cl } from "../utils/helpers";

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type PopoverContentType = React.ForwardRefExoticComponent<
  PopoverContentProps & React.RefAttributes<HTMLDivElement>
>;

const PopoverContent: PopoverContentType = forwardRef(
  ({ className, ...rest }, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={cl("aksel-popover__content", className)}
      />
    );
  },
);

export default PopoverContent;
