import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

const DropdownMenuDivider = forwardRef<
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

export { DropdownMenuDivider };
