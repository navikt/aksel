import React, { forwardRef } from "react";
import cl from "clsx";

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
