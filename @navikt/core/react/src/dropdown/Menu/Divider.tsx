import React, { forwardRef } from "react";
import cl from "clsx";

export type DividerType = React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLHRElement> & React.RefAttributes<HTMLHRElement>
>;

export const Divider: DividerType = forwardRef(
  ({ className, ...rest }, ref) => (
    <hr
      {...rest}
      ref={ref}
      className={cl("navds-dropdown__divider", className)}
    />
  )
);

export default Divider;
