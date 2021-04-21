import React, { forwardRef } from "react";
import cl from "classnames";

const Ingress = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...rest }, ref) => (
  <p {...rest} ref={ref} className={cl(className, "navds-ingress")} />
));

export default Ingress;
