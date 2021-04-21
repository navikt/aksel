import React, { forwardRef } from "react";
import cl from "classnames";

const Element = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...rest }, ref) => (
  <p {...rest} ref={ref} className={cl(className, "navds-element")} />
));

export default Element;
