import React, { forwardRef } from "react";
import cl from "classnames";

const Lead = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...rest }, ref) => (
  <p {...rest} ref={ref} className={cl(className, "navds-article__lead")} />
));

export default Lead;
