import React, { forwardRef } from "react";
import cl from "classnames";

const Component = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...rest }, ref) => (
  <span {...rest} ref={ref} className={cl(className, "navds-component")} />
));

export default Component;
