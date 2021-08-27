import React, { forwardRef } from "react";
import cl from "classnames";

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Modal.Content content
   */
  children: React.ReactNode;
}

export type PopoverContentType = React.ForwardRefExoticComponent<
  PopoverContentProps & React.RefAttributes<HTMLDivElement>
>;

const PopoverContent: PopoverContentType = forwardRef(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-popover__content", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default PopoverContent;
