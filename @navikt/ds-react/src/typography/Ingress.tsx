import React, { forwardRef } from "react";
import cl from "classnames";

const Body = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...rest }, ref) => (
  <p {...rest} ref={ref} className={cl(className, "navds-body")} />
));

export default Body;
