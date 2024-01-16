import cl from "clsx";
import React, { forwardRef } from "react";

export const Divider = forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...rest }, ref) => (
  <hr
    {...rest}
    ref={ref}
    className={cl("navds-dropdown__divider", className)}
  />
));

export default Divider;
