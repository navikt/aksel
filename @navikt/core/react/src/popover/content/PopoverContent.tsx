import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

type PopoverContentType = React.ForwardRefExoticComponent<
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

export { PopoverContent };
export type { PopoverContentProps, PopoverContentType };
