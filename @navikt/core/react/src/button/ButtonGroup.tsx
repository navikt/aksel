import cl from "clsx";
import React, { forwardRef } from "react";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        {...rest}
        className={cl("navds-button__group", className)}
      />
    );
  },
);

export default ButtonGroup;
