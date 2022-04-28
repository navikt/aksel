import React, { forwardRef } from "react";
import cl from "classnames";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, ...rest }, ref) => (
    <hr {...rest} ref={ref} className={cl("navdsi-divider", className)} />
  )
);

export default Divider;
