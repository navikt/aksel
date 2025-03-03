import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type PopoverContentType = React.ForwardRefExoticComponent<
  PopoverContentProps & React.RefAttributes<HTMLDivElement>
>;

const PopoverContent: PopoverContentType = forwardRef(
  ({ className, ...rest }, ref) => {
    const { cn } = useRenameCSS();
    return (
      <div
        {...rest}
        ref={ref}
        className={cn("navds-popover__content", className)}
      />
    );
  },
);

export default PopoverContent;
