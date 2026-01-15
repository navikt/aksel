import React, { forwardRef } from "react";
import { cl } from "../../util/className";

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
