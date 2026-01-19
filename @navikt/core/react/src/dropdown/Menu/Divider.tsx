import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

export const Divider = forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...rest }, ref) => {
  return (
    <hr
      {...rest}
      ref={ref}
      className={cl("aksel-dropdown__divider", className)}
    />
  );
});

export default Divider;
