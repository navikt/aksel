import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";

export interface ComboboxProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Changes padding and font-sizes
   * @default "medium"
   */
  size?: "medium" | "small";
}

interface ComboboxComponent
  extends React.ForwardRefExoticComponent<
    ComboboxProps & React.RefAttributes<HTMLDivElement>
  > {}

export const Chips: ComboboxComponent = forwardRef<
  HTMLDivElement,
  ComboboxProps
>(({ className, children, size, ...rest }, ref) => {
  return (
    <div
      {...rest}
      ref={ref}
      className={cl("navds-combobox", className, `navds-chips--${size}`)}
    >
      {children}
    </div>
  );
}) as ComboboxComponent;

export default Chips;
