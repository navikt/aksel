import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

export const Divider = forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...rest }, ref) => {
  const { cn } = useRenameCSS();

  return (
    <hr
      {...rest}
      ref={ref}
      className={cn("navds-dropdown__divider", className)}
    />
  );
});

export default Divider;
