import React, { forwardRef } from "react";
import cl from "classnames";

const Tag = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...rest }, ref) => (
  <p {...rest} ref={ref} className={cl(className, "navds-tag")} />
));

export default Tag;
