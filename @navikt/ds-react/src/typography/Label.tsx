import React, { forwardRef } from "react";
import cl from "classnames";

const Label = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...rest }, ref) => (
  <p {...rest} ref={ref} className={cl(className, "navds-label")} />
));

export default Label;
