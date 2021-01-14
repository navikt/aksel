import React, { forwardRef } from "react";
import cl from "classnames";

const Paragraph = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...rest }, ref) => (
  <p
    {...rest}
    ref={ref}
    className={cl(className, "navds-article__paragraph")}
  />
));

export default Paragraph;
